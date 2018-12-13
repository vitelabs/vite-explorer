<template>
  <div class="full-node-container">
    <div v-if="!error">
      <div class="line">
        <card :info="info.block" class="card-text"></card>
        <card :info="info.nodeOnline" class="card-text">
          <i18n path="fullNode.popover.nodeOnline" tag="span" class="title" slot="popoverContent">
            <span place="onlineNode">{{ onlineNode }}</span>
            <span place="historyNode">{{ historyNode }}</span>
          </i18n>
        </card>
        <card :info="info.pageDelay" class="card-text"></card>
      </div>
      <div class="line">
        <card :info="info.broadcast" class="card-multi">
          <template slot="nodeContent">
            <bar></bar>
          </template>
        </card>
        <card :info="info.nodePosition" class="card-multi">
          <template slot="nodeContent">
            <w-map></w-map>
          </template>
        </card>
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
  import Bar from "~/components/Charts/Bar.vue";
  import WMap from "~/components/Charts/WMap.vue";

  export default {
    head() {
      return {
        title: this.title,
      };
    },
    components: {
      error, card, fullNodeTable, Bar, WMap
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
        onlineNode: 36,
        historyNode: 42
      };
    },
    computed: {
      info() {
        let percent = "90%";
        return {
          block: {
            img: require("~/assets/images/fullNode/newest_block.svg"),
            title: this.$t("fullNode.contentTitle.block"),
            text: "2222"
          },
          nodeOnline: {
            img: require("~/assets/images/fullNode/online.svg"),
            title: this.$t("fullNode.contentTitle.nodeOnline"),
            text: `${this.onlineNode}/${this.historyNode}`,
            popover: true
          },
          pageDelay: {
            img: require("~/assets/images/fullNode/page_delay.svg"),
            title: this.$t("fullNode.contentTitle.pageDelay"),
            text: "2222"
          },
          broadcast: {
            img: require("~/assets/images/fullNode/broadcast.svg"),
            title: this.$t("fullNode.contentTitle.broadcast"),
          },
          nodePosition: {
            img: require("~/assets/images/fullNode/node_position.svg"),
            title: this.$t("fullNode.contentTitle.nodePosition"),
            rightTitle: `${this.$t("fullNode.contentTitle.onlinePercent")}：${percent}`
          }
        };
      },
      nodeData() {
        let list = [];
        this.nodeList && this.nodeList.forEach((node, index) => {
          let lang = "";
          this.$i18n.locale !== "en" ? lang = `/${this.$i18n.locale}` : lang = "";
          list.push({
            ...node,
            originIndex: index,
            weight: 0,
            tag: 0,
            radio: node.status ? require("~/assets/images/fullNode/unchoice.svg") : require("~/assets/images/fullNode/disable_unchoice.svg"),
            nodeName: `<a href="${lang}/SBPDetail/${node.nodeName}" target="_blank">${node.nodeName}</a>`,
          });
        });
        return list;
      }
    },
    methods: {
      getNodeList() {
        this.nodeList = [{
          id: 1,
          status: 1,
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
          id: 2,
          status: 1,
          nodeName: "ccccccccccccc",
          nodeSystem: "v1.8.10-stabel-eacccle",
          nodeDelay: "6s",
          neighbour: 18,
          newestBlock: 1232,
          newestTime: 123,
          broadcastTime: "0ms",
          avgTime: "0ms",
          onlinePercent: "98%"
        }, {
          id: 3,
          status: 0,
          nodeName: "cahsjhdjas",
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
    height: 242px;
  }
}


</style>