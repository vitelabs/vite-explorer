<template>
  <div class="token-container">
    <page-table v-if="!error"
        :loading="loading"
        :title="$t('blkList.title')"
        :tableTitles="blockTitles"
        :tableData="showBlockList"
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
        title: "All Blocks"
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
          error: err.msg || "get blockList failed"
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
          name: "快照块高度",
          nameEn: "Snapshot Height",
        }, {
          prop: "years",
          name: "快照块年龄",
          nameEn: "Snapshot Age",

        }, {
          prop: "accountNum",
          name: "打包账户数",
          nameEn: "Packing Accounts",

        }, {
          prop: "producer",
          name: "出块节点",
          nameEn: "Generation Node",

        }, {
          prop: "hash",
          name: "快照块Hash",
          nameEn: "Snapshot Hash",

        }, {
          prop: "amount",
          name: "锻造奖励",
          nameEn: "Forging Rewards",
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
          this.$message.error(err.msg || "get blockList failed");
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
