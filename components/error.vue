<template>
  <div class="detail-error-container">
    <div class="error-text">{{error}}</div>
    <el-button @click="reload" type="primary">{{$t('error.reload')}}</el-button>
  </div>
</template>

<script>
  export default {
    props: {
      error: {
        type: String,
        default: ""
      }
    },
    methods: {
      reload() {
        location.reload();
      }
    }
  };
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .detail-error-container {
    width: 100%;
    text-align: center;
  }
  .error-text {
    margin-top: 100px;
    color: #333;
    font-size: 30px;
    margin-bottom: 100px;
  }
</style>
