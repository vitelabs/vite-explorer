<template>
  <div>
    <div>交易列表</div>
    <div class="transaction-list">
      <div class="transaction-item" v-for="(item, index) in list" :key="index">
        <el-row :gutter="20">
          <el-col :span="12">
            <div>1000 Vite</div>
          </el-col>
          <el-col :span="12">
            <div>交易Hash: 0x78912891289</div>
          </el-col>
        </el-row>
        <div class="transaction-item-down">
          <div>转出 0x8797988</div>
          <div>转入 0x8797988</div>
        </div>
      </div>
    </div>
  </div>
  
</template>
<script>

  export default {
    components: {
    },
    props: {
      
    },
    data() {
      return {
        list: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}]
      };
    }
  };
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "assets/css/vars.scss";

.transaction-list {
  margin-top: 10px;
  width: 100%;
  border: 1px solid $border-color;
  border-radius: 3px;
  height: 600px;
  overflow: scroll;
  box-sizing: border-box;
  padding: 10px;
  .transaction-item {
    line-height: 40px;
    border-bottom: 1px solid $border-color;
    box-sizing: border-box;
    padding: 10px;
    .transaction-item-down {
      line-height: 20px;
    }
  }
}
</style>