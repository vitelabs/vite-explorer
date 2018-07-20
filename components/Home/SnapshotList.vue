<template>
  <div>
    <div class="head">
      <div>{{ $t('snapshotList.title') }}</div>
      <div class="more">
        <nuxt-link :to="localePath('blockList')" target="_blank">
          <img src="~assets/images/more.svg" />
        </nuxt-link>
      </div>
    </div>

    <div class="snapshot-list">
      <div class="snapshot-item" v-for="(item, index) in list" :key="index">
        <el-row :gutter="20">
          <el-col :span="12" class="snapshot-item-left">
            <div>
              {{ $t('snapshotList.height') }} 
              <nuxt-link :to="`${locales}/block/${item.hash}`" target="_blank">{{ item.height }}</nuxt-link>
            </div>
            <div>> {{ item.timestamp }} {{ $t('snapshotList.secAgo') }}</div>
          </el-col>
          <el-col :span="12">
            <div>{{ $t('snapshotList.node')}} {{ item.producer }}</div>
            <div>{{ $t('snapshotList.pack')}} {{ item.accountNum }} {{ $t('snapshotList.account') }}</div>
          </el-col>
        </el-row>
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

.snapshot-list {
  overflow: scroll;
  box-sizing: border-box;
  padding: 10px;
  .snapshot-item {
    line-height: 40px;
    border-bottom: 1px solid $border-color;
    box-sizing: border-box;
    padding: 10px;
    .snapshot-item-left {
      background: #f0f0f0;
    }
  }
}
</style>
