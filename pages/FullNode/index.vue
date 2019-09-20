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
        :total-size="totalSize"
        :pageSize="pageSize"
        :tableTitles="nodeTitles"
        :tableData="currentPageNodes"
        :client="client"
        ref="tableData">
      </full-node-table>
    </div>
    <error v-else :error="error"></error>
  </div>
</template>

<script>
  import error from "~/components/error";
  import card from "~/components/fullNode/card.vue";
  import fullNodeTable from "~/components/fullNode/fullNodeTable.vue";
  import Bar from "~/components/Charts/Bar.vue";
  import WMap from "~/components/Charts/WMap.vue";
  import { getCookie } from "~/utils/cookie.js";
  import WsClient from "~/utils/network/ws.js";
  import stats from "~/services/stats.js";
  import { mySetInterval, myClearInterval } from "~/utils/myInterval.js";

  const defaultGeneralView = {
    latestSnapshotBlockHeight: null,
    onlineNum: null,
    sysTime: null,
    totalNum: null
  };

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
      this.getDelayTimeInterval();
      this.init();
    },
    watch: {
      networkList(val) {
        if (!this.currentPageNodes) {
          return;
        }
        let list = [];

        val && val.forEach((newitem) => {
          let olditemIndex = list.findIndex(oldItem => {
            return oldItem.uniqId === newitem.uniqId;
          });
          if (olditemIndex > -1) {
            // update item
            list[olditemIndex] = newitem;
          } else {
            // add item
            list.push(newitem);
          }
        });

        this.currentPageNodes = list;
      },
      // "networkList": {
      //   handler: function(val) {
      //     if (!this.allNodes){
      //       return;
      //     }

      //     let list = [].concat(this.allNodes);
          
      //     val && val.forEach((newitem) => {
            
      //       let olditemIndex = list.findIndex(oldItem=>{
      //         return oldItem.uniqId === newitem.uniqId;
      //       });
      //       if(olditemIndex > -1) {
      //         newitem.weight = list[olditemIndex].weight;
      //         newitem.originIndex = list[olditemIndex].originIndex;
      //         list[olditemIndex] = newitem;
      //       } else { 
      //         list.push({
      //           ...newitem,
      //           originIndex:list.length,
      //           weight: 0,
      //         });
      //       }
      //     });
      //     this.allNodes = list;
      //   },
      //   deep: true
      // }
    },
    destroyed() {
      this.client.close();
      if (this.interval) {
        myClearInterval(this.interval);
      }
    },
    data() {
      return {
        totalSize: 0,
        client: null,
        title: this.$t("fullNode.title"),
        error: "",
        nodeTitles: this.$t("fullNode.nodeTitles"),
        barStyle: {
          width: "110%",
          height: "250px",
          marginTop: "-32px",
          marginLeft: "-40px"
        },
        pageIndex: 1,
        pageSize: 10,
        // allNodes: [],
        currentPageNodes: [], // new
        mapList: [],
        generalview: defaultGeneralView,
        networkList: [],
        percents: [],
        interval: null
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
            text: this.sysTime ? `${this.sysTime}ms` : "--"
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
      init() {
        let uuid = getCookie("uuid");
        this.client =  new WsClient(`wss://stats.vite.net/ws/user/${uuid}`, (msg)=> {
          let { method, data } = msg;
          if (method === "generalview") {
            this.generalview = data;
          } else if (method === "blockbroadcastview") {
            this.percents = data.percents;
          } else if(method === "nodelocationlistview") {
            this.mapList = data.nodeViewList;
          } else if (method === "nodelistview") {
            this.networkList = data.nodeViewList;
            this.totalSize = data.totalSize;
          }
        });
      },
      pageChange(pageIndex = 1, filterStr) {
        console.log("pageIndex", pageIndex);
        let sendParams = {
          filter: filterStr,
          paging: {
            count: this.pageSize,
            index: pageIndex
          }
        };
        this.client.send(sendParams);
      },
      getDelayTimeInterval() {
        this.interval = mySetInterval(() => {
          this.getDelayTime();
        }, 1000);
      },
      getDelayTime() {
        let frontTime = Date.now();
        stats.getPageDelayTime().then(data=> {
          this.sysTime = (data.time - frontTime) / 2;
        }).catch(err=> {
          console.log(err);
          this.interval && myClearInterval(this.interval);
        });
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
    height: 286px;
  }
}


</style>
