<template>
  <div class="account-container">
    <detail-layout 
        :title="`${title}: ${accountAddress}`"
        :list="list"
        :clickLab="clickLab">
    </detail-layout >
    <detail-layout 
        :title="`代币: ${tokenList[currentTokenInx]}`"
        :list="tokenDetailList">
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
      let tokenList = [1, 2, 3];
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
          list: tokenList
        }, {
          name: "所有代币估值",
          describe: "2830928023984014810481"
        }],
        tokenList
      };
    },
    data() {
      return {
        title: "账户详情",
        accountAddress: "",
        list: [],
        tokenList: [],

        currentTokenInx: 0,
        tokenDetailList: [{
          name: "余额数量",
          describe: "2830928023984014810481"
        }, {
          name: "余额价值",
          describe: 23820
        }, {
          name: "交易次数",
          describe: "2830928023984014810481"
        }]
      };
    },
    methods: {
      clickLab(lab, index) {
        this.currentTokenInx = index;
        // request
        this.tokenDetailList = [{
          name: "余额数量",
          describe: "2830928023984014810481"
        }, {
          name: "余额价值",
          describe: 23820
        }, {
          name: "交易次数",
          describe: "2830928023984014810481"
        }];
      }
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
