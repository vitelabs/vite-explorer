<template>
  <div class="account-container">
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
    validate({ params }) {
      return params.id;
    },
    asyncData({ params }) {
      return {
        id: params.id || "",
        list: [{
          name: "交易Hash",
          describe: "2830928023984014810481"
        }, {
          name: "交易类型",
          list: [1,2,2]
        }, {
          name: "交易状态",
          describe: "283"
        }, {
          name: "确认数",
          describe: "2830928023984014810481"
        }, {
          name: "首次快照块",
          describe: "2830928023984014810481",
          link: "/block/830928023984014810481"
        }, {
          name: "时间戳",
          describe: "2830928023984014810481",
          link: "/block/830928023984014810481"
        }, {
          name: "转出方地址",
          describe: "2830928023984014810481",
          link: "account/2830928023984014810481"
        }, {
          name: "转入方地址",
          describe: "2830928023984014810481",
          link: "/account/2830928023984014810481"
        }, {
          name: "Token",
          describe: "Vite",
          link: "/token/Vite"
        }, {
          name: "数额",
          describe: "2830928023984014810481"
        }, {
          name: "附带文本资料",
          describe: "2830928023984014810481"
        }]
      };
    },
    data() {
      return {
        title: "交易详情",
        id: "",
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
