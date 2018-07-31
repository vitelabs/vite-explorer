<template>
  <div class="account-container">
    <detail-layout
        :title="`${title}`"
        :list="list">
    </detail-layout >
  </div>
</template>

<script>
  import detailLayout from "~/components/detailLayout";
  import error from "~/components/error";
  import transaction from "~/services/transaction.js";
  import moment from "moment";

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
        title: this.$t("head.transDetail"),
        transactionDetail: {}
      };
    },
    computed: {
      showTransactionDetail() {
        let tokenName = this.transactionDetail.tokenName;
        let fromAddr = this.transactionDetail.fromHash ? this.transactionDetail.from : this.transactionDetail.accountAddress;
        let toAddr = this.transactionDetail.fromHash ? this.transactionDetail.accountAddress : this.transactionDetail.to;
        moment.locale(this.$i18n.locale === "zh" ? "zh-cn" : this.$i18n.locale);
        let timestamp = moment(this.transactionDetail.timestamp * 1000).fromNow();
        return {
          hash: this.transactionDetail.hash,
          type: this.transactionDetail.fromHash ? this.$t("transaction.receive") : this.$t("transaction.send"),
          status: ["unkown", "open", "closed"][this.transactionDetail.status],
          confirmTimes: this.transactionDetail.confirmTimes,
          snapshotBlockHash: this.transactionDetail.confirmBlockHash,
          timestamp,
          from: fromAddr,
          to: toAddr,
          tokenName: tokenName,
          amount: this.transactionDetail.amount ?
            `${this.transactionDetail.amount}${tokenName}` : ""
        };
      },
      list() {
        const transactionDetailMap = this.$t("transactionDetailMap");

        let list = [];
        let lang;
        this.$i18n.locale !== "en" ? lang = `/${this.$i18n.locale}` : lang = "";
        for(let key in transactionDetailMap) {
          let item = {
            name: transactionDetailMap[key],
            describe: this.showTransactionDetail[key] || "--"
          };
          switch(key) {
          case "snapshotBlockHash":
            item.link = `${lang}/block/${this.showTransactionDetail.snapshotBlockHash}`;
            break;
          case "from":
          case "to":
            item.link = `${lang}/account/${this.showTransactionDetail[key]}`;
            break;
          case "tokenName":
            item.link = `${lang}/token/${this.transactionDetail.tokenId}`;
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
