<template>
  <div class="ace-container">
    <div class="ace-editor" ref="ace"></div>
  </div>
</template>
<script>

import ace from "ace-builds";
import "ace-builds/webpack-resolver"; 
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/mode-javascript";

export default {
  data() {
    return {
      aceEditor: null,
      themePath: "ace/theme/monokai",
      modePath: "ace/mode/javascript"
    };
  },
  mounted() {
    this.aceEditor = ace.edit(this.$refs.ace, {
      maxLines: 20,
      minLines: 10,
      fontSize: 14,
      theme: this.themePath,
      mode: this.modePath,
      tabSize: 4});
    
  },
  methods: {

  }
};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
@import "assets/css/vars.scss";

.ace-container {
  position: relative;
}
</style>


