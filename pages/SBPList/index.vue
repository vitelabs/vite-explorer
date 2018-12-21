<template>
  <div class="node-list-container">
    <div v-if="!error">
      <div class="table-title" v-html="nodeTableTitle"></div>
      <div class="search-container">
        <search-input @getInput="filterTable" :placeholder="$t('filter.SBP.placeholder')"></search-input>
        <div class="producer-cycle">
          {{ $t('filter.SBP.cycle.name') }}
          <span 
            :class="{'lab-selected': latestCycle === item.key}" 
            @click="clickLab(item.key)" 
            v-for="(item, index) in tabList" 
            :key="index">
            {{ $t(`filter.SBP.cycle.${item.label}`) }}
          </span>
        </div>
      </div>
      <SBP-table class="node-table" 
        :pagination="false"
        :loading="loading"
        :title="nodeTableTitle"
        :tableTitles="nodeTitles"
        :tableData="nodeData"
        :total="totalNumber">
      </SBP-table>
    </div>
    <error v-else :error="error"></error>
  </div>
</template>

<script>
  import SBPTable from "~/components/SBPTable";
  import error from "~/components/error";
  import superNode from "~/services/superNode.js";
  import searchInput from "~/components/searchInput.vue";
  import { mySetInterval, myClearInterval} from "~/utils/myInterval.js";

  export default {
    head() {
      return {
        title: this.title,
      };
    },
    components: {
      SBPTable, searchInput, error
    },
    async asyncData() {
      try {
        let { nodeList, totalNum} = await superNode.getList({
          latestCycle: 1
        });
        let fullNodeList = nodeList;
        return {
          nodeList,
          fullNodeList,
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
        tabList: [{
          key: 1,
          label: "one"
        }, {
          key: 3,
          label: "three"
        }, {
          key: 7,
          label: "seven"
        }, {
          key: -1,
          label: "history"
        }],
        title: this.$t("superNode.title"),
        nodeList: [],
        nodeTitles: this.$t("nodeTitles"),
        error: "",
        loading: false,
        totalNumber: 0,
        generalDetail: {},
        latestCycle: 1,
        producingNode: "",
        interval: null
      };
    },
    mounted() {
      this.loopSBPList();
    },
    destroyed() {
      if (this.interval) {
        myClearInterval(this.interval);
      }
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
          let producingNode;
          if (node.nodeName === this.producingNode) {
            producingNode = "Producing";
          }
          list.push({
            ...node,
            nodeName: `<a href="${lang}/SBPDetail/${node.nodeName}" target="_blank">${node.nodeName}</a>`,
            pureStatus: producingNode ? producingNode : node.status,
            status: producingNode ? this.handleStatus(producingNode) : this.handleStatus(node.status),
            curVoteAward: node.curVoteAward ? node.curVoteAward + " VITE" : node.curVoteAward,
            curSuperNodeAward: node.curSuperNodeAward ? node.curSuperNodeAward + " VITE" : node.curSuperNodeAward,
            producerAddress: `<a href="${lang}/account/${node.producerAddress}" target="_blank" title="${node.producerAddress}">${node.shortProducerAddress}</a>`
          });
        });
        return list;
      }
    },
    methods: {
      loopSBPList() {
        this.interval = mySetInterval(() => {
          superNode.loopSBPList().then(data=> {
            this.producingNode = data.superNodeName;
          }).catch(err=> {
            console.log(err);
          });
        }, 1000);
      },
      getSBPList() {
        superNode.getList({
          latestCycle: this.latestCycle
        }).then(({ nodeList })=> {
          this.nodeList = nodeList;
        }).catch(err=> {
          console.log(err);
        });
      },
      clickLab(key) {
        this.latestCycle = key;
        this.getSBPList();
      },
      handleStatus(status) {
        if (status === "Producing") {
          return `<div class="producing"><img src="${require("~/assets/images/tips.svg")}" class="producing-icon"></img><div class="producing-label">${status}</div></div>`;
        }
        if (status === "Active") {
          return `<div class="table-label active-label">${status}</div>`;
        }
        if(status === "Standby") {
          return `<div class="table-label standby-label">${status}</div>`;
        }
      },
      filterTable(str) {
        let filterInput = str || null;
        this.search = filterInput || null;
        if (!this.search) return this.nodeList = this.fullNodeList;
        let list = [];
        for(let i = 0; i < this.fullNodeList.length; i++) {
          if( this.fullNodeList[i].nodeName.toLowerCase().indexOf(this.search.toLowerCase()) > -1 
          || this.fullNodeList[i].producerAddress.toLowerCase().indexOf(this.search.toLowerCase()) > -1 ) {
            list.push(this.fullNodeList[i]);
          }
        }
        this.nodeList = list;
      },
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss">
 @import "~assets/css/vars.scss";

.node-list-container {
  .table-label {
    text-align:center;
    font-size: 12px;
    font-weight: 400;
    color: white;
    border-radius: 2px!important;
    line-height: 18px;
    width: 60px;
  }
  .search-container {
    margin-top: 20px;
    display: flex;
    display: -webkit-flex;
    justify-content: space-between;
    .producer-cycle {
      font-size: 14px;
      color: #3F3F3F;
      line-height: 22px;
      span {
        display: inline-block;
        border: 1px solid #E5EDF3;
        border-radius: 2px;
        color: $common-color;
        font-size: 12px;
        padding: 3px 4px;
        margin-left: 14px;
        line-height: 16px; 
        cursor: pointer;
        &:hover {
          color: white;
          border: 1px solid $common-color;
          background: $common-color;
        }
      }
      span.lab-selected {
        background: $common-color;
        border: 1px solid $common-color;
        color: white;
      }
    }
  }
  @media only screen and (min-width: 320px) and (max-width: 767px) {
    .search-container {
        flex-wrap: wrap;
        .producer-cycle {
          margin-top: 10px;
        span {
          display: block;
          margin-top: 10px;
          margin-left: 0px;
        }
      }
    }
  }
  .active-label {
    background: #5cb85c;
  }
  .standby-label {
    background: #e67e22
  }
  .producing {
    display: flex;
    display: -webkit-flex;
    .producing-label {
      font-size: 12px;
      font-weight: 400;
      margin-left: 3px;
    }
    .producing-icon {
      vertical-align: middle;
    }
  }
  
}

</style>
