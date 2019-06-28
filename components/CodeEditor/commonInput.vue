<template>
  <div class="common-input-container">
    <div class="input-title">
      {{ name }}
      <img src="~/assets/images/code/plus.svg" @click="addInput" v-if="isMultiple"/>
    </div>
    <div class="wrapper">
      <el-input 
        size="small" 
        class="input-text" 
        v-model.trim="inputs[index]" 
        v-for="(item, index) in inputs" 
        :key="index"
        :disabled="disabled">
      </el-input>
    </div>
  </div>
</template>
<script>
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
    isMultiple: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      inputs: [""],
    };
  },
  mounted() {
  },
  methods: {
    addInput() {
      this.inputs.push("");
    },
    getInputs() {
      let inputs = this.inputs.filter(item=> {
        return !!item;
      });
      return inputs;
    }
  }
};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
@import "assets/css/vars.scss";
.input-title {
  display: flex;
  display: -webkit-flex;
  font-family:PingFangSC-Semibold;
  font-weight:600;
  color:rgba(94,104,117,1);
  line-height:20px;
  font-size: 14px;
  margin-bottom: 9px;
  img {
    margin-left: 6px;
    cursor: pointer;
  }
}
.input-text {
  margin-bottom: 8px;
  &:last-child {
    margin-bottom: 16px;
  }
}
</style>


