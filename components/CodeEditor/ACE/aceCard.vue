<template>
  <div class="ace-container">
    <pre class="code-editor" ref="ace"></pre>
  </div>
</template>
<script>
import ace from "ace-builds";
// import "ace-builds/webpack-resolver"; 
import "ace-builds/src-noconflict/theme-dawn";
import "ace-builds/src-noconflict/mode-csharp";

export default {
  data() {
    return {
      aceEditor: null,
      themePath: "ace/theme/dawn",
      modePath: "ace/mode/csharp"
    };
  },
  mounted() {
    this.aceEditor = ace.edit(this.$refs.ace, {
      maxLines: 20,
      minLines: 10,
      fontSize: 12,
      theme: this.themePath,
      mode: this.modePath,
      tabSize: 4,
      wrap: "free"});
  },
  methods: {

  }
};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
@import "assets/css/vars.scss";

.code-editor {
  margin-top: 5px;
  position: relative;
  height: 300px;
}
</style>


