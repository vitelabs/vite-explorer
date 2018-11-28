<template>
  <div class="page-table-container">
    <div class="table-title" v-html="title" v-if="title"></div>
    <div class="sub-table-title" v-html="subTitle" v-if="subTitle"></div>
    <div class="sub-table-title common-title" v-html="subCommonTitle" v-if="subCommonTitle"></div>
    <div class="">
      <slot name="filter"></slot>
    </div>
    <div class="table">
      <el-table 
        v-loading="loading" 
        :stripe="!isSbpPage"
        :data="tableData" 
        style="width: 100%" 
        @sort-change="sortChange"
        :default-sort="defaultSort"
        :empty-text="noResult"
        :row-class-name="tableRowClassName">
        <el-table-column v-if="showOrder" 
          type="index" 
          :index="indexMethod" 
          :label="$t('pageTable.num')">
        </el-table-column>
        <el-table-column v-for="(tT, index) in tableTitles" 
          :key="index"
          :prop="tT.prop"
          :label="tT.name" :width="tT.width || ''" 
          :show-overflow-tooltip="true"
          :sortable="sortItems.indexOf(tT.prop) > -1 ? 'custom' : feSort"
          :render-header="renderHeader">
          <template slot-scope="scope">
              <div v-html="scope.row[tT.prop] || '--'" v-if="scope.row[tT.prop] !== 0"></div>
              <div v-else>0</div>
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

  let emitFilterObj = {};
  let emitSortObj = {};

  export default {
    name: "pageTable",
    props: {
      loading: {
        type: Boolean,
        default: false
      },
      isSbpPage: {
        type: Boolean,
        default: false
      },
      sortItems: {
        type: Array,
        default: () => []
      },
      defaultSort: {
        type: Object,
        default: () => {}
      },
      needFilter: {
        type: Boolean,
        default: false
      },
      title: {
        type: String,
        default: ""
      },
      subTitle: {
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
      showOrder: {
        type: Boolean,
        default: false
      },
      currentChange: {
        type: Function,
        default: ()=>{}
      },
      currentPage: {
        type: Number,
        default: 1
      },
      subCommonTitle: {
        type: String,
        default: ""
      },
      feSort: {
        type: Boolean,
        default: false
      }
    },
    // serverCacheKey: props => props.currentPage,
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
        if (this.isSbpPage) {
          if (row.status === "Active") {
            return "success-row";
          } 
        }
        return "";
      },
      sortChange({prop, order}) {
        if (order === "ascending") {
          order = "asc";
        }
        if (order === "descending") {
          order = "desc";
        }
        emitSortObj.sort = prop;
        emitSortObj.order = order;
        this.$emit("sortFilter", emitSortObj);
      },
      indexMethod(index) {
        return index + 1 + (this.currentInx - 1) * this.pageSize;
      },
      _currentChange(index) {
        this.currentInx = index;
        this.currentChange(index);
      },
      linkTo(url) {
        location.href=url;
      },
      commandHandler(str, val) {
        emitFilterObj[str] = val;
        this.$emit("selectFilter", emitFilterObj);
      },
      renderHeader(h, { column, $index }) {
        if (this.needFilter) {
          let tableTitles = this.tableTitles;
          if (tableTitles[$index].prop === "blockType" || tableTitles[$index].prop === "status") {
            return (
              <el-dropdown trigger="click" class="table-dropdown" onCommand={this.commandHandler.bind(this, tableTitles[$index].prop)}>
                <span>{column.label}<span class="icon"></span></span>
                <el-dropdown-menu slot="dropdown">
                  {this.$t("filterObj")[tableTitles[$index].prop].map((item)=> {
                    return <el-dropdown-item command={item.value}>{item.label}</el-dropdown-item>;
                  })}
                </el-dropdown-menu>
              </el-dropdown>
            );
          }
        }
        return column.label;
        
      },
    }
  };
</script>

<style rel="stylesheet/scss" lang="scss">
.page-table-container {
  .el-table .success-row {
    background: rgba(24,91,221,0.08);
  }
  .table-dropdown {
    color: #5E6875;
    margin: 0;
    padding: 0;
    height: 23px;
    line-height: 30px;
  }
  .el-dropdown .icon {
    display: inline-block;
    width: 12px;
    height: 12px;
    margin-left: 8.5px; 
    background-image: url("~assets/images/filter_default.svg");
    &:hover {
      background-image: url("~assets/images/filter_active.svg");
      cursor: pointer;
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
  }
  .sub-table-title {
    font-size: 12px;
    color: #5E6875;
    letter-spacing: 0;
    line-height: 16px;
    padding: 20px 0 0 30px;
    clear: both;
  }
  .common-title {
    padding: 0;
    margin-top: 8px; 
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
