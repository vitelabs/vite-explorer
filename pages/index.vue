<template>
  <div class="page-home">
    <profile></profile>
  </div>
</template>

<script>
  import auth from "../services/index";
  import Profile from "~/components/Home/Profile.vue";

  export default {
    components: {
      Profile
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
