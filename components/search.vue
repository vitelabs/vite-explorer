<template>
  <div class="search-container">
    <el-input class="search-input" :placeholder="$t('search.placeholder')"></el-input>
    <el-button class="search-btn" type="primary">{{$t('search.btn')}}</el-button>
  </div>
</template>

<style rel="stylesheet/scss" lang="scss" scoped>
  .search-input {
    width: 60vw;
    height: 40px;
  }
  .search-btn {
    margin-left: 20px;
  }
</style>
