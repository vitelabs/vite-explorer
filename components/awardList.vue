<template>
  <page-table
      :loading="loading"
      :tableTitles="awardTitles"
      :tableData="showAwardList"
      :pagination="false">
  </page-table>
</template>
<script>
  import pageTable from "~/components/pageTable";
  import block from "~/services/block.js";
  // import moment from "moment";

  export default {
    components: {
      pageTable
    },
    props: {
      hasTitle: {
        type: Boolean,
        default: true
      },
      nodeName: {
        type: String,
        default: ""
      }
    },
    data() {
      return {
        awardList: [],
        loading: false,
        awardTitles:this.$t("SBPAwardList.titles"),
      };
    },
    mounted() {
      this.fetchAwardList();
    },
    computed: {
      showAwardList() {
        let list = [];
        this.awardList.forEach((award)=>{
          // let lang = "";
          // this.$i18n.locale !== "en" ? lang = `/${this.$i18n.locale}` : lang = "";
          // moment.locale(this.$i18n.locale === "zh" ? "zh-cn" : this.$i18n.locale);
          // let timestamp = moment(block.age * 1000).fromNow();
          list.push({
            ...award
          });
        });
        return list;
      }
    },
    methods: {
      fetchAwardList() {
        this.loading = true;
        block.getList({
          producerAddress: this.producerAddress || null
        }).then(({ blockList })=>{
          this.loading = false;
          this.awardList = blockList;
        }).catch((err) => {
          this.loading = false;
          this.$message.error(err.msg || "get blockList failed");
        });
      }
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>

</style>