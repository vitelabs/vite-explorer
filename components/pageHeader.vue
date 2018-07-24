<template>
  <div class="table-title">{{title}}</div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ""
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .page-header-container {
    width: 100%;
    height: 60px;
    line-height: 60px;
    color: #333;
    font-weight: bold;
    border-bottom: 2px solid #3498db;
  }
</style>