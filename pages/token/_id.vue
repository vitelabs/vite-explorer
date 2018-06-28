<template>
  <div class="token-container">
    <detail-layout  
        :title="`${title}: ${id}`"
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
    validate ({ params }) {
      return params.id;
    },
    asyncData({ params }) {
      return {
        id: params.id || "",
        list: [{
          name: "流通额度",
          describe: "2830928023984014810481"
        }, {
          name: "所有者地址",
          describe: "2830928023984014810481",
          link: "/account/2830928023984014810481"
        }, {
          name: "价格",
          describe: "283"
        }, {
          name: "地址数量",
          describe: "2830928023984014810481"
        }, {
          name: "交易数据",
          describe: "2830928023984014810481"
        }]
      };
    },
    data() {
      return {
        title: "Token详情",
        blockHash: "",
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
