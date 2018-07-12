<template>
  <div class="token-container">
    <page-table v-if="!error"
        :loading="loading"
        :title="$t('blkList.title')"
        :tableTitles="blockTitles"
        :tableData="showBlockList"
        :total="totalNumber"
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
        title: this.$t("head.blockList")
      };
    },
    components: {
      pageTable, error
    },
    async asyncData() {
      try {
        let pageIndex = 0;
        let { blockList, totalNumber } = await block.getList({
          pageIndex, pageSize
        });
        return {
          blockList, pageIndex, totalNumber
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
        totalNumber: 0,
        blockList: [],
        loading: false,
        blockTitles: this.$t("blockTitles"),
        error: "",
      };
    },
    computed: {
      showBlockList() {
        let list = [];
        this.blockList.forEach((block)=>{
          let lang = "";
          this.$i18n.locale !== "en" ? lang = `/${this.$i18n.locale}` : lang = "";
          list.push({
            height: `<a href="${lang}/block/${block.hash}">${block.height}</a>`,
            hash: `<a href="${lang}/block/${block.hash}">${block.hash}</a>`,
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
