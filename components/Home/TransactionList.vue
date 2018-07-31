<template>
  <div>
    <div class="head">
      <div class="snapshot-title">
        <img src="~assets/images/transactions.svg" class="title-icon"/>
        {{ $t('transactionList.title') }}
      </div>
      <nuxt-link :to="localePath('transactionList')" target="_blank">
        <div class="more">
          <span class="iocn-more">{{ $t('utils.more') }}</span>
          <img src="~assets/images/more.svg" />
        </div>
      </nuxt-link>
    </div>
    
    <div class="transaction-list">
      <div class="transaction-item" v-for="(item, index) in list" :key="index">
        <div class="transaction-item-up">
          <div class="up">
            <img src="~assets/images/Hush.svg"/>
            <span>{{ $t('transactionList.hash') }}：</span>
            <nuxt-link :to="`${locales}/transaction/${item.hash}`" target="_blank" class="hash" :title="`${item.hash}`">{{ item.shortHash }}</nuxt-link>
          </div>
          <div>{{ item.amount }} {{ item.tokenName }}</div>
        </div>  
        <div class="transaction-item-down">
          <div class="down">
            <div class="label">{{ $t('transactionList.from') }}：</div>
            <nuxt-link :to="`${locales}/account/${item.from}`" target="_blank" class="label-width" v-if="item.fromHash" :title="`${item.from}`"> {{ item.shortFrom }}</nuxt-link>
            <nuxt-link :to="`${locales}/account/${item.accountAddress}`" target="_blank" class="label-width" v-else :title="`${item.accountAddress}`"> {{ item.shortAccountAddress }}</nuxt-link>
          </div>
          <div class="down">
            <div class="label">{{ $t('transactionList.to') }}：</div>
            <nuxt-link :to="`${locales}/account/${item.accountAddress}`" target="_blank" class="label-width" v-if="item.fromHash" :title="`${item.accountAddress}`"> {{ item.shortAccountAddress }}</nuxt-link>
            <nuxt-link :to="`${locales}/account/${item.to}`" target="_blank" class="label-width" v-else :title="`${item.to}`"> {{ item.shortTo }}</nuxt-link>
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
  font-size: 16px;
  color: $common-color;
  letter-spacing: 0.3px;
  line-height: 24px;
  display: flex;
  display: -webkit-flex;
  justify-content: space-between;
  border-bottom: 1px solid $border-color;
  .snapshot-title {
    margin-left: 36px;
    margin-top: 24px; 
    margin-bottom: 21px; 
    .title-icon {
      vertical-align: top;
      margin-right: 3px; 
    }    
  }
  .more {
    cursor: pointer;
     display: flex;
     display: -webkit-flex;
     padding-right: 33px;
     font-size: 14px;
     box-sizing: border-box;
     margin-top: 24px; 
     img {
       margin-left: 5px; 
     }
  }
  .iocn-more {
    font-weight: 400;
  }
}
.transaction-list::-webkit-scrollbar {
  display: none;
}
.transaction-list { -ms-overflow-style: none; }
.transaction-list { overflow: -moz-scrollbars-none; }

.transaction-list {
  overflow: scroll;
  height: 380px;
  box-sizing: border-box;
  font-size: 14px;
  color: #5E6875;
  letter-spacing: 0;
  .transaction-list::-webkit-scrollbar {
    width: 0 !important;
  }
  .transaction-item {
    min-height: 72px;
    border-bottom: 1px solid $border-color;
    box-sizing: border-box;
    padding: 14px 32px 12px 32px ;
    &:nth-child(even) {
      background: #F6F9FE;
    }
    &:last-child
    { 
      border-bottom: none;
    }
    .transaction-item-up {
      display: -webkit-flex;
      display: flex;
      justify-content: space-between;
      .up {
        display: -webkit-flex;
        display: flex;
        span {
          margin-left: 8px;
        }
        .hash {
          color: #0C0000;
          letter-spacing: 0;
          line-height: 20px;
          color: $common-color;
          width: 200px;
          text-overflow:ellipsis;
          white-space: nowrap;
          overflow-x: hidden;
        }
      }
    }
    .transaction-item-down {
      margin-left: 23px; 
      margin-top: 10px;
      display: -webkit-flex;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      font-size: 12px;
      letter-spacing: 0.26px;
      .down {
        display: -webkit-flex;
        display: flex;
      }
      .label-width {
        display: inline-block;
        width: 240px;
        overflow-x: hidden;
        color: $common-color;
        line-height: 16px;
        text-overflow:ellipsis;
        white-space: nowrap;
      }
    }
  }
}

/** iPhone **/
@media only screen and (min-width: 320px) and (max-width: 767px) {
  .transaction-list {
    .transaction-item {
      padding: 14px 20px 16px 20px ;
      .transaction-item-up {
        .up {
          .hash {
            width: 100px;
          }
        }
      }
      .transaction-item-down {
        margin-left: 22px; 
        margin-top: 10px;
        .down {
          .label {
            width: 37px;
          }
        }
        .label-width {
          width: 195px;
        }
      }
    }
  }

}

</style>
