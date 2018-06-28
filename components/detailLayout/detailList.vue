<template>
  <div class="deatail-list-container">
    <div class="row" v-for="(item, index) in list" :key="index">
      <span class="name">{{item.name}}</span>
      <span v-if="item.describe" class="describe">{{item.describe}}</span>
      <!-- <div v-if="item.list" class="describe">{{item.describe}}</div> -->
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      list: {
        type: Array,
        default: []
      }
    }
  };
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .deatail-list-container {
    width: 100%;
    padding-top: 20px;
  }
  .row {
    width: 100%;
    height: 40px;
    line-height: 40px;
    .name {
      display: inline-block;
      color: #333;
      width: 10vw;
    }
    .describe {
      color: #666;
    }
  }
</style>