<template>
  <div>
    <div>快照块列表</div>
    <div class="more"><nuxt-link :to="localePath('blockList')">更多 ></nuxt-link></div>
    <div class="snapshot-list">
      <div class="snapshot-item" v-for="(item, index) in list" :key="index">
        <el-row :gutter="20">
          <el-col :span="12" class="snapshot-item-left">
            <div>快照块高度：{{item.height}}</div>
            <div>> 14秒前</div>
          </el-col>
          <el-col :span="12">
            <div>出块节点：FirstNode</div>
            <div>打包329账户，耗时3秒</div>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
  
</template>
<script>

  export default {
    components: {
    },
    props: {
      list: {
        type: Array,
        default: []
      },
    },
    data() {
      return {
        
      };
    }
  };
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "assets/css/vars.scss";

.more {
  float: right;
  margin-top: -20px; 
  margin-right: 20px; 
}

.snapshot-list {
  margin-top: 10px;
  width: 100%;
  border: 1px solid $border-color;
  border-radius: 3px;
  height: 600px;
  overflow: scroll;
  box-sizing: border-box;
  padding: 10px;
  .snapshot-item {
    line-height: 40px;
    border-bottom: 1px solid $border-color;
    box-sizing: border-box;
    padding: 10px;
    .snapshot-item-left {
      background: #f0f0f0;
    }
  }
}
</style>