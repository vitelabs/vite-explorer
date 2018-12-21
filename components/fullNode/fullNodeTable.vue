<template>
  <div class="page-table-container">
    <div class="table">
      <el-table 
        v-loading="loading" 
        :stripe="true"
        :data="currentTableData" 
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
              <div slot="reference">
                <div v-if="!tT.name">
                  <div @click="onClickItem(scope.row, scope.$index)">
                    <img :src="scope.row.radio" v-if="tT.prop === 'radio'" class="choice-icon"/>
                  </div>
                  <div v-if="tT.prop === 'broadcastTimeList'">
                    <bar :bar-style="barStyle" :show-axis="false" type="mini" :list="scope.row.broadcastTimeList"></bar>
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

    <div v-if="pagination" v-show="total" class="pagination">
      <el-pagination layout="prev, pager, next"
        :background="true" @current-change="_currentChange"
        :page-size="pageSize" :current-page="currentInx"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script type="text/babel">
  import Bar from "~/components/Charts/Bar.vue";
  import moment from "moment";
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
      total: {
        type: Number,
        default: 0
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
    },
    components: {
      Bar
    },
    data() {
      return {
        currentWeight : 100000,
        currentInx: this.currentPage,
        noResult: this.$t("utils.noResult"),
        barStyle: {
          width: "100%",
          height: "50px",
          marginTop: "0px",
          marginLeft: "-20px"
        },
        currentTableData: []
      };
    },
    watch: {
      currentPage() {
        this.currentInx = this.currentPage;
      },
      tableData(val) {
        let start = 10 * (this.currentInx - 1);
        let end = start + 10;
        let realEnd = end > val.length ? val.length : end;
        this.currentTableData = this.nodeViewData(val.slice(start, realEnd));
      }
    },
    methods: {
      dispatchColor(name) {
        if (name === 0) return "#749AF8";
        if (name > 0 && name <= 1) return "#5CB85C";
        if (name > 1 && name <= 3) return "#F4CD41";
        if (name > 3 && name <= 7) return "#E87400";
        if (name > 7) return "#EE2E38";
        return "";
      },
      nodeViewData(list) {
        let now = Date.now();
        let lang = this.$i18n.locale !== "en" ? `/${this.$i18n.locale}` : "";
        
        list && list.forEach((node) => {
          let latestBlockTime = new Date(node.latestBlockTime);
          let time = moment(latestBlockTime).format().replace("T", " ");
          node.broadcastTimeView = `<span style="color: ${this.dispatchColor(node.broadcastTime / 1000)}">${node.broadcastTime}ms</span>`,
          node.avgBroadcastTimeView = `<span style="color: ${this.dispatchColor(node.avgBroadcastTime / 1000)}">${node.avgBroadcastTime}ms</span>`,
          node.nodeDelayTimeView = `${now - node.nodeDelayTime}ms`,
          node.onlinePercentView = `${node.onlinePercent * 100}%`,
          node.latestBlockTimeView = time,
          node.radio = node.status ? 
            node.weight ? require("~/assets/images/fullNode/disable_choice.svg") : require("~/assets/images/fullNode/disable_unchoice.svg")
            : node.weight ? require("~/assets/images/fullNode/choice.svg") : require("~/assets/images/fullNode/unchoice.svg");
          node.nodeViewName = `<a href="${lang}/account/${node.rewardAddress}" target="_blank">${node.nodeName}</a>`;
        });
        return list;
      },
      sort(val) {
        val.sort(function(left, right) {
          if (left.weight > right.weight) {
            return -1;
          }
          if(left.weight < right.weight) {
            return 1;
          }
          if(left.weight === right.weight) {
            if (left.originIndex > right.originIndex) {
              return 1;
            }
            if(left.originIndex < right.originIndex) {
              return -1;
            }
          }
          return 0;
        });
      },
      tableRowClassName({row}) {
        if (row.status === -1) {
          return "disable-row";
        } 
        return "";
      },
      _currentChange(index) {
        this.currentInx = index;
        this.currentChange(index);
      },
      onClickItem(row, index) {
        if(row.weight) {
          row.weight = 0;
        } else{
          row.weight = this.currentWeight;
          this.currentWeight--;
        }
        row.radio = row.status ? 
          row.weight ? require("~/assets/images/fullNode/disable_choice.svg") : require("~/assets/images/fullNode/disable_unchoice.svg")
          : row.weight ? require("~/assets/images/fullNode/choice.svg") : require("~/assets/images/fullNode/unchoice.svg");

        this.tableData[10 * (this.currentInx  - 1) + index] = row;
        this.sort(this.tableData);

        let start = 10 * (this.currentInx - 1);
        let end = start + 10;
        let realEnd = end > this.tableData.length ? this.tableData.length : end;
        this.currentTableData = this.nodeViewData(this.tableData.slice(start, realEnd));
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
