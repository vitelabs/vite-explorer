<template>
<div>
  <page-table
    :showOrder="true"
    :tableTitles="$t('accTitles')"
    :tableData="accountList"
    :total="totalNumber"
    :currentChange="accountPageChange"
    :currentPage="pageIndex"
    :sub-title="subTitle"
    :pagination="pagination"
    :loading="loading">
  </page-table>
</div>
  
</template>

<script>
  import pageTable from "~/components/pageTable";
  import account from "~/services/account.js";

  export default {
    props: {
      subTitle: {
        type: String,
        default: ""
      },
      pagination: {
        type: Boolean,
        default: true
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
        pageSize: 20
      };
    },
    mounted() {
      this.fetchAccountList();
    },
    methods: {
      fetchAccountList(currentIndex = 1) {
        this.loading = true;
        this.pageIndex = currentIndex;
        account.getList({
          pageIndex: currentIndex -1,
          pageSize: this.pageSize
        }).then(data => {
          this.loading = false;
          this.totalNumber = data.totalNumber;
          this.formatAccountList(data.accountList);
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
            accountAddress: `<a href="${lang}/account/${item.accountAddress}" target="_blank" title="${item.accountAddress}">${item.shortAccountAddress}</a>`,
            balance: item.balance,
            percent: item.percent,
            transNum: item.transNum
          });
        });
        this.accountList = list;
      },
      accountPageChange(currentInx) {
        this.fetchAccountList(currentInx);
      },
      openAccoutChart() {

      }
    }
  };
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>

