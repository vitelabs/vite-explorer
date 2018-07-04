<template>
  <div class="page-home">
    <el-row :gutter="50">
      <el-col :span="12"><profile></profile></el-col>
      <el-col :span="12"><line-chart></line-chart></el-col>
    </el-row>
    <el-row :gutter="50">
      <el-col :span="12"><snapshot-list></snapshot-list></el-col>
      <el-col :span="12"><transaction-list></transaction-list></el-col>
    </el-row>
  </div>
</template>

<script>
  import Profile from "~/components/Home/Profile.vue";
  import LineChart from "~/components/Home/LineChart.vue";
  import SnapshotList from "~/components/Home/SnapshotList.vue";
  import TransactionList from "~/components/Home/TransactionList.vue";
  
  export default {
    components: {
      Profile,
      LineChart,
      SnapshotList,
      TransactionList
    },
    async asyncData() {

    },
    data() {
      return {
        name: this.name
      };
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  .page-home {
    // margin-top: 100px;
  }
</style>
