<template>
  <div>
    <div class="vite-profile">
      <el-row :gutter="20" class="profile-row">
        <el-col :span="12">
          <div>{{ $t('profile.market') }}</div>
          <div>{{ generalDetail && Number(generalDetail.ffmCap) || noData }}</div>
        </el-col>
        <el-col :span="12">
          <div>{{ $t('profile.tps') }}</div>
          <div>{{ generalDetail && Number(generalDetail.sysTps) || noData }}</div>
        </el-col>
      </el-row>
      <el-row :gutter="20" class="profile-row">
        <el-col :span="12">
          <div>{{ $t('profile.price') }}</div>
          <div>{{ generalDetail && Number(generalDetail.cirPrice) || noData }}</div>
        </el-col>
        <el-col :span="12">
          <div>{{ $t('profile.totalTrans') }}</div>
          <div>{{ generalDetail && Number(generalDetail.txTotalTAmount) || noData }}</div>
        </el-col>
      </el-row>
      <el-row :gutter="20" class="profile-row">
        <el-col :span="12">
          <div>{{ $t('profile.latestHeight') }}</div>
          <div>{{ generalDetail && Number(generalDetail.chainHeight) || noData }}</div>
        </el-col>
        <el-col :span="12">
          <div>{{ $t('profile.nearMonth') }}</div>
          <div>{{ generalDetail && Number(generalDetail.txMonAmount) || noData }}</div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      generalDetail: {
        type: Object,
        default: {}
      }
    },
    data() {
      return {
        noData: "暂无数据"
      };
    }
  };
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "assets/css/vars.scss";

  .vite-profile {
    width: 100%;
    .profile-row {
      margin: 0 0 30px 0;
      padding: 20px;
    }
  }
</style>
