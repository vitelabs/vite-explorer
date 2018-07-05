<template>
  <div class="account-container">
    <detail-layout 
        :title="`${title}: ${showTransactionDetail.hash}`"
        :list="list">
    </detail-layout >
  </div>
</template>

<script>  
  import detailLayout from "~/components/detailLayout";
  import error from "~/components/error";
  import transaction from "~/services/transaction.js";

  export default {
    head() {
      return {
        title: this.title
      };
    },
    components: {
      detailLayout, error
    },
    validate({ params }) {
      return params.blockHash;
    },
    async asyncData({ params }) {
      const blockHash = params.blockHash;

      try {
        let transactionDetail = await transaction.getDetail({
          blockHash
        });
        return {
          transactionDetail
        };
      } catch(err) {
        return {
          error: err.msg || "get block fail"
        };
      }
    },
    data() {
      return {
        title: "交易详情",
        transactionDetail: {}
      };
    },
    computed: {
      showTransactionDetail() {
        let tokenName = this.transactionDetail.tokenName;
        return {
          hash: this.transactionDetail.hash,
          type: this.transactionDetail.fromHash ? "发送" : "接收",
          status: ["unkown", "open", "closed"][this.transactionDetail.status],
          confirmTimes: this.transactionDetail.confirmTimes,
          snapshotBlockHash: this.transactionDetail.snapshotTimestamp,
          timestamp: this.transactionDetail.timestamp,
          from: this.transactionDetail.from,
          to: this.transactionDetail.to,
          tokenName: tokenName,
          amount: this.transactionDetail.amount ? 
            `${this.transactionDetail.amount}${tokenName}` : ""
        };
      },
      list() {
        const transactionDetailMap = {
          hash: "交易Hash",
          type: "交易类型",
          status: "交易状态",
          confirmTimes: "确认数",
          snapshotBlockHash: "首次快照块",
          timestamp: "时间戳",
          from: "转出方地址",
          to: "转入方地址",
          tokenName: "Token",
          amount: "数额",
          introduction: "附带的文本资料"
        };

        let list = [];
        for(let key in transactionDetailMap) {
          let item = {
            name: transactionDetailMap[key],
            describe: this.showTransactionDetail[key] || "----"
          };
          switch(key) {
          case "snapshotBlockHash":
          case "timestamp":
            item.link = `/block/${this.showTransactionDetail.snapshotBlockHash}`;
            break;
          case "from":
          case "to":
            item.link = `/account/${this.showTransactionDetail[key]}`;
            break;
          case "tokenName":
            item.link = `/token/${this.transactionDetail.tokenId}`;
            break;
          default: break;
          }
          list.push(item);
        }
        return list;
      }
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
</style>
