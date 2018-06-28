<template>
  <div class="account-container">
    账户详情页
  </div>
</template>

<script>
  export default {
    validate ({ params }) {
      return params.id;
    },
    head() {
      return {
        title: "账户详情页"
      };
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
</style>
