<template>
  <div class="token-container">
    <page-table v-if="!error"
        :loading="loading"
        :title="'总区块量：---- (仅展示最近----条数据)'"
        :tabelTitles="blockTitles"
        :tabelData="showBlockList"
        :total="10000"
        :currentChange="pageChange">
    </page-table>
    <error v-else :error="error"></error>
  </div>
</template>

<script>
  import pageTable from "~/components/pageTable";
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
      pageTable, error
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
        loading: false,
        error: "",

        blockTitles: [{
          prop: "height",
          name: "快照块高度"
        }, {
          prop: "years",
          name: "快照块年龄"
        }, {
          prop: "accountNum",
          name: "打包账户数"
        }, {
          prop: "producer",
          name: "出块节点"
        }, {
          prop: "hash",
          name: "快照块Hash"
        }, {
          prop: "amount",
          name: "锻造奖励"
        }]
      };
    },
    computed: {
      showBlockList() {
        let list = [];
        this.blockList.forEach((block)=>{
          list.push({
            height: `<a href="/block/${block.hash}">${block.height}</a>`,
            hash: `<a href="/block/${block.hash}">${block.hash}</a>`,
            amount: `${block.amount}Vite`,
            accountNum: block.accountNum,
            producer: block.producer
          });
        });
        return list;
      }
    },
    methods: {
      pageChange(currentInx) {
        this.loading = true;
        this.pageIndex = currentInx;

        block.getList({
          pageIndex: currentInx,
          pageSize
        }).then(({ blockList })=>{
          console.log(blockList);
          if (this.pageIndex !== currentInx) {
            return;
          }
          this.loading = false;
          this.blockList = blockList;
        }).catch((err) => {
          if (this.pageIndex !== currentInx) {
            return;
          }
          this.loading = false;
          this.$message.error(err.msg || "get blockList fail");
        });
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
