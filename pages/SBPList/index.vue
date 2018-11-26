<template>
  <div class="node-list-container">
    <div v-if="!error">
      <page-table class="node-table" 
        :pagination="false"
        :loading="loading"
        :title="nodeTableTitle"
        :tableTitles="nodeTitles"
        :tableData="nodeData"
        :total="totalNumber"
        :is-sbp-page="true">
        <search-input @getInput="filterTable" slot="filter"></search-input>
      </page-table>
    </div>
    <error v-else :error="error"></error>
  </div>
</template>

<script>
  import pageTable from "~/components/pageTable";
  import error from "~/components/error";
  import superNode from "~/services/superNode.js";
  import searchInput from "~/components/searchInput.vue";

  export default {
    head() {
      return {
        title: this.title,
      };
    },
    components: {
      pageTable, searchInput, error
    },
    async asyncData() {
      try {
        let { nodeList, totalNum} = await superNode.getList({
          search: null
        });
        return {
          nodeList,
          totalNumber: +totalNum,
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
        generalDetail: {},
        search: null
      };
    },
    computed: {
      nodeTableTitle() {
        return this.$t("superNode.total")+`${this.totalNumber || 0}`;
      },
      nodeData() {
        let list = [];
        this.nodeList && this.nodeList.forEach((node) => {
          let lang = "";
          this.$i18n.locale !== "en" ? lang = `/${this.$i18n.locale}` : lang = "";
          
          list.push({
            ...node,
            nodeName: `<a href="${lang}/SBPDetail/${node.nodeName}" target="_blank">${node.nodeName}</a>`,
            status: node.status,
            voteAward: node.voteAward ? node.voteAward + " VITE" : node.voteAward,
            curVoteAward: node.curVoteAward ? node.curVoteAward + " VITE" : node.curVoteAward,
            curSuperNodeAward: node.curSuperNodeAward ? node.curSuperNodeAward + " VITE" : node.curSuperNodeAward,
            superNodeAward:  node.superNodeAward  ? node.superNodeAward + " VITE" : node.superNodeAward,
            producerAddress: `<a href="${lang}/account/${node.producerAddress}" target="_blank" title="${node.producerAddress}">${node.shortProducerAddress}</a>`
          });
        });
        return list;
      }
    },
    methods: {
      getNodeList() {
        superNode.getList({
          search: this.search
        }).then(data=> {
          this.nodeList = data.nodeList;
        }).catch(err=> {
          console.log(err);
        });
      },
      filterTable(str) {
        let filterInput = str || null;
        this.search = filterInput || null;
        this.getNodeList();
      },
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>

</style>
