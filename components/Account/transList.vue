<template>
  <page-tabel
    :title="'最近的----笔交易, 总交易笔数----'" 
    :tabelTitles="transTitles"
    :tabelData="[]"
    :total="0"
    :currentChange="transPageChange">
    <!-- :total="transNum" -->
  </page-tabel>
</template>

<script>
  import pageTabel from "~/components/pageTabel";

  export default {
    components: {
      pageTabel
    },
    data() {
      return {
        transTitles: [{
          prop: "transHash",
          name: "交易Hash"
        }, {
          prop: "transType",
          name: "交易类型"
        }, {
          prop: "status",
          name: "状态"
        }, {
          prop: "firstBlock",
          name: "首次快照块"
        }, {
          prop: "timestamp",
          name: "时间戳"
        }, {
          prop: "confirmNum",
          name: "确认数"
        }, {
          prop: "outer",
          name: "转出方"
        }, {
          prop: "inner",
          name: "转入方"
        }, {
          prop: "token",
          name: "Token"
        }, {
          prop: "price",
          name: "金额"
        }]
      };
    },
    methods: {
      transPageChange(currentInx) {
        console.log(currentInx);
      }
    }
  };
</script>
