<template>
  <div class="card-title">
    <div class="left">{{ leftName }}</div>
    <div class="right" v-if="hasControl">
      <div class="copy ml"><img src="~/assets/images/code/copy.svg"/></div>
      <div class="fullview ml"><img src="~/assets/images/code/large.svg"/></div>
    </div>
  </div>
</template>
<script>

export default {
  props: {
    hasControl: {
      type: Boolean,
      default: false
    },
    leftName: {
      type: String,
      default: ""
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
.card-title {
  display: flex;
  display: -webkit-flex;
  justify-content: space-between;
  .ml {
    margin-left: 8px;
  }
  .left {
    font-family:PingFangSC-Semibold;
    font-weight:600;
    color:rgba(94,104,117,1);
    line-height:20px;
    font-size: 14px;
  }
  .right {
    display: flex;
    display: -webkit-flex;
  }
}
</style>


