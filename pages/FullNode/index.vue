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
        :tableData="nodeViewList"
        ref="tableData">
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
      this.mapList = this.socket.mapList;
    },
    watch: {
      "socket.generalView": function(val) {
        this.generalview = val;
      },
      "socket.percents": function(val){
        this.percents = val;
      },
      "socket.mapList": function(val){
        this.mapList = val;
      },
      "socket.nodeViewList": {
        handler: function(val) {
          if (!this.nodeViewList){
            return;
          }
          let list = [].concat(this.nodeViewList);
        
          val.forEach((newitem) => {
            let olditemIndex = list.findIndex(oldItem=>{
          
              return oldItem.uniqId === newitem.uniqId;
            });
            if(olditemIndex > -1) {
              newitem.weight = list[olditemIndex].weight;
              newitem.originIndex = list[olditemIndex].originIndex;
              list[olditemIndex] = newitem;
            } else {
              list.push({
                ...newitem,
                originIndex: list.length,
                weight: 0
              });
            }
          });
          this.nodeViewList = this.nodeData(list).slice(0, 10);
          console.log("mark end", new Date());
          // this.nodeViewList = val;
        },
        deep: true
      }
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
        broadcastTimeList: [],
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
            text: `${this.generalview.latestSnapshotBlockHeight === 0 || this.generalview.latestSnapshotBlockHeight ? this.generalview.latestSnapshotBlockHeight : "--"}`
          },
          nodeOnline: {
            img: require("~/assets/images/fullNode/online.svg"),
            title: this.$t("fullNode.contentTitle.nodeOnline"),
            text: this.generalview.onlineNum || this.generalview.onlineNum === 0 ? `${this.generalview.onlineNum}/${this.generalview.totalNum}` : "--",
            popover: true
          },
          pageDelay: {
            img: require("~/assets/images/fullNode/page_delay.svg"),
            title: this.$t("fullNode.contentTitle.pageDelay"),
            text: this.generalview.sysTime || "--"
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
      }
    },
    methods: {
      nodeData(list) {
        console.log("tableview");
        list && list.forEach((node) => {
          let lang = "";
          this.$i18n.locale !== "en" ? lang = `/${this.$i18n.locale}` : lang = "";
          node.radio = node.status ? 
            node.weight ? require("~/assets/images/fullNode/disable_choice.svg") : require("~/assets/images/fullNode/disable_unchoice.svg")
            : node.weight ? require("~/assets/images/fullNode/choice.svg") : require("~/assets/images/fullNode/unchoice.svg");
          node.nodeViewName = `<a href="${lang}/SBPDetail/${node.nodeName}" target="_blank">${node.nodeName}</a>`;
        });
        return list;
      },
      intervalGetInfo() {
        this.nodeViewList = this.socket.nodeViewList;
        this.interval = mySetInterval(() => {
          this.nodeViewList = this.socket.nodeViewList;
        }, 1000);
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
