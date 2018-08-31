<template>
  <div class="page-table-container">
    <div class="table-title" v-html="title" v-if="title"></div>
    <div class="sub-table-title" v-html="subTitle" v-if="subTitle"></div>
    <div class="sub-table-title common-title" v-html="subCommonTitle" v-if="subCommonTitle"></div>
    <div class="table">
      <el-table v-loading="loading" stripe :data="tableData" style="width: 100%">
        <el-table-column v-if="showOrder" type="index" :index="indexMethod" :label="$t('pageTable.num')"></el-table-column>
        <el-table-column v-for="(tT, index) in tableTitles" :key="index"
          :label="tT.name" :width="tT.width || ''" :show-overflow-tooltip="true">
          <template slot-scope="scope">
            <span v-html="scope.row[tT.prop]  || '--'"></span>
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

<script>
  export default {
    name: "pageTable",
    props: {
      loading: {
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
      }
    },
    // serverCacheKey: props => props.currentPage,
    data() {
      return {
        currentInx: this.currentPage,
      };
    },
    watch: {
      currentPage() {
        this.currentInx = this.currentPage;
      }
    },
    methods: {
      indexMethod(index) {
        return index + 1 + (this.currentInx - 1) * this.pageSize;
      },
      _currentChange(index) {
        this.currentInx = index;
        this.currentChange(index);
      },
      linkTo(url) {
        location.href=url;
      }
    }
  };
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
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
</style>
