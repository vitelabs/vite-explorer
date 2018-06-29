<template>
  <div class="token-container">
    <page-tabel
        :title="blockTabelTitle" 
        :tabelTitles="blockTitles"
        :tabelData="blockData"
        :total="blockNum"
        :currentChange="blockPageChange">
    </page-tabel>
  </div>
</template>

<script>
  import pageTabel from "~/components/pageTabel";

  export default {
    head() {
      return {
        title: "所有区块"
      };
    },
    components: {
      pageTabel
    },
    data() {
      let blockData = [];
      for(let i=0; i<10; i++) {
        blockData.push({
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
        blockTabelTitle: "总区块量：2382038203 (仅展示最近38203820条数据)",
        blockTitles: [{
          prop: "transHash",
          name: "快照块高度"
        }, {
          prop: "transType",
          name: "快照块年龄"
        }, {
          prop: "status",
          name: "打包账户数"
        }, {
          prop: "firstBlock",
          name: "出块节点"
        }, {
          prop: "timestamp",
          name: "快照块Hash"
        }, {
          prop: "confirmNum",
          name: "锻造奖励"
        }],
        blockData,
        blockNum: 10000,
      };
    },
    methods: {
      blockPageChange(currentInx) {
        let blockData = [];
        for(let i=0; i<10; i++) {
          blockData.push({
            transHash: "sdsdsdsds" + currentInx,
            transType: "sdsdsdsd" + currentInx,
            status: "sdsd" + currentInx,
            firstBlock: "sdsdsdsd" + currentInx,
            timestamp: "sdsdsdsd" + currentInx,
            confirmNum: "sdsdsdsd" + currentInx
          });
        }
        // todo
        this.blockData = blockData;
      }
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  .token-container {
    padding-bottom: 100px;
  }
  .tab-wrapper {
    padding-top: 20px;
    .tab-pane {
      margin-bottom: 0;
    }
  }
</style>
