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
        let tokenName = this.transactionDetail.tokenSymbol;
        moment.locale(this.$i18n.locale === "zh" ? "zh-cn" : this.$i18n.locale);
        let timestamp = moment(this.transactionDetail.timestamp * 1000).fromNow();
        let commonObj = {
          type: this.transactionDetail.fromHash ? this.$t("transaction.receive") : this.$t("transaction.send"),
          status: ["unkown", "open", "closed"][this.transactionDetail.status],
          confirmTimes: this.transactionDetail.confirmTimes,
          snapshotBlockHash: this.transactionDetail.confirmBlockHash,
          timestamp,
          from: this.transactionDetail.from,
          to: this.transactionDetail.to,
          tokenName: tokenName,
          amount: this.transactionDetail.amount ?
            `${this.transactionDetail.amount}` : "",
          data: this.transactionDetail.data
        };

        if (this.transactionDetail.fromHash) {
          return Object.assign( {
            hash: this.transactionDetail.hash,
            fromHash: this.transactionDetail.fromHash || null,
          },commonObj);
        } else {
          return Object.assign({
            hash: this.transactionDetail.hash,
            toHash: this.transactionDetail.toHash || null,
          }, commonObj);
        }
      },
      list() {
        const transactionDetailMap = this.$t("transactionDetailMap");
        let time = "（" + moment(this.transactionDetail.timestamp * 1000).format("YYYY-MM-DD HH:mm:ss") + "）";
        let list = [];
        let lang;
        this.$i18n.locale !== "en" ? lang = `/${this.$i18n.locale}` : lang = "";
        for(let key in this.showTransactionDetail) {
          let item = {
            name: transactionDetailMap[key],
            describe: this.showTransactionDetail[key] || "--"
          };
          switch(key) {
          case "snapshotBlockHash":
            item.link = `${lang}/block/${this.showTransactionDetail.snapshotBlockHash}`;
            break;
          case "timestamp":
            item.describe = this.showTransactionDetail[key] + time;
            break;
          case "from":
          case "to":
            item.link = `${lang}/account/${this.showTransactionDetail[key]}`;
            break;
          case "fromHash":
          case "toHash":
            item.link = this.showTransactionDetail[key] ? `${lang}/transaction/${this.showTransactionDetail[key]}` : null;
            item.describe = this.showTransactionDetail[key] || this.$t("responseHash");
            break;
          case "tokenName":
            item.link = this.transactionDetail.tokenId ? `${lang}/token/${this.transactionDetail.tokenId}` : null;
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
