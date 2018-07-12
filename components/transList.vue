<template>
  <page-table :pagination="pagination"
    :loading="loading"
    :title="$t('transList.title')"
    :tableTitles="transactionsTitles"
    :tableData="transactionsData"
    :current-change="fetchTransList"
    :currentPage="pageIndex"
    :total="total">
  </page-table>
</template>

<script>
  import pageTable from "~/components/pageTable";
  import transaction from "~/services/transaction.js";

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
      }
    },
    components: {
      pageTable
    },
    mounted() {
      this.fetchTransList();
    },
    data() {
      return {
        transactionList: this.transactions,
        pageIndex: 0,
        loading: false
      };
    },
    computed: {
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
          list.push({
            hash: `<a href="${lang}/transaction/${transaction.hash}">${transaction.hash}</a>`,
            timestamp: `<a href="${lang}/block/${transaction.timestamp}">${transaction.timestamp}</a>`,
            snapshotTimestamp: `<a href="${lang}/block/${transaction.snapshotTimestamp}">${transaction.snapshotTimestamp}</a>`,
            to: `<a href="${lang}/account/${transaction.to}">${transaction.to}</a>`,
            from: `<a href="${lang}/account/${transaction.from}">${transaction.from}</a>`,
            type: transaction.fromHash ? this.$t("transaction.send") : this.$t("transaction.receive"),
            amount: transaction.fromHash ? `-${transaction.amount}` : transaction.amount,
            status: ["unknown", "open", "closed"][transaction.status],
            confirmTimes: transaction.confirmTimes,
            tokenName: transaction.tokenName
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
      fetchTransList(currentIndex = 0) {
        this.loading = true;
        this.pageIndex = currentIndex;
        let tokenId = this.tokenId;
        let accountAddress = this.accountAddress;

        transaction.getList({
          pageIndex: 0,
          pageSize: 6
        }, accountAddress, tokenId).then(({ transactionList }) => {
          if (!this.isRightRequest(currentIndex, accountAddress, tokenId)) {
            return;
          }
          this.loading = false;
          this.transactionList = transactionList;
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
