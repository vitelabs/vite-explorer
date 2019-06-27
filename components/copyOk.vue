<template>
    <span class="copy-success" :class="{'show': copySuccess||CopySuccess}">复制成功</span>
</template>

<script>
export default {
  props: {
    copySuccess: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return { CopySuccess: false };
  },
  methods: {
    copyOk() {
      this.CopySuccess = true;
      setTimeout(() => {
        this.CopySuccess = false;
      }, 1000);
    }

  }
};
</script>

<style lang="scss" scoped>
@import "~assets/css/vars.scss";

.copy-success {
    transition: all 0.3s ease-in-out;
    position: absolute;
    top: -30px;
    left: 50%;
    transform: translateX(-50%);
    background: #5b638d;
    box-sizing: border-box;
    border-radius: 6px;
    font-size: 12px;
    line-height: 12px;
    color: #fff;
    opacity: 0;
    height: 0;
    width: auto;
    font-family: $font-family-main;

    &.show {
        opacity: 1;
        padding: 0 6px;
        width: auto;
        height: 24px;
        line-height: 24px;

        &::after {
            content: ' ';
            display: inline-block;
            border: 6px solid transparent;
            border-top: 6px solid #5b638d;
            position: absolute;
            bottom: -12px;
            left: 50%;
            margin-left: -6px;
        }
    }
}
</style>
