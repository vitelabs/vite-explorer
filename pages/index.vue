<template>
  <div class="page-home">
    我是主页
  </div>
</template>

<script>
  export default {
    asyncData() {
      return {name: "world"};
    },
    data() {
      return {
        title: "hahha"
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
