<template>
  <div class="account-container">
    <detail-layout 
        :title="`${title}: ${blockHash}`"
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
          blockHash, transactionDetail
        };
      } catch(err) {
        return {
          blockHash,
          error: err.msg || "get block fail"
        };
      }
    },
    data() {
      return {
        title: "交易详情",
        blockHash: "",
        transactionDetail: {}
      };
    },
    computed: {
      showTransactionDetail() {
        return {
          type: this.transactionDetail.fromHash ? "发送" : "接收",
          status: ["unkown", "open", "closed"][this.transactionDetail.status],
          confirms: this.transactionDetail.height,
          snapshotBlockHash: this.transactionDetail.snapshotTimestamp,
          snapshotBlockTimestamp: this.transactionDetail.snapshotTimestamp,
          from: this.transactionDetail.from,
          to: this.transactionDetail.to,
          token: this.transactionDetail.token.name,
          amount: this.transactionDetail.amount,
          introduction: this.transactionDetail.token.introduction
        };
      },
      list() {
        const transactionDetailMap = {
          type: "交易类型",
          status: "交易状态",
          confirms: "确认数",
          snapshotBlockHash: "首次快照块",
          snapshotBlockTimestamp: "时间戳",
          from: "转出方地址",
          to: "转入方地址",
          token: "Token",
          amount: "数额",
          introduction: "附带的文本资料"
        };

        let list = [{
          name: "交易Hash",
          describe: this.blockHash
        }];
        for(let key in this.showTransactionDetail) {
          let item = {
            name: transactionDetailMap[key],
            describe: this.showTransactionDetail[key]
          };
          switch(key) {
          case "snapshotBlockHash":
          case "snapshotBlockTimestamp":
            item.link = `/block/${this.showTransactionDetail[key]}`;
            break;
          case "from":
          case "to":
            item.link = `/account/${this.showTransactionDetail[key]}`;
            break;
          case "token":
            item.link = `/token/${this.showTransactionDetail[key]}`;
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
