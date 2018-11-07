<template>
  <div class="filter">
    <div class="name">{{ $t('filter.filterName') }}：</div>
    <el-input :placeholder="$t('filter.SBP.placeholder')" v-model="input" class="input-with-select" size="small" clearable>
    </el-input>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        input: "",
        disabled: false,
        timer: null
      };
    },
    watch: {
      input() {
        this.sureFilter();
      }
    },
    methods: {
      sureFilter() {
        this.timer && clearTimeout(this.timer);
        this.timer = setTimeout(()=> {
          this.$emit("getInput", this.input);
        }, 500);
      }
    }
  };
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "~assets/css/vars.scss";
  .filter {
    display: flex;
    display: -webkit-flex;
    margin-top: 20px;
    .name {
      font-size: 14px;
      display: inline-block;
      width: 60px;
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
