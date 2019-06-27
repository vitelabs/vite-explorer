<template>
  <div class="card-title">
    <div class="left">{{ leftName }}</div>
    <div class="right" v-if="hasControl">
      <div class="copy-container">
        <!-- <el-tooltip class="item" effect="dark" content="Top Left 提示文字" placement="top-start"> -->
          <img @click="copy" class="copy ml" src="~/assets/images/code/copy.svg"/>
        <!-- </el-tooltip> -->
      </div>
      <div class="fullview ml"><img src="~/assets/images/code/large.svg"/></div>
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
      type: Object,
      default: () => {}
    }
  },
  components: {
    copyOK
  },
  data() {
    return {
      // copySuccess: false
    };
  },
  mounted() {
  },
  methods: {
    copy() {
      copy(this.copyContent);
      this.$emit("copy", true);
      // this.copySuccess = true;
      setTimeout(() => {
        this.$emit("copy", false);
        // this.copySuccess = false;
      }, 2000);
    },
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


