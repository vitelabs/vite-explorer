<template>
  <div class="token-list-container">
    <div v-if="!error">
      <div v-for="(item, index) in array" :key="index">
        <p>{{ item }}</p>
      </div>
    </div>
    <error v-else :error="error"></error>
  </div>
</template>

<script>
  import error from "~/components/error";
  import fullNode from "./fullNode.js";

  export default {
    head() {
      return {
        title: this.title,
      };
    },
    components: {
      error
    },
    async asyncData() {
      
    },
    mounted() {
      let client = new fullNode();
      client.connect();

      this.array = client.array;
    },
    data() {
      return {
        title: this.$t("fullNode.title"),
        error: "",
        array: []
      };
    },
    computed: {
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>

</style>
