<template>
  <div class="token-container">
    Token详情页
  </div>
</template>

<script>
  export default {
    validate ({ params }) {
      return params.id;
    },
    head() {
      return {
        title: "Token详情页"
      };
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
</style>
