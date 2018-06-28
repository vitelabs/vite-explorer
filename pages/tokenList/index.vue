<template>
  <div class="token-list-container">
    <page-header :title="title"></page-header>
  </div>
</template>

<script>
  import pageHeader from "~/components/pageHeader.vue";

  export default {
    components: {
      pageHeader
    },
    data() {
      return {
        title: "Token列表"
      };
    },
    head() {
      return {
        title: this.title
      };
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
</style>
