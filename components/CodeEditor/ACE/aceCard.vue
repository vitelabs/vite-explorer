<template>
  <div class="ace-container">
    <code-title :left-name="name" :has-control="hasControl"></code-title>
    <pre class="code-editor" ref="ace"></pre>
  </div>
</template>
<script>
import ace from "ace-builds";
// import "ace-builds/webpack-resolver"; 
import "ace-builds/src-noconflict/theme-dawn";
import "ace-builds/src-noconflict/mode-csharp";
import codeTitle from "~/components/codeTitle.vue";

export default {
  components: {
    codeTitle
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
    readOnly: {
      type: Boolean,
      default: false
    }
  },
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
      wrap: "free",
      readOnly: this.readOnly});
  },
  methods: {

  }
};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
@import "assets/css/vars.scss";

.code-editor {
  margin-top: 10px;
  margin-bottom: 16px;
  position: relative;
  height: 300px;
}
</style>


