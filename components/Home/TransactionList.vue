<template>
  <div>
    <div>{{ $t('transactionList.title') }}</div>
    <div class="more"><nuxt-link :to="localePath('transactionList')">{{ $t('utils.more') }} ></nuxt-link></div>
    <div class="transaction-list">
      <div class="transaction-item" v-for="(item, index) in list" :key="index">
        <el-row :gutter="20">
          <el-col :span="12">
            <div>{{ item.amount }} {{ item.tokenName }}</div>
          </el-col>
          <el-col :span="12">
            <div>{{ $t('transactionList.hash') }} 
              <nuxt-link :to="`${locales}/transaction/${item.hash}`">{{ item.hash }}</nuxt-link>
            </div>
          </el-col>
        </el-row>
        <div class="transaction-item-down">
          <div>
            {{ $t('transactionList.from') }}
            <nuxt-link :to="`${locales}/account/${item.from}`"> {{ item.from }}</nuxt-link>
          </div>
          <div>
            {{ $t('transactionList.to') }}
            <nuxt-link :to="`${locales}/account/${item.to}`"> {{ item.to }}</nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>
<script>
  export default {
    components: {
    },
    props: {
      list: {
        type: Array,
        default: []
      },
    },
    data() {
      return {
        locales: this.$i18n.locale === "en" ? "" : this.$i18n.locale
      };
    }
  };
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "assets/css/vars.scss";
.more {
  float: right;
  margin-top: -20px;
  margin-right: 20px;
}

.transaction-list {
  margin-top: 10px;
  width: 100%;
  border: 1px solid $border-color;
  border-radius: 3px;
  height: 600px;
  overflow: scroll;
  box-sizing: border-box;
  padding: 10px;
  .transaction-item {
    line-height: 40px;
    border-bottom: 1px solid $border-color;
    box-sizing: border-box;
    padding: 10px;
    .transaction-item-down {
      line-height: 20px;
    }
  }
}
</style>
