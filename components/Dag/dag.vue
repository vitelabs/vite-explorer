<template>
  <div class="dag-container">
    <div class="header">
      <img src="~assets/images/dag.svg"/>
      <span>DAG 图</span>
    </div>
    <div class="content">
      <div id="main" style="width: 600px;height:400px;"></div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
    },
    methods: {
    }
  };
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "assets/css/vars.scss";

  .dag-container {
    height: 500px;
    background: #FFFFFF;
    border: 1px solid #E5EDF3;
    box-shadow: 0 6px 36px 0 rgba(0,62,100,0.04);
    border-radius: 4px 4px 0 0;
    .header {
      box-sizing: border-box;
      border-bottom: 1px solid #E5EDF3;
      height: 70px;
      padding: 0 0 0 34px;
      line-height: 70px;
      font-weight: 500;
      font-size: 16px;
      color: $common-color;
      letter-spacing: 0.3px;
      img {
        vertical-align: middle;
        margin-right: 8px; 
      }
    }
  }
</style>
