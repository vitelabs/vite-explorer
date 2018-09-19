<template>
  <div class="filter-address">
    <div class="name">{{ $t('filter.filterName') }}：</div>
    <el-input :placeholder="$t('filter.placeholder')" v-model="input" class="input-with-select" size="small" clearable>
      <el-select v-model="select" slot="prepend">
        <el-option :label="$t('filter.to')" value="in"></el-option>
        <el-option :label="$t('filter.from')" value="out"></el-option>
      </el-select>
    </el-input>
    <el-button type="primary" size="small" class="button" @click="sureFilter" :disabled="disabled">{{ $t('filter.sure') }}</el-button>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        input: "",
        select: "in",
        disabled: false
      };
    },
    methods: {
      sureFilter() {
        let accountAddrInput = {
          type: this.select,
          address: this.input
        };
        if (!this.input) {
          accountAddrInput = {
            type: null,
            address: null
          };
        }
        this.$emit("getAccountAddr", accountAddrInput);
      }
    }
  };
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "~assets/css/vars.scss";
  .filter-address {
    display: flex;
    display: -webkit-flex;
    margin-top: 16px;
    .name {
      font-size: 14px;
      display: inline-block;
      width: 200px;
      color: #3F3F3F;
      line-height: 32px;
    }
    .input-with-select {
      width: 280px;
      .el-select {
        width: 92px;
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
      margin-left: 8px; 
      vertical-align: top;
    }
  }
  

  /** iPhone **/
  @media only screen and (min-width: 320px) and (max-width: 767px) {
  }
</style>
