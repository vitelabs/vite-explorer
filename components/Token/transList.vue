<template>
  <page-tabel :pagination="false"
    :title="'最近的6笔交易'" 
    :tabelTitles="transTitles"
    :tabelData="transData"
    :total="0">
    <!-- :total="transNum" -->
  </page-tabel>
</template>

<script>
  import pageTabel from "~/components/pageTabel";

  export default {
    components: {
      pageTabel
    },
    computed: {
      transTitles() {
        return [{
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
          prop: "all",
          name: "全部"
        }];
      },
      transData() {
        return [];
      },
    }
  };
</script>
