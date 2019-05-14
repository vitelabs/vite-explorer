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
              <div v-html="scope.row[tT.prop] || '--'" v-if="scope.row[tT.prop] !== 0"></div>
              <div v-else>0</div>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div v-if="pagination" v-show="total" class="pagination">
      <!-- <el-pagination layout="prev, pager, next"
        :background="true" @current-change="_currentChange"
        :page-size="pageSize" :current-page="currentInx"
        :total="total">
      </el-pagination> -->
      <pagination 
        :currentPage="currentInx"
        :totalPage="Math.ceil(total/pageSize)" 
        :toPage="_currentChange">
      </pagination>
    </div>
  </div>
</template>

<script type="text/babel">
  import pagination from "~/components/pagination";

  export default {
    name: "pageTable",
    components: {
      pagination
    },
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
        if (row.pureStatus === "Producing") {
          return "success-row";
        } 
        return "";
      },
      _currentChange(index) {
        this.currentInx = index;
        this.currentChange(index);
      },
      linkTo(url) {
        location.href=url;
      },
    }
  };
</script>

<style rel="stylesheet/scss" lang="scss">
.page-table-container {
  .el-table .success-row {
    background: #5cb85c;
    color: white;
    &:hover>td {
      background: #5cb85c;
    }
    a {
      color: white;
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
