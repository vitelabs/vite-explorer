<template>
  <div class="download-node-detail">
    <div class="name">{{ $t('superNodeDetail.downloadDetail') }}：</div>
    <div class="date-picker-container">
      <el-date-picker
        v-model="dateRange"
        type="daterange"
        range-separator="--"
        :start-placeholder="$t('superNodeDetail.startDate')"
        :end-placeholder="$t('superNodeDetail.endDate')"
        size="small"
        :picker-options="pickerOptions"
        class="date-picker">
      </el-date-picker>
      <el-button type="primary" size="small" class="button" @click="sureFilter" :disabled="disabled">{{ $t('superNodeDetail.download') }}</el-button>
      <el-button size="small" class="button custom-button" @click="showCycleTime">{{ $t('superNodeDetail.cycleTime') }}</el-button>
    </div>
    <el-dialog :title="$t('superNodeDetail.cycleTime')" :visible.sync="dialogTableVisible">
      <page-table class="token-table" 
        :pagination="false"
        :loading="loading"
        :tableTitles="cycleTitles"
        :tableData="cycleList">
      </page-table>
    </el-dialog>
  </div>
</template>

<script>
import moment from "moment";
import pageTable from "~/components/pageTable";
import superNode from "~/services/superNode.js";

export default {
  props: {
    nodeName: {
      type: String,
      default: ""
    }
  },
  components: {
    pageTable
  },
  data() {
    return {
      cycleTitles: this.$t("superNodeDetail.cycleTitles"),
      dialogTableVisible: false,
      disabled: true,
      dateRange: [],
      loading: false,
      cycleList: [],
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < 1542859994000;
        },
        onPick: ({ maxDate, minDate}) => {
          if (maxDate) {
            let endDate = moment(maxDate)._d.getTime();
            let startDate = moment(minDate)._d.getTime();
            if(endDate - startDate > 30 * 24 * 60 * 60 * 1000) {
              this.disabled = true;
              this.$message(this.$t("superNodeDetail.alertMsg"));
            } else {
              this.disabled = false;
            }
          }
        }
      }
    };
  },
  mounted() {
    this.fetchCycleTime();
  },
  watch: {
    dateRange(val) {
      if(!val) {
        this.disabled = true;
      }
    }
  },
  methods: {
    fetchCycleTime() {
      superNode.getCycleTime().then(data=> {
        this.cycleList = data;
      }).catch(err => {
        console.log(err || "get cycle list fail");
      });
    },
    dateToCycle(date) {
      return (date/1000 -  1558411200)/75/1152;
    },
    sureFilter() {
      let endDate = moment(this.dateRange[1])._d.getTime();
      let startDate = moment(this.dateRange[0])._d.getTime();
      let startCycle = Math.ceil(this.dateToCycle(startDate));
      let endCycle = Math.ceil(this.dateToCycle(endDate));
      if(process.browser) {
        location.href = `http://119.28.225.124:8080/vote/node/excel?nodeName=${this.nodeName}&fromCycle=${startCycle}&toCycle=${endCycle}`;
      }
    },
    showCycleTime() {
      this.dialogTableVisible = true;
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "~assets/css/vars.scss";
  .download-node-detail {
    display: flex;
    display: -webkit-flex;
    margin-top: 16px;
    .name {
      font-size: 14px;
      width: 200px;
      color: #3F3F3F;
      line-height: 48px;
    }
    .tool-tip {
      vertical-align: text-top;
    }
    .date-picker-container {
      margin-top: 10px;
      .date-picker {
        width: 250px;
      }
    }
    .el-button--primary {
      background-color: $common-color;
      border-color: $common-color;
      &.is-disabled {
        background-color: $disabled-color;
        border-color:  $disabled-color;
      }
    }
    .custom-button {
      color: $common-color;
      border-color:  $common-color;
    }
    .button {
      margin-left: 8px; 
      vertical-align: top;
    }
  }
  

  /** iPhone **/
  @media only screen and (min-width: 320px) and (max-width: 767px) {
    .download-node-detail {
      flex-wrap: wrap;
      margin-top: 16px;
      .name {
        color: #3F3F3F;
        line-height: 32px;
      }
      .input-with-select {
        width: 273px;
        .el-select {
          width: 89px;
        }
      }
      .el-button--primary {
        background-color: $common-color;
        border-color: $common-color;
        &.is-disabled {
          background-color: $disabled-color;
          border-color:  $disabled-color;
        }
      }
      
      .button {
        margin-top: 10px;
        height: 31px;
        margin-left: 0px; 
        vertical-align: top;
      }
    }
  }
</style>
