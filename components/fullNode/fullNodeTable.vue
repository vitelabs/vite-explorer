<template>
  <div class="page-table-container">
    <div class="table">
      <el-table 
        v-loading="loading" 
        :stripe="false"
        :data="tableData" 
        style="width: 100%" 
        :empty-text="noResult"
        :row-class-name="tableRowClassName">
        <el-table-column v-for="(tT, index) in tableTitles" 
          :key="index"
          :prop="tT.prop"
          :label="tT.name" :width="tT.width || ''" 
          :show-overflow-tooltip="true">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top" :disabled="!tT.popover">
              <div v-if="tT.prop === 'nodeName'">
                <p>{{ $t("fullNode.popover.network") }}: {{ scope.row.network }}</p>
                <p>{{ $t("fullNode.popover.protocol") }}: {{ scope.row.protocol }}</p>
                <p>{{ $t("fullNode.popover.position") }}: {{ scope.row.position }}</p>
              </div>
              <div v-if="tT.prop === 'newestTime'">
                <span>{{ $t("fullNode.popover.newestTime") }}</span>
              </div>
              <div v-if="tT.prop === 'broadcastTime'">
                <span>{{ $t("fullNode.popover.broadcastTime") }}</span>
              </div>
              <span slot="reference">
                <div v-if="!tT.name">
                  <div @click="onClickItem(scope.row)">
                    <img :src="scope.row.radio" v-if="tT.prop === 'radio'" class="choice-icon"/>
                  </div>
                </div>
                <span v-else>
                  <span v-html="scope.row[tT.prop] || '--'" v-if="scope.row[tT.prop] !== 0"></span>
                  <span v-else>0</span>
                </span>
              </span>
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
      }
    },
    mounted() {
    },
    data() {
      return {
        currentInx: this.currentPage,
        noResult: this.$t("utils.noResult")
      };
    },
    watch: {
      currentPage() {
        this.currentInx = this.currentPage;
      }
    },
    methods: {
      tableRowClassName({row}) {
        if (row.status === 0) {
          return "disable-row";
        } 
        return "";
      },
      _currentChange(index) {
        this.currentInx = index;
        this.currentChange(index);
      },
      onClickItem(row) {
        row.tag = !row.tag;
        row.radio = row.status ? 
          row.tag ? require("~/assets/images/fullNode/choice.svg") : require("~/assets/images/fullNode/unchoice.svg") 
          : row.tag ? require("~/assets/images/fullNode/disable_choice.svg") : require("~/assets/images/fullNode/disable_unchoice.svg") ;
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
