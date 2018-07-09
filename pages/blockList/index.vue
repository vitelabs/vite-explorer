<template>
  <div class="token-container">
    <page-table v-if="!error"
        :loading="loading"
        :title="$t('blkList.title')"
        :tableTitles="blockTitle"
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
      };
    },
    computed: {
      blockTitle(){
        if(this.$i18n.locale === 'zh'){
          return this.$i18n.messages.zh.blockTitles;
        }
        return this.$i18n.messages.en.blockTitles;
      },
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
