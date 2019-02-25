<template>
  <page-table
      :loading="loading"
      :title="hasTitle ? blkTitle : null"
      :tableTitles="blockTitles"
      :tableData="showBlockList"
      :total="pageTotalNumber"
      :currentChange="pageChange">
  </page-table>
</template>
<script>
  import pageTable from "~/components/pageTable";
  import block from "~/services/block.js";
  import moment from "moment";

  const pageSize = 20;

  export default {
    components: {
      pageTable
    },
    props: {
      hasTitle: {
        type: Boolean,
        default: true
      },
      isSBP: {
        type: Boolean,
        default: false
      },
      producerAddress: {
        type: String,
        default: ""
      }
    },
    data() {
      return {
        pageIndex: 1,
        totalNumber: 0,
        pageTotalNumber: 0,
        blockList: [],
        loading: false,
        blockTitles:this.$t("blockTitles"),
        title: this.$t("head.blockList")
      };
    },
    mounted() {
      this.pageChange();
    },
    computed: {
      blkTitle() {
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
            hash: `<a href="${lang}/block/${block.hash}" target="_blank" title="${block.hash}">${block.shortHash}</a>`,
            price: `${block.amount} VITE`,
            transactionCount: block.transactionCount,
            accountNum: block.accountNum,
            producer: `<a href="${lang}/account/${block.producer}" target="_blank" title="${block.producer}">${block.shortProducer}</a>`,
            age: timestamp + "（" + moment(block.timestamp * 1000).format("YYYY-MM-DD HH:mm:ss") + "）"
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
          pageIndex: currentInx,
          pageSize,
          producerAddress: this.producerAddress || null
        }).then(({ blockList, totalNumber, pageTotalNumber })=>{
          if (this.pageIndex !== currentInx) {
            return;
          }
          this.loading = false;
          this.blockList = blockList;
          this.totalNumber = totalNumber;
          this.pageTotalNumber = pageTotalNumber;
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

</style>