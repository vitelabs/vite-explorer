<template>
  <div class="node-list-container">
    <div v-if="!error">
      <page-table class="node-table" 
        :pagination="false"
        :loading="loading"
        :title="nodeTableTitle"
        :tableTitles="nodeTitles"
        :tableData="nodeData"
        :total="totalNumber">
      </page-table>
    </div>
    <error v-else :error="error"></error>
  </div>
</template>

<script>
  import pageTable from "~/components/pageTable";
  import error from "~/components/error";
  import superNode from "~/services/superNode.js";


  export default {
    head() {
      return {
        title: this.title,
      };
    },
    components: {
      pageTable, error
    },
    async asyncData() {
      const pageIndex = 1;
      try {
        let { nodeList, totalNumber} = await superNode.getList({
          pageIndex,
          pageSize: 30
        });
        return {
          pageIndex,
          nodeList,
          totalNumber: +totalNumber,
        };
      } catch(err) {
        return {
          error: err.msg || "get nodeList fail"
        };
      }
    },
    data() {
      return {
        title: this.$t("superNode.title"),
        nodeList: [],
        nodeTitles: this.$t("nodeTitles"),
        error: "",
        loading: false,
        totalNumber: 0,
        generalDetail: {}
      };
    },
    computed: {
      nodeTableTitle() {
        return this.$t("superNode.total")+`${this.nodeList && this.nodeList.length || 0}`;
      },
      nodeData() {
        let list = [];
        this.nodeList && this.nodeList.forEach(node => {
          let lang = "";
          this.$i18n.locale !== "en" ? lang = `/${this.$i18n.locale}` : lang = "";
          
          list.push({
            ...node,
            address: `<a href="${lang}/account/${node.address}" target="_blank" title="${node.address}">${node.shortAddress}</a>`
          });
        });
        return list;
      }
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>

</style>
