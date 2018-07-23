<template>
  <div class="token-container">
    <page-table v-if="!error"
        :loading="loading"
        :title="title"
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
  import moment from "moment";

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
      title() {
        return this.$t("blkList.title.total") + this.totalNumber;
      },
      showBlockList() {
        let list = [];
        this.blockList.forEach((block)=>{
          let lang = "";
          this.$i18n.locale !== "en" ? lang = `/${this.$i18n.locale}` : lang = "";
          moment.locale(this.$i18n.locale === "zh" ? "zh-cn" : this.$i18n.locale);
          let timestamp = moment(block.age * 1000).fromNow();
          list.push({
            height: `<a href="${lang}/block/${block.hash}" target="_blank">${block.height}</a>`,
            hash: `<a href="${lang}/block/${block.hash}" target="_blank">${block.hash}</a>`,
            amount: `${block.amount}Vite`,
            accountNum: block.accountNum,
            producer: block.producer,
            age: timestamp
          });
        });
        return list;
      }
    },
    methods: {
      pageChange(currentInx = 1) {
        this.loading = true;
        this.pageIndex = currentInx;

        block.getList({
          pageIndex: currentInx -1,
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
