<template>
  <page-table
    :showOrder="true"
    :title="$t('accList.title')"
    :tableTitles="accountTitles"
    :tableData="[]"
    :total="0"
    :currentChange="accountPageChange">
    <!-- :total="accountNum" -->
  </page-table>
</template>

<script>
  import pageTable from "~/components/pageTable";

  export default {
    components: {
      pageTable
    },
    computed: {
      accountTitles() {
        return [{
          prop: "accountAddress",
          name: "账户地址",
          nameEn: "Account Address",
        }, {
          prop: "balance",
          name: "账户余额",
          nameEn: "Account Balance",
        }, {
          prop: "percent",
          name: "占总流通比例",
          nameEn: "Proportion",
        }, {
          prop: "transNum",
          name: "账户交易次数",
          nameEn: "Transaction Times",
        }];
      }
    },
    methods: {
      accountPageChange(currentInx) {
        console.log(currentInx);
      }
    }
  };
</script>

