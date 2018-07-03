<template>
  <div class="page-home">
    <el-row :gutter="30">
      <el-col :span="12"><profile></profile></el-col>
      <el-col :span="12"><line-chart></line-chart></el-col>
    </el-row>
    
  </div>
</template>

<script>
  import auth from "../services/index";
  import Profile from "~/components/Home/Profile.vue";
  import LineChart from "~/components/Home/LineChart.vue";

  export default {
    components: {
      Profile,
      LineChart
    },
    async asyncData() {
      let data = await auth.getUser();

      return {name: data[0].name};
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
