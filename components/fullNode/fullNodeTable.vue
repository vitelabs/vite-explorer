<template>
  <div class="page-table-container">
    <search-input @getInput="filterTable" :placeholder="$t('fullNode.filter.placeholder')"></search-input>
    <div class="table">
      <el-table 
        v-loading="loading" 
        :stripe="true"
        :data="currentPageData" 
        style="width: 100%" 
        :empty-text="noResult"
        :row-class-name="tableRowClassName">
        <el-table-column v-for="(tT, index) in tableTitles" 
          :key="index"
          :prop="tT.prop"
          :label="tT.name" :width="tT.width || ''">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top" :disabled="!tT.popover">
              <div v-if="tT.prop === 'nodeViewName'">
                <p>{{ $t("fullNode.popover.nodeName") }}:  <span style="font-weight: 500">{{ scope.row.nodeName }}</span></p>
                <p>{{ $t("fullNode.popover.position") }}:  <span style="font-weight: 500">{{ `${scope.row.ipInfo && scope.row.ipInfo.country_name}(${scope.row.ipInfo && scope.row.ipInfo.region_name})` }}</span></p>
              </div>
              <div v-if="tT.prop === 'latestBlockTimeView'">
                <span>{{ $t("fullNode.popover.newestTime") }}</span>
                <p>{{ scope.row.latestBlockTimeView }}</p>
              </div>
              <div v-if="tT.prop === 'broadcastTimeView'">
                <p>{{ $t("fullNode.popover.broadcastTime") }}</p>
              </div>
              <div v-if="tT.prop === 'avgBroadcastTimeView'">
                <p>{{ $t("fullNode.popover.avgBroadcastTime") }}</p>
              </div>
              <div slot="reference">
                <div v-if="!tT.name">
                  <div @click="onClickItem(scope.row, scope.$index)">
                    <img :src="scope.row.radio" v-if="tT.prop === 'radio'" class="choice-icon"/>
                  </div>
                  <div v-if="tT.prop === 'broadcastTimeList'">
                    <bar :bar-style="barStyle" :show-axis="false" type="mini" :list="scope.row.broadcastTimeList" :y-max="scope.row.maxBroadcastTime"></bar>
                  </div>
                </div>
                <div v-else>
                  <div v-html="scope.row[tT.prop] || '--'" v-if="scope.row[tT.prop] !== 0" class="overflow"></div>
                  <div v-else>0</div>
                </div>
              </div>
            </el-popover>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div v-if="pagination" v-show="totalSize" class="pagination">
      <pagination 
        :currentPage="currentInx"
        :totalPage="Math.ceil(totalSize/pageSize)" 
        :toPage="_currentChange">
      </pagination>
    </div>
  </div>
</template>

<script type="text/babel">
  import Bar from "~/components/Charts/Bar.vue";
  import moment from "moment";
  import searchInput from "~/components/searchInput.vue";
  import pagination from "~/components/pagination";
  
  export default {
    props: {
      loading: {
        type: Boolean,
        default: false
      },
      title: {
        type: String,
        default: ""
      },
      tableTitles: {
        type: Array,
        default: () =>{
          return [];
        }
      },
      totalSize: {
        type: Number,
        default: 0
      },
      tableData: {
        type: Array,
        default: () =>{
          return [];
        }
      },
      pagination: {
        type: Boolean,
        default: true
      },
      pageSize: {
        type: Number,
        default: 20
      },
      currentChange: {
        type: Function,
        default: ()=>{}
      },
      currentPage: {
        type: Number,
        default: 1
      },
      client: {
        type: Object,
        default: () => {}
      }
    },
    components: {
      Bar, searchInput, pagination
    },
    data() {
      return {
        total: 0,
        currentWeight : 100000,
        currentInx: this.currentPage,
        noResult: this.$t("utils.noResult"),
        barStyle: {
          width: "100%",
          height: "50px",
          marginTop: "0px",
          marginLeft: "-20px"
        },
        currentPageData: [],
        // filteredTableData:[],
        
        search: null
      };
    },
    mounted() {
      this.filterTable();
    },
    watch: {
      currentPage() {
        this.currentInx = this.currentPage;
      },
      tableData(val) {
        // console.log("network list------newest table origin data", val);

        this.currentPageData = [].concat(this.nodeViewData(val));

        // console.log("table view data", this.currentPageData);
        // if(!this.search) {
        //   this.filteredTableData = [].concat(val);
        //   return;
        // } 
        
        // let list = [].concat(this.filteredTableData);

        // val.forEach((newitem) => {
        //   let olditemIndex = list.findIndex(oldItem=>{
        //     return oldItem.uniqId === newitem.uniqId;
        //   });
        //   if(olditemIndex > -1) {
        //     newitem.weight = list[olditemIndex].weight;
        //     newitem.originIndex = list[olditemIndex].originIndex;
        //     list[olditemIndex] = newitem;
        //   }
        // });
        // this.filteredTableData = list;
      }
      // filteredTableData(val) {
      //   let start = 10 * (this.currentInx - 1);
      //   let end = start + 10;
      //   this.total = val.length;
      //   let realEnd = end > val.length ? val.length : end;
      //   this.currentPageData = this.sort(this.nodeViewData(val.slice(start, realEnd)));
      // }
    },
    
    methods: {
      filterTable(str) {
        let filterInput = str || null;
        this.search = filterInput || null;
        this.currentInx = 1;
        let sendParams = {
          data: {
            searchExpression: this.search,
            pageInfo: {
              curPage: this.currentInx,
              pageSize: this.pageSize
            }
          },
          type: "SearchCondition"
        };
        console.log("sendParams", sendParams);
        console.log("filter", filterInput);
        this.client && this.client.send(sendParams);
        // if (!this.search) {
        //   this.total = this.tableData.length;
        //   this.currentInx = 1;
        //   this.filteredTableData  = [].concat(this.tableData);
        //   return;
        // }
        // let list = [];
        // for(let i = 0; i < this.tableData.length; i++) {
        //   if(this.tableData[i].nodeName.toLowerCase().indexOf(this.search.toLowerCase()) > -1) {
        //     list.push(this.tableData[i]);
        //   }
        // }
        // this.total = list.length;
        // this.currentInx = 1;
        // this.filteredTableData  = list;
      },
      dispatchColor(name) {
        if (name === 0) return "#749AF8";
        if (name > 0 && name <= 1) return "#5CB85C";
        if (name > 1 && name <= 3) return "#F4CD41";
        if (name > 3 && name <= 7) return "#E87400";
        if (name > 7) return "#EE2E38";
        return "";
      },
      nodeViewData(list) {
        let viewList = [].concat(list);
        let lang = this.$i18n.locale !== "en" ? `/${this.$i18n.locale}` : "";
        
        viewList && viewList.forEach((node) => {
          let latestBlockTime = new Date(node.latestBlockTime);
          let time = moment(latestBlockTime).format().replace("T", " ");
          node.broadcastTimeView = `<span style="color: ${this.dispatchColor(node.broadcastTime / 1000)}">${node.broadcastTime}ms</span>`,
          node.avgBroadcastTimeView = `<span style="color: ${this.dispatchColor(node.avgBroadcastTime / 1000)}">${node.avgBroadcastTime}ms</span>`,
          node.nodeDelayTimeView = `${node.nodeDelayTime}ms`,
          node.onlinePercentView = `${Math.round(node.onlinePercent * 100)}%`,
          node.latestBlockTimeView = time,
          node.radio = node.status ? 
            (node.favor ? require("~/assets/images/fullNode/disable_choice.svg") : require("~/assets/images/fullNode/disable_unchoice.svg"))
            : (node.favor ? require("~/assets/images/fullNode/choice.svg") :  require("~/assets/images/fullNode/unchoice.svg")),
          // node.radio = node.status ? 
          //   node.weight ? require("~/assets/images/fullNode/disable_choice.svg") : require("~/assets/images/fullNode/disable_unchoice.svg")
          //   : node.weight ? require("~/assets/images/fullNode/choice.svg") : require("~/assets/images/fullNode/unchoice.svg");
          node.nodeViewName = `<a href="${lang}/account/${node.rewardAddress}" target="_blank">${node.nodeName}</a>`;
        });
        return viewList;
      },
      // sort(val) {
      //   val.sort(function(left, right) {
      //     if (left.weight > right.weight) {
      //       return -1;
      //     }
      //     if(left.weight < right.weight) {
      //       return 1;
      //     }
      //     if(left.weight === right.weight) {
      //       if (left.originIndex > right.originIndex) {
      //         return 1;
      //       }
      //       if(left.originIndex < right.originIndex) {
      //         return -1;
      //       }
      //     }
      //     return 0;
      //   });
      //   return val;
      // },
      tableRowClassName({row}) {
        if (row.status === -1) {
          return "disable-row";
        } 
        return "";
      },
      _currentChange(index) {
        this.currentInx = index;
        let sendParams = {
          data: {
            searchExpression: this.search,
            pageInfo: {
              curPage: this.currentInx,
              pageSize: this.pageSize
            }
          },
          type: "SearchCondition"
        };
        console.log("sendParams", sendParams);
        this.client && this.client.send(sendParams);
      },
      onClickItem(row) {
        let sendParams = {
          data: {
            uniqId: row.uniqId
          },
          type: row.favor ? "CancelFavor" : "Favor"
        };
        console.log("sendParams", sendParams);
        row.radio = row.status ? 
          (row.favor ? require("~/assets/images/fullNode/disable_choice.svg") : require("~/assets/images/fullNode/disable_unchoice.svg"))
          : (row.favor ? require("~/assets/images/fullNode/choice.svg") :  require("~/assets/images/fullNode/unchoice.svg")),
        
        this.client.send(sendParams);




        // if(row.weight) {
        //   row.weight = 0;
        // } else{
        //   row.weight = this.currentWeight;
        //   this.currentWeight--;
        // }
        // row.radio = row.status ? 
        //   row.weight ? require("~/assets/images/fullNode/disable_choice.svg") : require("~/assets/images/fullNode/disable_unchoice.svg")
        //   : row.weight ? require("~/assets/images/fullNode/choice.svg") : require("~/assets/images/fullNode/unchoice.svg");
        
        // let findIndex = this.tableData.findIndex(item=>{
        //   return item.uniqId === row.uniqId;
        // });

        // this.tableData[findIndex] = row;
        // this.sort(this.tableData);
      }
    }
  };
</script>

<style rel="stylesheet/scss" lang="scss">
.page-table-container {
  .el-table .disable-row {
    color: #C1C3C5;
    a {
      color: #C1C3C5;
    }
  }
  .overflow {
    word-break:keep-all;   
    white-space:nowrap;     
    overflow:hidden;         
    text-overflow:ellipsis;  
  }
  .table {
    box-sizing: border-box;
    background: #FFFFFF;
    border: 1px solid #E5EDF3;
    border-bottom: none;
    box-shadow: 0 6px 36px 0 rgba(0,62,100,0.04);
    border-radius: 4px;
    margin-top: 30px;
    .choice-icon {
      vertical-align: middle;
      cursor: pointer;
    }
  }
  .page-table-container {
    width: 100%;
  }
  .title {
    padding: 15px;
    padding-top: 0;
  }
  .pagination {
    text-align: right;
    padding: 20px;
  }
}
  
</style>
