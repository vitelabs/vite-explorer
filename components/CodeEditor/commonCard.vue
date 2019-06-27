<template>
  <div class="common-code-container">
    <code-title :left-name="name" :has-control="hasControl" @copy="isCopyed"></code-title>
    <div class="wrapper">
      <copyOK class="copy-wrapper" :copySuccess="copySuccess"></copyOK>
      <pre class="wordwrap content">
DUP4
MSTORE
SWAP8
SWAP11
SWAP10
SWAP9
DUP2
ADD
SWAP8
SWAP2
SWAP7
POP
SWAP2
DUP3
ADD
SWAP5
POP
SWAP3
POP
DUP3
SWAP2
NOT
AND
DUP2
MSTORE
PUSH1 0x20
ADD
SWAP2
POP
JUMPDEST
POP
SWAP3
POP
POP
POP
PUSH1 0x40
MLOAD
DUP1
SWAP2
SUB
SWAP1
RETURN
JUMPDEST
PUSH1 0x40
DUP1
MLOAD
      </pre>
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


