<template>
  <div class="account-container">
    <div class="table-title">{{ tokenName }} 持有账户</div>
    <div class="top-content">
      <el-select v-model="value" placeholder="请选择" size="mini" style="width: 90px">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <div class="title">{{ tokenName }} 前 {{ value }} 名持有账户</div>
    </div>
    
    <div class="summary">
      <div>前 {{ value }} 名持有账户共持有 {{ totalObj.percentPage }} （共 {{ totalObj.haveSupplyPage }} 个）的 {{ tokenName }}</div>
      <div>总供给量：{{ totalObj.totalSupply }}  |   持有账户数量：{{ totalObj.totalNumber }}</div>
    </div>
    <ve-pie :list="accList"></ve-pie>
    <account-list 
      :table-titles="$t('accTitles')" 
      :page-size="value"
      :token-id="tokenId"
      @getTotal="getTotalData">
    </account-list>
  </div>
</template>

<script>
  import error from "~/components/error";
  import VePie from "~/components/Charts/Pie.vue";
  import accountList from "~/components/Token/accountList.vue";

  const orderOptions = [{
    value: 3,
    label: "前 3"
  }, {
    value: 5,
    label: "前 5"
  }, {
    value: 10,
    label: "前 10"
  }, {
    value: 50,
    label: "前 50"
  }, {
    value: 100,
    label: "前 100"
  }, {
    value: 250,
    label: "前 250"
  }, {
    value: 500,
    label: "前 500"
  }];

  export default {
    head() {
      return {
        title: "持有账户图表"
      };
    },
    components: {
      error, VePie, accountList
    },
    async asyncData(ctx) {
      return {
        tokenName: ctx.query.tokenName,
        tokenId: ctx.params.id
      };
    },
    data() {
      return {
        options: orderOptions,
        value: 100,
        totalObj: {},
        accList: []
      };
    },
    computed: {
    },
    methods: {
      getTotalData(val, list) {
        this.totalObj = val;
        this.accList = list;
      }
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
.account-container {
  .summary {
    background: #F8FAFE;
    border: 1px solid #E5EDF3;
    border-radius: 4px;
    height: 76px;
    box-sizing: border-box;
    margin-top: 20px;
    font-size: 13px;
    color: #8D9BAE;
    text-align: center;
    line-height: 22px;
    padding: 16px 0;
  }
  .top-content {
    margin-top: 16px; 
    .title {
      font-size: 24px;
      color: #5E6875;
      text-align: center;
      line-height: 32px;
      margin-top: -30px; 
    }
  }
}
</style>
