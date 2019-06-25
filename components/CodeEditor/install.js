import codeEditor from "./index.vue";

export default {
  install: function (Vue) {
    Vue.component("codeEditor", codeEditor);
  }
};