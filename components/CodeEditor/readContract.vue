<template>
  <div class="read-code">
    <div class="code-verify">
      <img src="~/assets/images/code/verified.svg"/>
      <div class="code-verify-text">{{ $t('contract.verified') }}</div>
    </div>
    
    <div class="contract-card">
      <key-info :data-list="dataList"></key-info>
      <div class="card-content">
        <common-card 
          :name="$t('contract.abi')" 
          :has-control="true" 
          :text="contractData.abi">
        </common-card>
        <common-card 
          :name="$t('contract.hexCode')" 
          :has-control="true"
          :text="contractData.hexCode">
        </common-card>
        <ace-card 
          :name="$t('contract.contractCode')" 
          :has-control="true" 
          :read-only="true"
          :text="contractData.sourceCode">
        </ace-card>
      </div>
    </div>
  </div>
</template>
<script>
import commonCard from "./commonCard.vue";
import keyInfo from "./keyInfo.vue";
import contract from "~/services/contract.js";

export default {
  props: {
    contractAddress: {
      type: String,
      default: ""
    }
  },
  components: {
    commonCard,
    keyInfo
  },
  created() {
    this.fetchContractInfo();
  },
  data() {
    return {
      contractData: {},
      abiText: "DUP4\nMSTORE\nSWAP8\nSWAP11\nPUSH1 0x20",
      hexCodeText: "DUP111\nMSTORE111\nSWAP8111\nSWAP1111\nPUSH1 0x20111",
      contractCode: "/**\n*Submitted for verification at Etherscan.io on 2018-12-12\n*/\npragma solidity ^0.4.23;\ncontract Bitmonds {\nstruct BitmondsOwner {\nstring bitmond;\n"
    };
  },
  computed: {
    dataList() {
      return [{
        name: this.$t("contract.name"),
        value: this.contractData.contractName
      }, {
        name: this.$t("contract.seedcount"),
        value: this.contractData.seedCount
      }, {
        name: this.$t("contract.gid"),
        value: this.contractData.gid
      }, {
        name: this.$t("contract.confirmTime"),
        value: this.contractData.confirmTime
      }, {
        name: this.$t("contract.quotaRatio"),
        value: this.contractData.quotaRatio
      }, {
        name: this.$t("contract.version"),
        value: this.contractData.evmVersion
      }];
    }
  },
  mounted() {
  },
  methods: {
    fetchContractInfo() {
      contract.getContractDetail({
        accountAddress: this.contractAddress
      }).then(data=> {
        console.log(data);
        this.contractData = data;
      }).catch(err=> {
        console.warn(err);
      });
    }
  }
};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
@import "assets/css/vars.scss";
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
  .card-content {
    padding: 16px 36px;
  }
}

</style>


