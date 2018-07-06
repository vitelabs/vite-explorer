<template>
  <page-table
    :showOrder="true"
    :title="'总账户数----, (仅展示最近的----条数据)'"
    :tabelTitles="accountTitles"
    :tabelData="[]"
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
          name: "账户地址"
        }, {
          prop: "balance",
          name: "账户余额"
        }, {
          prop: "percent",
          name: "占总流通比例"
        }, {
          prop: "transNum",
          name: "账户交易次数"
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

