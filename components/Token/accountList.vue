<template>
<div>
  <page-table
    :tableTitles="tableTitles"
    :tableData="accountList"
    :total="totalNumber"
    :currentChange="accountPageChange"
    :currentPage="pageIndex"
    :pagination="pagination"
    :loading="loading"
    :sort-items="needSort ? ['balance', 'countNum'] : []"
    @sortFilter="getSortFilter">
  </page-table>
</div>
  
</template>

<script>
  import pageTable from "~/components/pageTable";
  import account from "~/services/account.js";

  export default {
    props: {
      tableTitles: {
        type: Array,
        default: () => []
      },
      subTitle: {
        type: String,
        default: ""
      },
      pagination: {
        type: Boolean,
        default: false
      },
      pageSize: {
        type: Number,
        default: 20
      },
      tokenId: {
        type: String,
        default: ""
      },
      needSort: {
        type: Boolean,
        default: false
      }
    },
    components: {
      pageTable
    },
    computed: {
    },
    data(){
      return {
        pageIndex: 1,
        totalNumber: 0,
        loading: false,
        accountList: [],
      };
    },
    mounted() {
      this.fetchAccountList(1, this.pageSize);
    },
    watch: {
      pageSize(val) {
        this.fetchAccountList(1, val);
      }
    },
    methods: {
      getSortFilter(filterObj) {
        this.sortObj = filterObj;
        this.fetchAccountList();
      },
      fetchAccountList(currentIndex = 1, pageSize = 20) {
        this.loading = true;
        this.pageIndex = currentIndex;
        account.getList({
          pageIndex: currentIndex,
          pageSize: pageSize,
          tokenId: this.tokenId,
          sortObj: this.sortObj 
        }).then(data => {
          this.loading = false;
          this.totalNumber = data.totalNumber;
          let totalObj = {
            totalNumber: data.totalNumber,
            totalSupply: data.totalSupply,
            percentPage: data.percentPage,
            haveSupplyPage: data.haveSupplyPage
          };
          this.$emit("getTotal", totalObj, data.tokenAccountViewList);
          this.formatAccountList(data.tokenAccountViewList);
        }).catch(err => {
          this.loading = false;
          this.$message.error(err.msg || "get accountList fail");
        });
      },
      formatAccountList(accountList = []) {
        let list = [];
        let lang = "";
        this.$i18n.locale !== "en" ? lang = `/${this.$i18n.locale}` : lang = "";

        accountList.forEach((item) => {
          list.push({
            orderNum: item.orderNum,
            accountAddress: `<a href="${lang}/account/${item.accountAddress}" target="_blank" title="${item.accountAddress}">${item.shortAccountAddress}</a>`,
            balance: item.balance,
            balancePercent: item.balancePercent,
            countNum: item.countNum
          });
        });
        this.accountList = list;
      },
      accountPageChange(currentInx) {
        this.fetchAccountList(currentInx);
      }
    }
  };
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>

