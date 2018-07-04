<template>
  <div class="token-container">
    <page-tabel v-if="!error"
        :title="'总区块量：---- (仅展示最近----条数据)'" 
        :tabelTitles="blockTitles"
        :tabelData="[]"
        :currentChange="pageChange">
    </page-tabel>
    <error v-else :error="error"></error>
  </div>
</template>

<script>
  import pageTabel from "~/components/pageTabel";
  import error from "~/components/error";
  import block from "~/services/block.js";

  const pageSize = 10;

  export default {
    head() {
      return {
        title: "所有区块"
      };
    },
    components: {
      pageTabel, error
    },
    async asyncData() {
      try {
        let pageIndex = 0;
        let { blockList } = await block.getList({
          pageIndex, pageSize
        });
        return {
          blockList, pageIndex
        };
      } catch(err) {
        return {
          error: err.msg || "get blockList fail"
        };
      }
    },
    data() {
      return {
        pageIndex: 0,
        blockList: [],
        error: "",

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
        }]
      };
    },
    methods: {
      pageChange(currentInx) {
        console.log(currentInx);
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
