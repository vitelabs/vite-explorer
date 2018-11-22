<template>
  <div class="download-node-detail">
    <div class="name">{{ $t('superNodeDetail.downloadDetail') }}：
      <el-tooltip :content="$t('superNodeDetail.downloadTips')" placement="right" effect="light">
        <img src="~assets/images/tips.svg" class="tool-tip"/>
      </el-tooltip>
    </div>
    <div class="date-picker">
      <el-date-picker
        v-model="value6"
        type="daterange"
        range-separator="--"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        size="small"
        >
      </el-date-picker>
      <el-button type="primary" size="small" class="button" @click="sureFilter" :disabled="disabled">{{ $t('filter.sure') }}</el-button>
    </div>
    
  </div>
</template>

<script>
  export default {
    data() {
      return {
        disabled: false,
        value6: ""
      };
    },
    methods: {
      sureFilter() {
        // let accountAddrInput = {
        //   type: this.select,
        //   address: this.input
        // };
        // if (!this.input) {
        //   accountAddrInput = {
        //     type: null,
        //     address: null
        //   };
        // }
        // this.$emit("getAccountAddr", accountAddrInput);
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
