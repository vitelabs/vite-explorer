<template>
  <div>
    <div class="head">
      <div class="snapshot-title">
        <img src="~assets/images/transactions.svg" class="title-icon" :class="getAnimateIndex.length ? 'animated rotateIn': ''"/>
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
      <div class="transaction-item" :class="getAnimateIndex.indexOf(index) > -1 ? {animated: true, fadeIn: true}: ''" v-for="(item, index) in list" :key="index">
        <div class="transaction-item-up">
          <div class="up">
            <img src="~assets/images/Hush.svg"/>
            <span>{{ $t('transactionList.hash') }}：</span>
            <nuxt-link :to="`${locales}/transaction/${item.hash}`" target="_blank" class="hash" :title="`${item.hash}`">{{ item.shortHash }}</nuxt-link>
          </div>
          <div v-if="item.amount === '0'">{{ item.amount }} {{ item.tokenSymbol }}</div>
          <div v-if="item.fromHash && item.amount !== '0'" style="color: #5cb85c;">{{ item.amount }} {{ item.tokenSymbol }}</div>
          <div v-if="!item.fromHash && item.amount !== '0'" style="color: #e67e22;">-{{ item.amount }} {{ item.tokenSymbol }}</div>
        </div>  
        <div class="transaction-item-down">
          <div class="down">
            <div class="label">{{ $t('transactionList.from') }}：</div>
            <div class="label-width"><nuxt-link :to="`${locales}/account/${item.from}`" target="_blank"  class="min-width" :title="`${item.from}`"> {{ item.shortFrom }}</nuxt-link>
              <span class="contract-tag" v-if="item.fromAddressType === 1">{{ $t('contract.commonContract') }}</span>
            </div>
          </div>
          <div class="down">
            <div class="label">{{ $t('transactionList.to') }}：</div>
            <div class="label-width"><nuxt-link :to="`${locales}/account/${item.to}`" target="_blank"  class="min-width" :title="`${item.to}`"> {{ item.shortTo }}</nuxt-link>
              <span class="contract-tag" v-if="item.toAddressType === 1">{{ $t('contract.commonContract') }}</span>
            </div>
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
      preList: {
        type: Array,
        default: []
      }
    },
    computed: {
      getAnimateIndex() {
        let list = this.list.length ? this.list.map(item => item.hash) : [];
        let preList = this.preList.length ? this.preList.map(item => item.hash) : [];
        let difference = this.preList.length ? list.filter(item => preList.indexOf(item) === -1) : [];
        let diffIndex = [];
        for(let i = 0; i < difference.length; i++) {
          for(let j = 0; j < list.length; j++) {
            if (list[j] === difference[i]) {
              diffIndex.push(j);
            }
          }
        }
        return diffIndex;
      }
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
    margin-left: 32px;
    margin-top: 24px; 
    margin-bottom: 21px; 
    @include mobile {
       margin-left: 15px;
    }
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
     @include mobile {
       padding-right: 15px;
     }
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
        .min-width {
          display: inline-block;
          min-width: 120px;
        }
      }
    }
  }
}

/** iPhone **/
@include mobile{
  .transaction-list {
    .transaction-item {
      padding: 14px 15px 16px 15px ;
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
