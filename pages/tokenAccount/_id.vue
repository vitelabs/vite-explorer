<template>
  <div class="account-container">
    <div class="table-title">{{ tokenName }} {{ $t('tokenAccount.c1') }}</div>
    <div class="top-content">
      <el-select v-model="value" :placeholder="$t('tokenAccount.c2')" size="mini" style="min-width: 90px; max-width: 100px">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <i18n path="tokenAccount.info" tag="div" class="title">
        <span place="tokenName">{{ tokenName }}</span>
        <span place="value">{{ value }}</span>
      </i18n>
    </div>

    <div class="summary">
      <i18n path="tokenAccount.info2" tag="div">
        <span place="tokenName">{{ tokenName }}</span>
        <span place="value">{{ value }}</span>
        <span place="percent">{{ totalObj.percentPage }}</span>
        <span place="totalNum">{{ totalObj.haveSupplyPage }}</span>
      </i18n>
      <div>{{ $t('tokenAccount.c8') }} {{ totalObj.totalSupply }}  |   {{ $t('tokenAccount.c0') }} {{ totalObj.totalNumber }}</div>
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
  import _ from "lodash";


  export default {
    head() {
      return {
        title: this.title
      };
    },
    components: {
      error, VePie, accountList
    },
    async asyncData(ctx) {
      return {
        tokenName: _.capitalize(ctx.query.tokenName),
        tokenId: ctx.params.id
      };
    },
    data() {
      return {
        title: this.$t("tokenAccount.title"),
        options: this.$t("tokenAccount.dropDownList"),
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
        this.accList = list.map(item => {
          return {
            name: item.accountAddress,
            value: item.balancePercent.substring(0, item.balancePercent.length -1)
          };
        });
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
