<template>
  <div class="full-node-container">
    <div v-if="!error">
      <div class="line">
        <card :info="info.block" class="card-text"></card>
        <card :info="info.nodeOnline" class="card-text">
          <i18n path="fullNode.popover.nodeOnline" tag="span" class="title" slot="popoverContent">
            <span place="onlineNode">{{ generalview.onlineNum }}</span>
            <span place="historyNode">{{ generalview.totalNum  }}</span>
          </i18n>
        </card>
        <card :info="info.pageDelay" class="card-text"></card>
      </div>
      <div class="line">
        <card :info="info.broadcast" class="card-multi">
          <template slot="nodeContent">
            <bar :bar-style="barStyle" :list="percents"></bar>
          </template>
        </card>
        <card :info="info.nodePosition" class="card-multi">
          <template slot="nodeContent">
            <w-map :list="mapList"></w-map>
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
  import { mySetInterval, myClearInterval} from "~/utils/myInterval.js";

  export default {
    head() {
      return {
        title: this.title,
      };
    },
    components: {
      error, card, fullNodeTable, Bar, WMap
    },
    
    mounted() {
      this.socket = new fullNode();
      this.generalview = this.socket.generalView;
      this.percents = this.socket.percents;

      // this.getNodeList();
      this.intervalGetInfo();

    },
    watch: {
      "socket.generalView": function(val) {
        this.generalview = val;
      },
      "socket.percents": {
        handler: function(val) {
          this.percents = val;
        },
        deep: true
      },
      "socket.mapList": {
        handler: function(val) {
          this.mapList = val;
        },
        deep: true
      }

      // "socket.nodeViewList": {
      //   handler: function(val) {
      //     this.nodeViewList = val;
      //   },
      //   deep: true
      // }
    },
    destroyed() {
      this.socket.close();
      if (this.interval) {
        myClearInterval(this.interval);
      }
      
    },
    data() {
      return {
        socket: null,
        title: this.$t("fullNode.title"),
        error: "",
        nodeTitles: this.$t("fullNode.nodeTitles"),
        barStyle: {
          width: "110%",
          height: "225px",
          marginTop: "-32px",
          marginLeft: "-40px"
        },
        nodeViewList: [],
        mapList: [],
        generalview: {},
        percents: [],
        interval: null
      };
    },
    computed: {
      info() {
        let percent = "90%";
        return {
          block: {
            img: require("~/assets/images/fullNode/newest_block.svg"),
            title: this.$t("fullNode.contentTitle.block"),
            text: `${this.generalview.latestSnapshotBlockHeight}`
          },
          nodeOnline: {
            img: require("~/assets/images/fullNode/online.svg"),
            title: this.$t("fullNode.contentTitle.nodeOnline"),
            text: `${this.generalview.onlineNum}/${this.generalview.totalNum}`,
            popover: true
          },
          pageDelay: {
            img: require("~/assets/images/fullNode/page_delay.svg"),
            title: this.$t("fullNode.contentTitle.pageDelay"),
            text: this.generalview.sysTime
          },
          broadcast: {
            img: require("~/assets/images/fullNode/broadcast.svg"),
            title: this.$t("fullNode.contentTitle.broadcast")
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
        this.nodeViewList && this.nodeViewList.forEach((node) => {
          let lang = "";
          this.$i18n.locale !== "en" ? lang = `/${this.$i18n.locale}` : lang = "";
          list.push({
            ...node,
            // originIndex: index,
            // weight: 0,
            // tag: 0,
            radio: node.status ? require("~/assets/images/fullNode/disable_unchoice.svg") : require("~/assets/images/fullNode/unchoice.svg"),
            nodeName: `<a href="${lang}/SBPDetail/${node.nodeName}" target="_blank">${node.nodeName}</a>`,
          });
        });
        return list;
      }
    },
    methods: {
      intervalGetInfo() {
        this.nodeViewList = this.socket.nodeViewList;
        this.interval = mySetInterval(() => {
          console.log("view", this.nodeViewList[0]);
          this.nodeViewList = this.socket.nodeViewList;

        }, 1000);
      },
      getNodeList() {
        this.nodeViewList = [{
          uniqId: 1,
          status: 0,
          nodeName: "aaaa",
          network: "fff",
          nodeSysInfo: "v1.8.10-stabel-eacccle",
          nodeDelayTime: "6s",
          peersNum: 18,
          latestBlockHeight: 1232,
          latestBlockTime: 123,
          broadcastTime: "0ms",
          avgBroadcastTime: "0ms",
          onlinePercent: "98%"
        }, {
          uniqId: 2,
          status: 0,
          nodeName: "ccccccccccccc",
          nodeSysInfo: "v1.8.10-stabel-eacccle",
          nodeDelayTime: "6s",
          peersNum: 18,
          latestBlockHeight: 1232,
          latestBlockTime: 123,
          broadcastTime: "0ms",
          avgBroadcastTime: "0ms",
          onlinePercent: "98%"
        }, {
          uniqId: 3,
          status: -1,
          nodeName: "dddd",
          nodeSysInfo: "v1.8.10-stabel-eacccle",
          nodeDelayTime: "6s",
          peersNum: 18,
          latestBlockHeight: 1232,
          latestBlockTime: 123,
          broadcastTime: "0ms",
          avgBroadcastTime: "0ms",
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
