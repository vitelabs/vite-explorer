<template>
  <div class="token-container">
    <page-tabel
        :title="transTabelTitle" 
        :tabelTitles="transTitles"
        :tabelData="transData"
        :total="transNum"
        :currentChange="transPageChange">
    </page-tabel>
  </div>
</template>

<script>
  import pageTabel from "~/components/pageTabel";

  export default {
    head() {
      return {
        title: "所有交易"
      };
    },
    components: {
      pageTabel
    },
    data() {
      let transData = [];
      for(let i=0; i<10; i++) {
        transData.push({
          transHash: "sdsdsdsds",
          transType: "sdsdsdsd",
          status: "sdsd",
          firstBlock: "sdsdsdsd",
          timestamp: "sdsdsdsd",
          confirmNum: "sdsdsdsd",
          outer: "dsdsdsd",
          inner: "sdsdsdsds",
          token: "sdsdjsldsd",
          price: "sdsdsd"
        });
      }

      return {
        transTabelTitle: "总交易量：2382038203 (仅展示最近38203820条数据)",
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
        }],
        transData,
        transNum: 10000,
      };
    },
    methods: {
      transPageChange(currentInx) {
        let transData = [];
        for(let i=0; i<10; i++) {
          transData.push({
            transHash: "sdsdsdsds" + currentInx,
            transType: "sdsdsdsd" + currentInx,
            status: "sdsd" + currentInx,
            firstBlock: "sdsdsdsd" + currentInx,
            timestamp: "sdsdsdsd" + currentInx,
            confirmNum: "sdsdsdsd" + currentInx,
            outer: "dsdsdsd" + currentInx,
            inner: "sdsdsdsds" + currentInx,
            token: "sdsdjsldsd" + currentInx,
            price: "sdsdsd" + currentInx
          });
        }
        // todo
        this.transData = transData;
      }
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  .tab-wrapper {
    padding-top: 20px;
    .tab-pane {
      margin-bottom: 0;
    }
  }
</style>
