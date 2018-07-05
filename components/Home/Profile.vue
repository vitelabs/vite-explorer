<template>
  <div>
    <div>{{$t('profile.title')}}</div>
    <div class="vite-profile">
      <el-row :gutter="20" class="profile-row">
        <el-col :span="12">
          <div>{{$t('profile.market')}}</div>
          <div>--</div>
        </el-col>
        <el-col :span="12">
          <div>{{$t('profile.tps')}}</div>
          <div>--</div>
        </el-col>
      </el-row>
      <el-row :gutter="20" class="profile-row">
        <el-col :span="12">
          <div>{{$t('profile.price')}}</div>
          <div>--</div>
        </el-col>
        <el-col :span="12">
          <div>{{$t('profile.totalTrans')}}</div>
          <div>--</div>
        </el-col>
      </el-row>
      <el-row :gutter="20" class="profile-row">
        <el-col :span="12">
          <div>{{$t('profile.latestHeight')}}</div>
          <div>--</div>
        </el-col>
        <el-col :span="12">
          <div>{{$t('profile.nearMonth')}}</div>
          <div>--</div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {

      }
    },
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
