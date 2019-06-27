<template>
  <div class="common-code-container">
    <code-title 
      :left-name="name" 
      :has-control="hasControl" 
      @copy="isCopyed"
      :copy-content="text">
    </code-title>
    <div class="wrapper">
      <copyOK class="copy-wrapper" :copySuccess="copySuccess"></copyOK>
      <pre class="wordwrap content">{{ text }}</pre>
    </div>
  </div>
</template>
<script>
import codeTitle from "~/components/codeTitle.vue";
import copyOK from "~/components/copyOK";

export default {
  components: {
    codeTitle,
    copyOK
  },
  props: {
    name: {
      type: String,
      default: ""
    },
    hasControl: {
      type: Boolean,
      default: false
    },
    text: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      copySuccess: false
    };
  },
  mounted() {
  },
  methods: {
    isCopyed(val) {
      this.copySuccess = val;
    }
  }
};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
@import "assets/css/vars.scss";
.wrapper {
  position: relative;
}

.content {
  height: 200px;
  max-height: 400px;
  margin-top: 10px;
  margin-bottom: 16px;
}
</style>


