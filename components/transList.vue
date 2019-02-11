<template>
  <div>
    <page-table :pagination="pagination"
      :loading="loading"
      :title="title"
      :tableTitles="transactionsTitles"
      :tableData="transactionsData"
      :current-change="total ? fetchList : fetchTransList"
      :currentPage="pageIndex"
      :total="pageTotalNumber"
      :page-size="pageSize"
      :sub-title="subTitleCom"
      :sub-common-title="subCommonTitle"
      :need-filter="needFilter"
      :sort-items="sortItems"
      @selectFilter="getSelectFilter"
      @sortFilter="getSortFilter"
      :default-sort="defaultSort">
    </page-table>
  </div>
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
      sortItems: {
        type: Array,
        default: ()=> []
      },
      defaultSort: {
        type: Object,
        default: ()=> {}
      },
      needFilter: {
        type: Boolean,
        default: false
      },
      onRoad: {
        type: Boolean,
        default: false
      },
      tokenTitle: {
        type: Boolean,
        default: true
      },
      accountAddress: {
        type: String,
        default: ""
      },
      blockHash: { // block detail page
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
      },
      subCommonTitle: {
        type: String,
        default: ""
      },
      filterAccoutAddr: {
        type: Object,
        default: () => null
      }
    },
    components: {
      pageTable
    },
    mounted() {
      this.pageTotalNumber = this.total;
      !this.pageTotalNumber && this.fetchTransList();
    },
    data() {
      return {
        transactionList: this.transactions,
        pageIndex: 1,
        loading: false,
        totalNumber: 0,
        pageTotalNumber: 0
      };
    },
    computed: {
      subTitleCom() {
        if (this.subTitle) {
          return this.subTitle + this.totalNumber + "";
        } else {
          return "";
        }
      },
      transactionsTitles() {
        let titles = this.$t("transTitles");
        if(this.tokenTitle){
          titles = titles.slice(0, 1).concat(this.$t("addedTitle")).concat(titles.slice(1));
        }
        if (this.blockHash) {
          titles.splice(4, 1);
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

          moment.locale(this.$i18n.locale === "zh" ? "zh-cn" : this.$i18n.locale);
          let timestamp = moment(transaction.timestamp * 1000).fromNow();
          let amount = "";
          if (transaction.amount === "0") {
            amount = 0;
          } else {
            amount = transaction.fromHash ?  `<span style="color: #5cb85c;">${transaction.amount}</span>` : `<span style="color: #e67e22">-${transaction.amount}</span>`;
          }
          list.push({
            hash: `<a href="${lang}/transaction/${transaction.hash}" target="_blank" title="${transaction.hash}">${transaction.shortHash}</a>`,
            timestamp,
            snapshotTimestamp: transaction.confirmBlockHash ? `<a href="${lang}/block/${transaction.confirmBlockHash}" target="_blank" title="${transaction.confirmBlockHash}">${transaction.shortConfirmBlockHash}</a>` : "",
            to: `<a href="${lang}/account/${transaction.to}" target="_blank" title="${transaction.to}">${transaction.shortTo}</a>`,
            from: `<a href="${lang}/account/${transaction.from}" target="_blank" title="${transaction.from}">${transaction.shortFrom}</a>`,
            type: transaction.fromHash ? `<div class="table-label in-label">${this.$t("transaction.receive")}</div>` : `<div class="table-label out-label">${this.$t("transaction.send")}</div>`,
            blockType: `<div title="${ this.$t(`transaction.blockType.${transaction.blockType}.title`) }">${this.$t(`transaction.blockType.${transaction.blockType}.name`)}</div>`,
            amount,
            status: ["unknown", "open", "closed"][transaction.status],
            confirmTimes: transaction.confirmTimes,
            tokenName: transaction.tokenSymbol,
            accountAddress: `<a href="${lang}/account/${transaction.accountAddress}" target="_blank" title="${transaction.accountAddress}">${transaction.accountAddress}</a>`,
          });
        });
        return list;
      }
    },
    watch: {
      tokenId() {
        this.resetParams();
        this.fetchTransList();
      },
      accountAddress() {
        this.fetchTransList();
      },
      filterAccoutAddr(val) {
        this.filterAddressObj = val || null;
        val && this.fetchTransList();
      },
      onRoad(val) {
        if (val) {
          this.resetParams();
        }
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
      getSelectFilter(filterObj) {
        this.selectObj = filterObj;
        this.fetchTransList();
      },
      getSortFilter(filterObj) {
        this.sortObj = filterObj;
        this.fetchTransList();
      },
      fetchList(currentIndex = 1) {
        this.loading = true;
        this.pageIndex = currentIndex;
        transaction.getList({
          pageIndex: currentIndex,
          pageSize: this.pageSize
        }).then(({ transactionList, totalNumber, pageTotalNumber}) => {
          this.loading = false;
          this.transactionList = transactionList;
          this.totalNumber = totalNumber;
          this.pageTotalNumber = pageTotalNumber;
        }).catch((err) => {
          this.$message.error(err.msg || "get transList failed");
        });
      },
      handleResponse(currentIndex, accountAddress, tokenId, transactionList, totalNumber, pageTotalNumber) {
        if (!this.isRightRequest(currentIndex, accountAddress, tokenId)) {
          return;
        }
        this.loading = false;
        this.transactionList = transactionList;
        this.totalNumber = totalNumber;
        this.pageTotalNumber = pageTotalNumber;
        if (!this.filterAddressObj && !this.selectObj) {
          this.$emit("totalNumber", this.totalNumber);
        }
      },
      resetParams() {
        //TODO  need check
        this.pageIndex = 1;
        this.sortObj = {sort: "timestamp", order: "desc"};
        this.filterAddressObj = null;
        this.selectObj = null;
      },

      fetchTransList(currentIndex = 1) {
        this.loading = true;
        this.pageIndex = currentIndex;
        let tokenId = this.tokenId;
        let accountAddress = this.accountAddress;
        let defaultPagination = {
          pageIndex: currentIndex,
          pageSize: this.pageSize,
          sortObj: this.sortObj
        };
        this.getCommonTxList(defaultPagination, currentIndex, accountAddress, tokenId);
      },
      getCommonTxList(defaultPagination, currentIndex, accountAddress, tokenId) {
        transaction.getList({
          ...defaultPagination
        }, accountAddress, tokenId, this.blockHash, this.filterAddressObj, this.selectObj, this.onRoad).then(({ transactionList, totalNumber, pageTotalNumber }) => {
          this.handleResponse(currentIndex, accountAddress, tokenId, transactionList, totalNumber, pageTotalNumber);
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
<style rel="stylesheet/scss" lang="scss">
.table-label {
  text-align:center;
  font-size: 12px;
  font-weight: 400;
  color: white;
  border-radius: 2px!important;
  line-height: 18px;
}
.in-label {
  background: #5cb85c;
}
.out-label {
  background: #e67e22
}
</style>
