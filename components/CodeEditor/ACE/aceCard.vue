<template>
  <div class="ace-container">
    <code-title 
      :left-name="name" 
      :has-control="hasControl" 
      @copy="isCopyed"
      :copy-content="text"
      @showAll="isShowed">
    </code-title>
    <div class="wrapper">
      <copy-ok class="copy-wrapper" :copySuccess="copySuccess"></copy-ok>
      <pre class="code-editor" ref="ace"></pre>
    </div>
  </div>
</template>
<script>
import ace from "ace-builds";
import copyOk from "~/components/copyOk";
// import "ace-builds/webpack-resolver"; 
import "ace-builds/src-noconflict/theme-dawn";
import "ace-builds/src-noconflict/mode-csharp";
import beautify from "ace-builds/src-noconflict/ext-beautify";
import codeTitle from "~/components/codeTitle.vue";

export default {
  components: {
    codeTitle,
    copyOk
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
    },
    text: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      aceEditor: null,
      themePath: "ace/theme/dawn",
      modePath: "ace/mode/csharp",
      copySuccess: false,
      maxLines: 25
    };
  },
  mounted() {
    this.aceEditor = ace.edit(this.$refs.ace, {
      maxLines: this.maxLines,
      minLines: 10,
      fontSize: 12,
      theme: this.themePath,
      mode: this.modePath,
      ext: this.extPath,
      tabSize: 4,
      wrap: "free",
      readOnly: this.readOnly});
    this.aceEditor.setValue(this.text, -1);
  },
  watch: {
    text(val) {
      val && beautify.beautify(this.aceEditor.session);
      this.aceEditor.setValue(val, -1);
    }
  },
  methods: {
    isCopyed(val) {
      this.copySuccess = val;
    },
    isShowed(val) {
      if (val) {
        this.aceEditor.setOptions({
          maxLines: this.aceEditor.session.getLength()
        });
      } else {
        this.aceEditor.setOptions({
          maxLines: 25
        });
      }
    },
    getSourceCode() {
      let text = this.aceEditor.getValue();
      beautify.beautify(this.aceEditor.session);
      return text;
    }
  }
};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
@import "assets/css/vars.scss";

.code-editor {
  margin-top: 10px;
  margin-bottom: 16px;
  position: relative;
}
.ace-content {
  height: 400px!important;
}
.large {
  height: auto;
  min-height: 400px;
}
.wrapper {
  position: relative;
}
</style>


