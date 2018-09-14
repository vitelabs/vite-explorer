<template>
  <div class="account-container">
    <div class="table-title">{{ tokenName }} {{ $t('tokenAccount.c1') }}</div>
    <div class="top-content">
      <el-select v-model="value" :placeholder="$t('tokenAccount.c2')" size="mini" style="width: 90px">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <div class="title">{{ tokenName }} {{ $t('tokenAccount.top') }} {{ value }} {{ $t('tokenAccount.c4') }}</div>
    </div>

    <div class="summary">
      <div>{{ $t('tokenAccount.top') }} {{ value }} {{ $t('tokenAccount.c5') }} {{ totalObj.percentPage }} {{ $t('tokenAccount.c7') }} {{ totalObj.haveSupplyPage }} {{ $t('tokenAccount.c6') }} {{ tokenName }}</div>
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

  export default {
    head() {
      return {
        title: this.$t("tokenAccount.title")
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
