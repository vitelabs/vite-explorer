<template>
  <div class="write-code">
    <div class="code-verify">
      <img src="~/assets/images/code/unverified.svg"/>
      <div class="code-verify-text">{{ $t('contract.unverified') }}</div>
    </div>
    <div class="contract-card">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" label-position="top">
        <el-form-item :label="$t('contract.name')" prop="contractName" class="common-label">
          <el-input v-model="ruleForm.contractName" size="small"></el-input>
        </el-form-item>
        <common-input
          ref="commonInput"
          :name="$t('contract.params')"
          :is-multiple="true">
        </common-input>
        <el-form-item :label="$t('contract.version')" prop="version" class="common-label">
          <el-input v-model="ruleForm.version" size="small"></el-input>
        </el-form-item>
        <el-form-item prop="sourceCode">
          <ace-card
          :name="$t('contract.sourceCode')"
          ref="sourceCode">
          </ace-card>
        </el-form-item>
        <el-form-item class="submit">
          <el-button type="primary" size="small" @click="submit('ruleForm')" style="width: 220px;">确定</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import commonInput from "./commonInput.vue";
import contract from "~/services/contract.js";

export default {
  props: {
    contractAddress: {
      type: String,
      default: ""
    }
  },
  components: {
    commonInput
  },
  data() {
    return {
      ruleForm: {
        contractName: "",
        version: ""
      },
      rules: {
        contractName: [
          { required: true, message: this.$t("contract.noEmpty"), trigger: "blur" },
        ],
        version: [
          { required: true, message: this.$t("contract.noEmpty"), trigger: "blur" }
        ]
      }
    };
  },
  mounted() {
  },
  methods: {
    getInputs() {
      let inputParams = this.$refs.commonInput.getInputs();
      let contractName = this.ruleForm.contractName;
      let version = this.ruleForm.version;
      let sourceCode = this.$refs.sourceCode.getSourceCode();
      return {
        contractAddress: this.contractAddress,
        contractName,
        inputParams,
        version,
        sourceCode
      };
    },
    submit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let inputs = this.getInputs();
          contract.uploadContract({
            ...inputs
          }).then(data=> {
            console.log("上传成功");
            console.log(data);
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>

<style lang="scss" rel="stylesheet/scss">
@import "assets/css/vars.scss";
.el-form--label-top .el-form-item__label {
  padding: 0;
  line-height: 28px;
  font-family:PingFangSC-Semibold;
  font-weight:600;
  color:rgba(94,104,117,1);
}
.el-form-item__error {
  position: relative;
}
.common-label {
  font-family:PingFangSC-Semibold;
  font-weight:600;
  color:rgba(94,104,117,1);
  line-height:20px;
  font-size: 14px;
  margin-bottom: 9px;
}
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
  margin-bottom: 0;
}

</style>


