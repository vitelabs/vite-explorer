<template>
  <div class="card-title">
    <div class="left">{{ leftName }}</div>
    <div class="right" v-if="hasControl">
      <div class="copy-container">
        <img @click="copy" class="copy ml" src="~/assets/images/code/copy.svg"/>
      </div>
      <div class="fullview ml">
        <img @click="clickFullscreen" :src="largeBoolean ? require('~/assets/images/code/small.svg') : require('~/assets/images/code/large.svg')"/>
      </div>
    </div>
    
  </div>
</template>
<script>
import copy from "~/utils/copy";
import copyOK from "~/components/copyOK";

export default {
  props: {
    hasControl: {
      type: Boolean,
      default: false
    },
    leftName: {
      type: String,
      default: ""
    },
    copyContent: {
      type: String,
      default: ""
    }
  },
  components: {
    copyOK
  },
  data() {
    return {
      largeBoolean: false
    };
  },
  mounted() {
  },
  methods: {
    copy() {
      copy(this.copyContent);
      this.$emit("copy", true);
      setTimeout(() => {
        this.$emit("copy", false);
      }, 2000);
    },
    clickFullscreen() {
      this.largeBoolean = !this.largeBoolean;
      this.$emit("showAll", this.largeBoolean);
    }
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
    cursor: pointer;
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


