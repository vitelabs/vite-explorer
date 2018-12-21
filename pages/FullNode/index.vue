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
        :pagination="true"
       
        :pageSize="10"
        :tableTitles="nodeTitles"
        :tableData="allNodes"
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
      "socket.networkList": {
        handler: function(val) {
          if (!this.allNodes){
            return;
          }

          let list = [].concat(this.allNodes);
          
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
                originIndex:list.length,
                weight: 0,
              });
            }
          });
          // this.total = list.length;
          this.allNodes = list;
        },
        deep: true
      }
    },
    destroyed() {
      this.socket.close();
    },
    data() {
      return {
        total: 0,
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
        pageIndex: 1,
        currentPageList: [],
        allNodes: [],
        broadcastTimeList: [],
        mapList: [],
        generalview: {},
        percents: []
      };
    },
    computed: {
      info() {
        let lang = this.$i18n.locale !== "en" ? `/${this.$i18n.locale}` : "";
        let latestSnapshotBlockHeight = this.generalview.latestSnapshotBlockHeight;
        return {
          block: {
            img: require("~/assets/images/fullNode/newest_block.svg"),
            title: this.$t("fullNode.contentTitle.block"),
            text: latestSnapshotBlockHeight  === 0 || latestSnapshotBlockHeight ?  `<a href="${lang}/block/${this.generalview.snapshotBlockHash}" target="_blank">${latestSnapshotBlockHeight}</a>` : "--"
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
            text: this.generalview.sysTime ? `${new Date() - this.generalview.sysTime}ms` : "--"
          },
          broadcast: {
            img: require("~/assets/images/fullNode/broadcast.svg"),
            title: this.$t("fullNode.contentTitle.broadcast")
          },
          nodePosition: {
            img: require("~/assets/images/fullNode/node_position.svg"),
            title: this.$t("fullNode.contentTitle.nodePosition"),
            // rightTitle: `${this.$t("fullNode.contentTitle.onlinePercent")}：${percent}`
          }
        };
      }
    },
    methods: {
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
