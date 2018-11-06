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
        let { nodeList, totalNumber} = await superNode.getList({
          producerAddress: null,
          nodeName: null
        });
        return {
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
        generalDetail: {},
        producerAddress: null,
        nodeName: null
      };
    },
    computed: {
      nodeTableTitle() {
        return this.$t("superNode.total")+`${this.nodeList && this.nodeList.length || 0}`;
      },
      nodeData() {
        let list = [];
        this.nodeList && this.nodeList.forEach((node,index) => {
          let lang = "";
          this.$i18n.locale !== "en" ? lang = `/${this.$i18n.locale}` : lang = "";
          
          list.push({
            ...node,
            status: index < 25 ? `<span title="Snapshot Block Producer">${node.status}</span>` : `<span title="Full Node">${node.status}</span>`,
            producerAddress: `<a href="${lang}/account/${node.producerAddress}" target="_blank" title="${node.producerAddress}">${node.shortProducerAddress}</a>`
          });
        });
        return list;
      }
    },
    methods: {
      getNodeList() {
        superNode.getList({
          producerAddress: this.producerAddress,
          nodeName: this.nodeName
        }).then(data=> {
          this.nodeList = data.nodeList;
          this.totalNumber = data.totalNumber;
        }).catch(err=> {
          console.log(err);
        });
      },
      filterTable(str) {
        let filterInput = str || null;
        if (/vite_[A-Za-z0-9]+/.test(filterInput)) {
          this.producerAddress = filterInput;
          this.nodeName = null;
        } else {
          this.nodeName = filterInput;
          this.producerAddress = null;
        }
        this.getNodeList();
      },
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>

</style>
