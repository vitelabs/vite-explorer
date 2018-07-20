<template>
  <div>
    <div class="head">
      <div>{{ $t('transactionList.title') }}</div>
      <div class="more">
        <nuxt-link :to="localePath('transactionList')" target="_blank">
          <img src="~assets/images/more.svg" />
        </nuxt-link>
      </div>
    </div>
    
    <div class="transaction-list">
      <div class="transaction-item" v-for="(item, index) in list" :key="index">
        <div class="transaction-item-up">
          <div>{{ $t('transactionList.hash') }} 
            <nuxt-link :to="`${locales}/transaction/${item.hash}`" target="_blank">{{ item.hash }}</nuxt-link>
          </div>
          <div>{{ item.amount }} {{ item.tokenName }}</div>
        </div>  
        <div class="transaction-item-down">
          <div>
            <span>{{ $t('transactionList.to') }}:</span>
            <nuxt-link :to="`${locales}/account/${item.accountAddress}`" target="_blank" class="label-width" v-if="item.fromHash"> {{ item.accountAddress }}</nuxt-link>
            <nuxt-link :to="`${locales}/account/${item.to}`" target="_blank" class="label-width" v-else> {{ item.to }}</nuxt-link>
          </div>
          <div>
            <span>{{ $t('transactionList.from') }}:</span>
            <nuxt-link :to="`${locales}/account/${item.from}`" target="_blank" class="label-width" v-if="item.fromHash"> {{ item.from }}</nuxt-link>
            <nuxt-link :to="`${locales}/account/${item.accountAddress}`" target="_blank" class="label-width" v-else> {{ item.accountAddress }}</nuxt-link>
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
.head {
  font-family: PingFangSC-Semibold;
  font-size: 16px;
  color: #005CC7;
  letter-spacing: 0.3px;
  line-height: 24px;
  display: flex;
  display: -webkit-flex;
  justify-content: space-between;
  padding: 24px 33px 21px 36px;
  border-bottom: 1px solid $border-color;
}

.transaction-list {
  overflow: scroll;
  box-sizing: border-box;
  font-family: PingFangSC-Regular;
  font-size: 14px;
  color: #5E6875;
  letter-spacing: 0;
  .transaction-item {
    height: 72px;
    border-bottom: 1px solid $border-color;
    box-sizing: border-box;
    padding: 14px 32px 12px 54px ;
    &:last-child
    { 
      border-bottom: none;
    }
    .transaction-item-up {
      display: -webkit-flex;
      display: flex;
      justify-content: space-between;
    }
    .transaction-item-down {
      margin-top: 10px;
      display: -webkit-flex;
      display: flex;
      justify-content: space-between;
      font-family: PingFangSC-Regular;
      font-size: 12px;
      letter-spacing: 0.26px;
      span {
        display: inline-block;
        height: 16px;
        width: 33px;
      }
      .label-width {
        display: inline-block;
        width: 240px;
        overflow-x: hidden;
        color: #185BDD;
        line-height: 16px;
        text-overflow:ellipsis;
        white-space: nowrap;
      }
    }
  }
}
</style>
