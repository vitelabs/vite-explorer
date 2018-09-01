<template>
  <div class="filter-address">
    <div class="name">筛选：</div>
    <el-input placeholder="输入账户地址" v-model="input" class="input-with-select" size="small" clearable>
      <el-select v-model="select" slot="prepend">
        <el-option label="转入方" value="to"></el-option>
        <el-option label="转出方" value="from"></el-option>
      </el-select>
    </el-input>
    <el-button type="primary" size="small" class="button" @click="sureFilter">确定</el-button>
  </div>
</template>

<script>
  export default {
    props: {
    },
    computed: {
    },
    mounted() {
    },
    data() {
      return {
        input: "",
        select: "to"
      };
    },
    methods: {
      sureFilter() {

      }
    }
  };
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "~assets/css/vars.scss";
  .filter-address {
    display: flex;
    display: -webkit-flex;
    .name {
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
    }
    
    .button {
      margin-left: 8px; 
      margin-top: -1px; 
    }
  }
  

  /** iPhone **/
  @media only screen and (min-width: 320px) and (max-width: 767px) {
  }
</style>
