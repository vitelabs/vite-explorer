<template>
  <div class="write-code">
    <div class="code-verify">
      <img src="~/assets/images/code/unverified.svg"/>
      <div class="code-verify-text">{{ $t('contract.unverified') }}</div>
    </div>
    <div class="contract-card">
      <common-input
        :name="$t('contract.name')">
      </common-input>
      <common-input
        ref="commonInput"
        :name="$t('contract.params')"
        :is-multiple="true">
      </common-input>
      <common-input
        :name="$t('contract.version')">
      </common-input>
      <ace-card
        :name="$t('contract.sourceCode')"
        :text="contractCode">
      </ace-card>
      <div class="submit">
        <el-button type="primary" size="small" @click="submit" style="width: 220px;">确定</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import commonInput from "./commonInput.vue";

export default {
  components: {
    commonInput
  },
  data() {
    return {
      contractCode: ""
    };
  },
  mounted() {
  },
  methods: {
    
    getInputs() {
      let inputs = this.$refs.commonInput.getInputs();
      console.log(inputs);
    },
    submit() {
      this.getInputs();
    }
  }
};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
@import "assets/css/vars.scss";
.el-button--primary {
  background-color: $common-color;
  border-color: $common-color;
  &.is-disabled {
    background-color: $disabled-color;
    border-color:  $disabled-color;
  }
}
.code-verify {
  display: flex;
  display: -webkit-flex;
  font-size:14px;
  font-family:$font-family-title;
  font-weight:600;
  color:rgba(94,104,117,1);
  line-height:28px;
  margin: 16px 0 16px 32px; 
  .code-verify-text {
    margin-left: 6px;
  }
}

.contract-card {
  background:rgba(255,255,255,1);
  box-shadow:0px 6px 36px 0px rgba(0,62,100,0.04);
  border-radius:4px;
  border:1px solid rgba(229,237,243,1);
  padding: 32px 36px;
}
.submit {
  display: flex;
  display: -webkit-flex;
  justify-content: center;
  margin-top: 5px;
}

</style>


