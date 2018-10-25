<template>
  <div class="dag-container">
    <div class="header">
      <div class="left-icon">
        <img src="~assets/images/dag.svg"/>
        <span>DAG</span>
      </div>
      <div class="explain">
        <div class="line1">
          <span class="send-icon icon"></span><span class="text">{{ $t('dag.send') }}</span>
          <span class="receive-icon icon"></span><span class="text">{{ $t('dag.receive') }}</span>
        </div>
        <div class="line2">
          <div class="arrow">
            <div class="shaft"></div>
            <div class="arrowhead"></div>
          </div>
          <span class="text">{{ $t('dag.arrow') }}</span>
        </div>
      </div> 
    </div>
    <div class="toolbox">
      <div class="dag-btn" @click="togglePlus">
        <img src="~assets/images/plus.svg"/>
      </div>
      <div class="dag-btn" @click="toggleMinus">
        <img src="~assets/images/minus.svg"/>
      </div>
      <div class="dag-btn" @click="toggleFullscreen">
        <img src="~assets/images/fullscreen.svg"/>
      </div>
    </div>
    <div class="content" style="width: 100%;height:430px;">
      <div id="main"></div>
    </div>
  </div>
</template>

<script>
import echarts from "echarts";
import moment from "moment";
import transaction from "~/services/transaction.js";


const colors = ["#FFC313", "#F79F1E", "#EE5B24", "#EA2026"
  , "#C4E538", "#A2CB39", "#039433", "#006166", "#12CBC4"
  , "#1289A7", "#0552DD", "#1B1464", "#FDA7DF", "#D980FA"
  , "#9980FA", "#5658BB", "#ED4C67", "#B53471", "#833471", "#6F1E51"];

const MAX_NODE = 200;
const DEFAULT_ZOOM = 0.3;
const ZOOM_BALANCE = 0.1;

const defaultSeriesOptions = {
  type: "graph",
  layout: "force",
  symbolSize: 25,
  roam: true,
  force: {
    repulsion: 2500,
    edgeLength: [10, 50]
  },
  emphasis: {
    label: {
      show: false
    }
  },
  edgeLabel: {
    show: false
  },
  draggable: true,
  itemStyle: {
    normal: {
      color: "#4b565b"
    }
  },
  lineStyle: {
    normal: {
      width: 1,
      color: "#9EA4AC"
    }
  }
};

export default {
  props: {
    list: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      echarsInstance: null,
      nodes: [],
      preList: [],
      nodeLinks: [],
      drawTxList:[],
      addressColors:{},
      setZoom: false,
      zoomValue: DEFAULT_ZOOM
    };
  },
  watch: {
    list() {
      this.draw();
    }
  },
  mounted() {
    this.fetchList();
    document.addEventListener("fullscreenchange", this.handleFullscreen);
    document.addEventListener("webkitfullscreenchange", this.handleFullscreen);
    document.addEventListener("mozfullscreenchange", this.handleFullscreen);
    document.addEventListener("msfullscreenchange", this.handleFullscreen);
  },
  methods: {
    handleFullscreen() {
      this.echarsInstance.resize("100%", "100%");
      this.echarsInstance.clear();
      this.setDefaultZoom();
      this.draw();
    },
    toggleFullscreen() {
      let element = document.getElementById("main");
      if (element.webkitRequestFullScreen) {
        element.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT); // Chrome
      }
      if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen(); // Firefox
      }
      if (element.msRequestFullscreen) {
        element.msRequestFullscreen(); // IE11
      }
    },
    togglePlus() {
      this.zoomValue = this.zoomValue + ZOOM_BALANCE;
      this.seriesOptions.zoom = this.zoomValue;
      this.setZoom = true;
      this.draw();
    },
    toggleMinus() {
      if (this.zoomValue > ZOOM_BALANCE) {
        this.zoomValue = this.zoomValue - ZOOM_BALANCE;
        this.seriesOptions.zoom = this.zoomValue;
        this.setZoom = true;
        this.draw();
      }
    },
    fetchList(currentIndex = 1) {
      this.pageIndex = currentIndex;
      transaction.getList({
        pageIndex: currentIndex,
        pageSize: 100
      }).then(({ transactionList }) => {
        this.drawTxList = transactionList;
        this.setDefaultZoom();
        this.draw();
      }).catch((err) => {
        this.$message.error(err.msg || "get transList failed");
      });
    },
    mergeNewTxList() {
      // if (!this.preList.length) {
      //   this.preList = this.list;
      //   this.drawTxList = this.list;
      //   return;
      // } 
      // let result = this.list;
      // this.list.forEach(element => {
      //   this.preList.forEach(preEle => {
      //     if (!this.list.find(e => e.hash === preEle.hash)) {
      //       if (element.prevHash === preEle.hash) {
      //         result.push(preEle);
      //       }
      //     }
      //   });
      // });
      this.list.forEach(element => {
        if (!this.drawTxList.find(e => e.hash === element.hash)) {
          this.drawTxList.push(element);
        }
      });

      if (this.drawTxList.length > MAX_NODE) {
        this.drawTxList = this.drawTxList.slice(this.drawTxList.length - MAX_NODE);
      }
    },
    dispatchAddressColor() {
      let i = 0;
      this.addressColors = {};
      this.drawTxList.forEach(element => {
        if (!this.addressColors[element.accountAddress]) {
          this.addressColors[element.accountAddress] = i;
          i++;
        }
      });
    },
    generateNode() {
      this.dispatchAddressColor();
      this.nodes = this.drawTxList.map((item)=> {
        return {
          ...item,
          name: item.hash,
          symbol: item.fromHash ? "react" : "circle",
          backgroundColor: item.fromHash ? "#5cb85c" : "#e67e22",
          itemStyle: {
            normal: {
              color: colors[this.addressColors[item.accountAddress]]
            }
          },
          type: item.fromHash ? "Receive" : "Send",
        };
      });
    },
    generateNodeLinks() {
      this.nodeLinks = this.drawTxList.map((item)=> {
        return {
          ...item,
          type: item.fromHash ? "Receive" : "Send",
          backgroundColor: item.fromHash ? "#5cb85c" : "#e67e22",
          source: item.hash,
          target: item.fromHash,
          symbol: ["none", "arrow"]
        };
      });

      this.nodeLinks = this.nodeLinks.concat(this.drawTxList.map((item)=> {
        return {
          ...item,
          type: item.fromHash ? "Receive" : "Send",
          backgroundColor: item.fromHash ? "#5cb85c" : "#e67e22",
          source: item.prevHash,
          target: item.hash,
          symbol: ["none", "arrow"]
        };
      }));
    },
    setDefaultZoom() {
      this.seriesOptions = Object.assign({
        zoom: DEFAULT_ZOOM,
        data: this.nodes,
        links: this.nodeLinks
      },
      defaultSeriesOptions
      );
      this.setZoom = true;
    },
    clear() {
      this.echarsInstance.clear();
    },
    draw() {
      this.mergeNewTxList();
      this.generateNode();
      this.generateNodeLinks();
      this.echarsInstance = echarts.init(document.getElementById("main"));
      let lang = "";
      this.$i18n.locale !== "en" ? lang = `/${this.$i18n.locale}` : lang = "";
      if (!this.setZoom) {
        this.seriesOptions = Object.assign({
          data: this.nodes,
          links: this.nodeLinks
        },
        defaultSeriesOptions
        );
      }
      this.setZoom = false;
      this.echarsInstance.setOption({
        tooltip: {
          backgroundColor: "#fff",
          borderColor: "#E5EDF3",
          borderWidth: 1,
          padding: 0,
          position: {right: 5, bottom: 5},
          alwaysShowContent: true,
          formatter: function (params) {
            let content = params.data;
            let timestamp = moment(content.timestamp * 1000).format("HH:mm:ss");
            return `<div class="card">
                <div class="card-header"><a href="${lang}/transaction/${content.hash}" target="_blank">${content.shortHash}</a><span class="time">${timestamp}</span></div>
                <div class="card-content"><span class="type">${content.type}</span><a href="${lang}/account/${content.accountAddress}" target="_blank">${content.shortAccountAddress}</a></div> 
                <div class="card-footer"><span class="footer-content" style="background-color: ${content.backgroundColor}">${content.amount} ${content.tokenSymbol}</span></div>
              </div>`;
          }
        },
        series: [this.seriesOptions]
      });
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
@import "assets/css/vars.scss";
  .dag-container {
    position: relative;
    height: 500px;
    background: #FFFFFF;
    border: 1px solid #E5EDF3;
    box-shadow: 0 6px 36px 0 rgba(0,62,100,0.04);
    border-radius: 4px 4px 0 0;
    .toolbox {
      position: absolute;
      z-index: 999;
      right: 0;
      display: flex;
      display: -webkit-flex;
    }
    .dag-btn {
      padding: 5px 10px;
      border-left: 1px solid #E5EDF3;
      border-bottom: 1px solid #E5EDF3;
      background-color: white;
      &:hover {
        cursor: pointer;
      }
    }
     canvas:-webkit-full-screen {
      width: 100%;
      height: 100%;
    }
    #main {
      width: 100%;
      height: 100%;
      background-color: white;
    }

    .card {
      width: 350px;
      opacity: 0.85;
      color: #182f48;;
      .card-header {
        display: flex;
        display: -webkit-flex;
        justify-content: space-between;
        padding: .25rem .75rem;
        background-color: rgba(0,0,0,.03);
        border-bottom: 1px solid rgba(0,0,0,.125);
        box-sizing: border-box;
        .time {
          color: #e83e8c;
        }
      }
      .card-content {
        display: flex;
        display: -webkit-flex;
        justify-content: space-between;
        padding: .5rem;
        .type {
          box-sizing: border-box;
          display: inline-block;
          background-color: #eee;
          color: #182f48;
          padding: .25em 1rem;
          font-weight: 300;
        }
      }
      .card-footer {
        text-align: right;
        padding: .25rem .75rem;
        background-color: rgba(0,0,0,.03);
        border-top: 1px solid rgba(0,0,0,.125);
        box-sizing: border-box;
        .footer-content {
          display: inline-block;
          box-sizing: border-box;
          padding: .2rem .4rem;
          color: #fff;
        }
      }
    }
    .header {
      box-sizing: border-box;
      border-bottom: 1px solid #E5EDF3;
      height: 70px;
      padding: 0 34px 0 34px;
      display: flex;
      display: -webkit-flex;
      justify-content: space-between;
      .left-icon {
        line-height: 70px;
        font-weight: 500;
        font-size: 16px;
        color: $common-color;
        letter-spacing: 0.3px;
      }
      img {
        vertical-align: middle;
        margin-right: 8px; 
      }
      .explain {
        text-align: right;
        color: #5E6875;
        line-height: 30px;
        font-size: 14px;
        .icon {
          display: inline-block;
          border: 1px solid #5E6875;
          width: 15px;
          height: 15px;
          vertical-align: text-top;
        }
        .text {
          margin-left: 5px; 
        }
        .send-icon {
          border-radius: 15px;
        }
        .receive-icon {
          margin-left: 20px; 
        }
        .arrow {
          display: inline-block;
          .shaft{
            width:20px;
            height:1px;
            background-color:#5E6875;
          }

          .arrowhead{
            margin-left: 20px;
            margin-top: -6.5px; 
            width: 0;
            height: 0;
            border-top: 6px solid  transparent;
            border-bottom: 6px solid transparent;
            border-left: 10px solid #5E6875;
          }
        }
        
      }
    }
  }
</style>
