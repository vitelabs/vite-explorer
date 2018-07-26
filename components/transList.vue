<template>
  <page-table :pagination="pagination"
    :loading="loading"
    :title="title"
    :tableTitles="transactionsTitles"
    :tableData="transactionsData"
    :current-change="total ? fetchList : fetchTransList"
    :currentPage="pageIndex"
    :total="totalNumber"
    :page-size="pageSize"
    :sub-title="subTitleCom">
  </page-table>
</template>

<script>
  import pageTable from "~/components/pageTable";
  import transaction from "~/services/transaction.js";
  import moment from "moment";

  export default {
    props: {
      total: {
        type: Number,
        default: 0
      },
      pagination: {
        type: Boolean,
        default: true
      },
      tokenTitle: {
        type: Boolean,
        default: true
      },
      accountAddress: {
        type: String,
        default: ""
      },
      tokenId: {
        type: String,
        default: ""
      },
      transactions: {
        type: Array,
        default: () => {
          return [];
        }
      },
      pageSize: {
        type: Number,
        default: 50
      },
      title: {
        type: String,
        default: ""
      },
      subTitle: {
        type: String,
        default: ""
      }
    },
    components: {
      pageTable
    },
    mounted() {
      this.totalNumber = this.total;
      !this.total && this.fetchTransList();
    },
    data() {
      return {
        transactionList: this.transactions,
        pageIndex: 0,
        loading: false,
        totalNumber: 0
      };
    },
    computed: {
      subTitleCom() {
        if (this.subTitle && this.totalNumber) {
          return this.subTitle + this.totalNumber + "";
        } else {
          return "";
        }
      },
      transactionsTitles() {
        let titles = this.$t("transTitles");
        if(this.tokenTitle){
          titles = titles.concat(this.$t("addedTitle"));
        }
        return titles;
      },
      transactionsData() {
        if (!this.transactionList) {
          return [];
        }
        let list = [];
        this.transactionList.forEach((transaction) => {
          let lang = "";
          this.$i18n.locale !== "en" ? lang = `/${this.$i18n.locale}` : lang = "";
          let fromAddr = transaction.fromHash ? transaction.from : transaction.accountAddress;
          let toAddr = transaction.fromHash ? transaction.accountAddress : transaction.to;
          let shortFromAddr = transaction.fromHash ? transaction.shortFrom : transaction.shortAccountAddress;
          let shortToAddr = transaction.fromHash ? transaction.shortAccountAddress : transaction.shortTo;

          moment.locale(this.$i18n.locale === "zh" ? "zh-cn" : this.$i18n.locale);
          let timestamp = moment(transaction.timestamp * 1000).fromNow();
          list.push({
            hash: `<a href="${lang}/transaction/${transaction.hash}" target="_blank" title="${transaction.hash}">${transaction.shortHash}</a>`,
            timestamp,
            snapshotTimestamp: `<a href="${lang}/block/${transaction.snapshotTimestamp}" target="_blank" title="${transaction.snapshotTimestamp}">${transaction.shortSnapshotTimestamp}</a>`,
            to: `<a href="${lang}/account/${toAddr}" target="_blank" title="${toAddr}">${shortToAddr}</a>`,
            from: `<a href="${lang}/account/${fromAddr}" target="_blank" title="${fromAddr}">${shortFromAddr}</a>`,
            type: transaction.fromHash ? this.$t("transaction.receive") : this.$t("transaction.send"),
            amount: transaction.fromHash ?  transaction.amount : `-${transaction.amount}`,
            status: ["unknown", "open", "closed"][transaction.status],
            confirmTimes: transaction.confirmTimes,
            tokenName: transaction.tokenName,
            accountAddress: `<a href="${lang}/account/${transaction.accountAddress}" target="_blank" title="${transaction.accountAddress}">${transaction.accountAddress}</a>`,
          });
        });
        return list;
      }
    },
    watch: {
      tokenId() {
        this.fetchTransList();
      },
      accountAddress() {
        this.fetchTransList();
      }
    },
    methods: {
      isRightRequest(currentIndex, accountAddress, tokenId) {
        if (this.pageIndex !== currentIndex ||
            this.tokenId !== tokenId ||
            this.accountAddress !== accountAddress) {
          return false;
        }
        return true;
      },
      fetchList(currentIndex = 1) {
        this.loading = true;
        this.pageIndex = currentIndex;
        transaction.getList({
          pageIndex: currentIndex -1,
          pageSize: this.pageSize
        }).then(({ transactionList, totalNumber }) => {
          this.loading = false;
          this.transactionList = transactionList;
          this.totalNumber = totalNumber;
        }).catch((err) => {
          this.$message.error(err.msg || "get transList failed");
        });
      },

      fetchTransList(currentIndex = 1) {
        this.loading = true;
        this.pageIndex = currentIndex;
        let tokenId = this.tokenId;
        let accountAddress = this.accountAddress;

        transaction.getList({
          pageIndex: currentIndex -1,
          pageSize: this.pageSize
        }, accountAddress, tokenId).then(({ transactionList, totalNumber }) => {
          if (!this.isRightRequest(currentIndex, accountAddress, tokenId)) {
            return;
          }
          this.loading = false;
          this.transactionList = transactionList;
          this.totalNumber = totalNumber;
        }).catch((err) => {
          if (!this.isRightRequest(currentIndex, accountAddress, tokenId)) {
            return;
          }
          this.loading = false;
          this.$message.error(err.msg || "get transList failed");
        });
      }
    }
  };
</script>
