<!-- 概况 -->
<template>
  <div>
    <div>概况</div>
    <div class="vite-profile">
      <el-row :gutter="20" class="profile-row">
        <el-col :span="12">
          <div>Vite流通市值</div>
          <div>--</div>
        </el-col>
        <el-col :span="12">
          <div>系统TPS</div>
          <div>--</div>
        </el-col>
      </el-row>
      <el-row :gutter="20" class="profile-row">
        <el-col :span="12">
          <div>Vite流通价格</div>
          <div>--</div>
        </el-col>
        <el-col :span="12">
          <div>历史总交易量</div>
          <div>--</div>
        </el-col>
      </el-row>
      <el-row :gutter="20" class="profile-row">
        <el-col :span="12">
          <div>最新区块高度</div>
          <div>--</div>
        </el-col>
        <el-col :span="12">
          <div>近30天交易量</div>
          <div>--</div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>

  export default {
    components: {
    },
    props: {
      
    }
  };
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "assets/css/vars.scss";

  .vite-profile {
    margin-top: 10px;
    width: 100%;
    border: 1px solid $border-color;
    border-radius: 3px;
    .profile-row {
      margin: 0 0 30px 0;
      padding: 20px;
    }
  }
</style>
