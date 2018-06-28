<template>
  <div class="account-container">
    <detail-layout 
        :title="`${title}: ${accountAddress}`"
        :list="list">
    </detail-layout >
  </div>
</template>

<script>  
  import detailLayout from "~/components/detailLayout";

  export default {
    components: {
      detailLayout
    },
    validate({ params }) {
      return params.addr;
    },
    asyncData({ params }) {
      return {
        accountAddress: params.addr || "",
        list: [{
          name: "账户Hash",
          describe: "2830928023984014810481"
        }, {
          name: "账户持有币种种类",
          describe: 23820
        }, {
          name: "账户持有代币",
          list: [1, 2, 2]
        }]

        // {
        //   name: "余额数量",
        //   describe: "283"
        // }, {
        //   name: "余额价值",
        //   describe: "2830928023984014810481"
        // }, {
        //   name: "交易次数",
        //   describe: "2830928023984014810481"
        // }, {
        //   name: "所有代币估值",
        //   describe: "2830928023984014810481"
        // }
      };
    },
    data() {
      return {
        title: "账户详情",
        accountAddress: "",
        list: []
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
