<template>
  <div class="key-value-map">
    <div class="item-wrapper">
      <div 
        class="item" 
        v-for="(item, index) in dataList" 
        :key="index">
        <div class="name">{{ item.name }}：</div>
        <div class="value">{{ item.value }}</div>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  props: {
    dataList: {
      type: Array,
      default: () => []
    }
  },
  components: {
  },
  data() {
    return {
    };
  },
  mounted() {
  },
  methods: {
  }
};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
@import "assets/css/vars.scss";
.key-value-map {
  padding: 32px 36px 0 36px;
  border-bottom: 1px solid #E5EDF3;
}
.item-wrapper {
  display: flex;
  display: -webkit-flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.item {
  display: flex;
  display: -webkit-flex;
  font-size:14px;
  font-family:PingFangSC-Regular;
  font-weight:400;
  line-height:22px;
  width: 362px;
  margin-bottom: 16px;
  .name {
    color:rgba(63,63,63,1);
  }
  .value {
    color:rgba(141,155,174,1);
  }
}
</style>


