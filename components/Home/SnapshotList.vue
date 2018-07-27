<template>
  <div>
    <div class="head">
      <div class="snapshot-title">{{ $t('snapshotList.title') }}</div>
      <nuxt-link :to="localePath('blockList')" target="_blank">
        <div class="more">
          <span class="iocn-more">{{ $t('utils.more') }}</span>
          <img src="~assets/images/more.svg" />
        </div>
      </nuxt-link>
    </div>
    
    <div class="snapshot-list">
      <div class="snapshot-item" v-for="(item, index) in list" :key="index">
        <div class="snapshot-item-left">
          <div class="height">
            <span>{{ $t('snapshotList.height') }}:</span>
            <nuxt-link :to="`${locales}/block/${item.hash}`" target="_blank" class="height-value">{{ item.height }}</nuxt-link>
          </div>
          <div class="timestamp">> {{ ageFilter.call(this, item.age) }}</div>
        </div>
        <div class="snapshot-item-right">
          <div class="producer">
            <span class="producer-text">{{ $t('snapshotList.node')}}：</span> 
            <span class="producer-value" :title="`${item.producer }`">{{ item.shortProducer }}</span>
          </div>
          <div class="pack">{{ $t('snapshotList.pack')}} {{ item.accountNum }} {{ $t('snapshotList.account') }}</div>
        </div>
      </div>
    </div>
  </div>

</template>
<script>
  import moment from "moment";

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
        locales: this.$i18n.locale === "en" ? "" : this.$i18n.locale,
      };
    },
    methods: {
      ageFilter(age) {
        moment.locale(this.$i18n.locale === "zh" ? "zh-cn" : this.$i18n.locale);
        return moment(age * 1000).fromNow();
      }
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
  }
  .more {
    cursor: pointer;
     display: flex;
     display: -webkit-flex;
     padding-right: 33px;
     font-size: 14px;
     box-sizing: border-box;
     margin-top: 24px; 
  }
  .iocn-more {
    font-weight: 400;
  }
  img {
    margin-left: 5px; 
  }
}

.snapshot-list {
  overflow: scroll;
  height: 382px;
  box-sizing: border-box;
  font-size: 14px;
  color: #5E6875;
  letter-spacing: 0;
  .snapshot-item {
    min-height: 72px;
    border-bottom: 1px solid $border-color;
    box-sizing: border-box;
    padding: 8px 10px 7px 32px ;
    display: flex;
    display: -webkit-flex;
    &:last-child
    { 
      border-bottom: none;
    }
    .snapshot-item-left {
      width: 177px;
      min-height: 58px;
      background: rgba(88,145,255,0.13);
      box-shadow: 0 6px 36px 0 rgba(0,62,100,0.04);
      border-radius: 2px;
      display: flex;
      display: -webkit-flex;
      justify-content: space-between;
      box-sizing: border-box;
      padding: 6px 6px 6px 16px;
      .timestamp {
        margin-top: 25px;
        font-size: 12px;
        color: #5E6875;
        letter-spacing: 0;
        text-align: right;
        line-height: 16px;
      }
      
      .height {
        width: 64px;
        height: 45px;
        span {
          font-size: 12px;
          color: #8D9BAE;
          letter-spacing: 0;
        }
        .height-value {
          font-weight: 450;
          display: inline-block;
          font-size: 20px;
          color: $common-color;
          letter-spacing: 0;
          line-height: 25px;
        }
      }
    }
    .snapshot-item-right {
      letter-spacing: 0.35px;
      color: #5E6875;
      margin-left: 32px;
      font-size: 13px;
      .producer {
        margin-top: 8px;
        line-height: 20px;
        .producer-text {

        }
        .producer-value {
          display: inline-block;
          width: 110px;
          vertical-align: middle;
        }
      }
      .pack {
        margin-top: 3px; 
        font-weight: 450;
      }
    }
  }
}
</style>
