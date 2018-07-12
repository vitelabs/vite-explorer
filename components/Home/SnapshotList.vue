<template>
  <div>
    <div>{{ $t('snapshotList.title') }}</div>
    <div class="more"><nuxt-link :to="localePath('blockList')">{{ $t('utils.more') }} ></nuxt-link></div>
    <div class="snapshot-list">
      <div class="snapshot-item" v-for="(item, index) in list" :key="index">
        <el-row :gutter="20">
          <el-col :span="12" class="snapshot-item-left">
            <div>
              {{ $t('snapshotList.height') }} 
              <nuxt-link :to="`${locales}/block/${item.hash}`">{{ item.height }}</nuxt-link>
            </div>
            <div>> {{ item.timestamp }} {{ $t('snapshotList.secAgo') }}</div>
          </el-col>
          <el-col :span="12">
            <div>{{ $t('snapshotList.node')}} {{ item.producer }}</div>
            <div>{{ $t('snapshotList.pack')}} {{ item.accountNum }} {{ $t('snapshotList.account') }} {{ $t('snapshotList.cost') }} -- {{ $t('snapshotList.sec') }}</div>
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

.more {
  float: right;
  margin-top: -20px;
  margin-right: 20px;
}

.snapshot-list {
  margin-top: 10px;
  width: 100%;
  border: 1px solid $border-color;
  border-radius: 3px;
  height: 600px;
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
