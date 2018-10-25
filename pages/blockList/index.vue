<template>
  <div class="token-container">
    <block-list v-if="!error"></block-list>
    <error v-else :error="error"></error>
  </div>
</template>

<script>
  import blockList from "~/components/blockList";
  import error from "~/components/error";

  export default {
    head() {
      return {
        title: this.title
      };
    },
    components: {
      blockList, error
    },
    async asyncData() {
    
    },
    data() {
      return {
        pageIndex: 1,
        totalNumber: 0,
        blockList: [],
        loading: false,
        blockTitles: this.$t("blockTitles"),
        error: "",
        title: this.$t("head.blockList")
      };
    },
    methods: {
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
 
</style>
