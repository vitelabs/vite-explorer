<template>
  <page-tabel
    :showOrder="true"
    :title="'总账户数0, (仅展示最近的5000条数据)'" 
    :tabelTitles="accountTitles"
    :tabelData="accountData"
    :total="0"
    :currentChange="accountPageChange">
    <!-- :total="accountNum" -->
  </page-tabel>
</template>

<script>
  import pageTabel from "~/components/pageTabel";

  export default {
    components: {
      pageTabel
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
      },
      accountData() {
        return [];
      }
    },
    methods: {
      accountPageChange(currentInx) {
        console.log(currentInx);
      }
    }
  };
</script>

