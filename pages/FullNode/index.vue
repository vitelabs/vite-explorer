<template>
  <div class="full-node-container">
    <div v-if="!error">
      <div class="line">
        <card :info="info.block" class="card-text"></card>
        <card :info="info.nodeOnline" class="card-text"></card>
        <card :info="info.pageDelay" class="card-text"></card>
      </div>
      <div class="line">
        <card :info="info.broadcast" class="card-multi"></card>
        <card :info="info.nodePosition" class="card-multi"></card>
      </div>
      <full-node-table
        :pagination="false"
        :tableTitles="nodeTitles"
        :tableData="nodeData">
      </full-node-table>
    </div>
    <error v-else :error="error"></error>
  </div>
</template>

<script>
  import error from "~/components/error";
  import fullNode from "./fullNode.js";
  import card from "~/components/fullNode/card.vue";
  import fullNodeTable from "~/components/fullNode/fullNodeTable.vue";

  export default {
    head() {
      return {
        title: this.title,
      };
    },
    components: {
      error, card, fullNodeTable
    },
    async asyncData() {
      
    },
    mounted() {
      let client = new fullNode();
      client.connect("ws://123.207.109.139:8080/ws/user/aa");
      this.array = client.array;
      console.log(this.array);

      this.getNodeList();

    },
    data() {
      return {
        title: this.$t("fullNode.title"),
        error: "",
        array: [],
        nodeList: [],
        nodeTitles: this.$t("fullNode.nodeTitles"),
        info: {
          block: {
            img: require("~/assets/images/fullNode/newest_block.svg"),
            title: this.$t("fullNode.contentTitle.block"),
            text: "2222"
          },
          nodeOnline: {
            img: require("~/assets/images/fullNode/online.svg"),
            title: this.$t("fullNode.contentTitle.nodeOnline"),
            text: "2222"
          },
          pageDelay: {
            img: require("~/assets/images/fullNode/page_delay.svg"),
            title: this.$t("fullNode.contentTitle.pageDelay"),
            text: "2222"
          },
          broadcast: {
            img: require("~/assets/images/fullNode/broadcast.svg"),
            title: this.$t("fullNode.contentTitle.broadcast"),
            text: "2222"
          },
          nodePosition: {
            img: require("~/assets/images/fullNode/node_position.svg"),
            title: this.$t("fullNode.contentTitle.nodePosition"),
          }
        }
      };
    },
    computed: {
      nodeData() {
        let list = [];
        this.nodeList && this.nodeList.forEach((node) => {
          let lang = "";
          this.$i18n.locale !== "en" ? lang = `/${this.$i18n.locale}` : lang = "";
          list.push({
            ...node,
            nodeName: `<a href="${lang}/SBPDetail/${node.nodeName}" target="_blank">${node.nodeName}</a>`,
          });
        });
        return list;
      }
    },
    methods: {
      getNodeList() {
        this.nodeList = [{
          nodeName: "aaaa",
          network: "fff",
          nodeSystem: "v1.8.10-stabel-eacccle",
          nodeDelay: "6s",
          neighbour: 18,
          newestBlock: 1232,
          newestTime: 123,
          broadcastTime: "0ms",
          avgTime: "0ms",
          onlinePercent: "98%"
        }, {
          nodeName: "ccccccccccccc",
          nodeSystem: "v1.8.10-stabel-eacccle",
          nodeDelay: "6s",
          neighbour: 18,
          newestBlock: 1232,
          newestTime: 123,
          broadcastTime: "0ms",
          avgTime: "0ms",
          onlinePercent: "98%"
        }];
      }
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
.full-node-container {
  .line {
    display: flex;
    display: -webkit-flex;
    justify-content: space-between;
    margin-bottom: 36px;
  }
  .card-text {
    width: 362px;
  }
  .card-multi {
    width: 558px;
  }
}


</style>
