<template>
  <div class="page-home">
    <el-row>
      <el-col :span="24">
        <el-button>{{name}} 我是主页 {{ $t('lang') }}</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import auth from "../services/index";

  export default {
    async asyncData() {
      let data = await auth.getUser();

      return {name: data[0].name};
    },
    data() {
      return {
        name: this.name
      };
    },
    head() {
      return {
        title: this.title,
      };
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  .page-home {
    // margin-top: 100px;
  }
</style>
