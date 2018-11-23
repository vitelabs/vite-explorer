<template>
  <div class="download-node-detail">
    <div class="name">{{ $t('superNodeDetail.downloadDetail') }}：</div>
    <div class="date-picker">
      <el-date-picker
        v-model="dateRange"
        type="daterange"
        range-separator="--"
        :start-placeholder="$t('superNodeDetail.startDate')"
        :end-placeholder="$t('superNodeDetail.endDate')"
        size="small"
        :picker-options="pickerOptions"
        >
      </el-date-picker>
      <el-button type="primary" size="small" class="button" @click="sureFilter" :disabled="disabled">{{ $t('filter.sure') }}</el-button>
    </div>
    
  </div>
</template>

<script>
import moment from "moment";
export default {
  props: {
    nodeName: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      disabled: true,
      dateRange: [],
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
              this.$message("不能超过30天");
            } else {
              this.disabled = false;
            }
          }
        }
      }
    };
  },
  watch: {
    dateRange(val) {
      if(!val) {
        this.disabled = true;
      }
    }
  },
  methods: {
    dateToCycle(date) {
      return (date/1000 -  1541650394)/75/1152;
    },
    sureFilter() {
      let endDate = moment(this.dateRange[1])._d.getTime();
      let startDate = moment(this.dateRange[0])._d.getTime();
      let startCycle = Math.ceil(this.dateToCycle(startDate));
      let endCycle = Math.ceil(this.dateToCycle(endDate));
      if(process.browser) {
        location.href = `http://148.70.107.158:8084/test/vote/node/excel?nodeName=${this.nodeName}&fromCycle=${startCycle}&toCycle=${endCycle}`;
      }
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "~assets/css/vars.scss";
  .download-node-detail {
    margin-top: 16px;
    .name {
      font-size: 14px;
      width: 200px;
      color: #3F3F3F;
      line-height: 32px;
    }
    .tool-tip {
      vertical-align: text-top;
    }
    .date-picker {
      margin-top: 10px;
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
      margin-left: 8px; 
      vertical-align: top;
    }
  }
  

  /** iPhone **/
  @media only screen and (min-width: 320px) and (max-width: 767px) {
    .filter-address {
      margin-top: 16px;
      .name {
        display: inline-block;
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
        height: 31px;
        margin-left: 0px; 
        vertical-align: top;
      }
    }
  }
</style>
