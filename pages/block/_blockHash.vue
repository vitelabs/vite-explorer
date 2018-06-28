<template>
  <div class="block-container">
    快照块详情页
  </div>
</template>

<script>
  export default {
    validate ({ params }) {
      return params.blockHash;
    },
    head() {
      return {
        title: "快照块详情页"
      };
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
</style>
