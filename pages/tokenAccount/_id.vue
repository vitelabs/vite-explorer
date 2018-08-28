<template>
  <div class="account-container">
    ffff
  </div>
</template>

<script>
  import error from "~/components/error";

  export default {
    head() {
      return {
        title: "aa"
      };
    },
    components: {
      error
    },
    // validate({ params }) {
    //   return params.id;
    // },
    // async asyncData({ params }) {
    //   try {
    //     let accountDetail = await account.getDetail({
    //       accountAddress: params.addr
    //     });
    //     let tokenList = accountDetail.tokenList || [];
    //     return {
    //       accountDetail,
    //       tokenList
    //     };
    //   } catch(err) {
    //     return {
    //       error: err.msg || "get account fail"
    //     };
    //   }
    // },
    data() {
      return {
      };
    },
    computed: {
    },
    methods: {
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>

</style>
