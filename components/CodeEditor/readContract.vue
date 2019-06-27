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
          :text="abiText">
        </common-card>
        <common-card 
          :name="$t('contract.hexCode')" 
          :has-control="true"
          :text="hexCodeText">
        </common-card>
        <ace-card 
          :name="$t('contract.contractCode')" 
          :has-control="true" 
          :read-only="true"
          :text="contractCode">
        </ace-card>
      </div>
    </div>
  </div>
</template>
<script>
import commonCard from "./commonCard.vue";
import keyInfo from "./keyInfo.vue";


export default {
  components: {
    commonCard,
    keyInfo
  },
  data() {
    return {
      abiText: "DUP4\nMSTORE\nSWAP8\nSWAP11\nPUSH1 0x20",
      hexCodeText: "DUP111\nMSTORE111\nSWAP8111\nSWAP1111\nPUSH1 0x20111",
      contractCode: "/**\n*Submitted for verification at Etherscan.io on 2018-12-12\n*/\npragma solidity ^0.4.23;\ncontract Bitmonds {\nstruct BitmondsOwner {\nstring bitmond;\n"
    };
  },
  computed: {
    dataList() {
      return [{
        name: this.$t("contract.name"),
        value: "0x5856977880460633c6"
      }, {
        name: this.$t("contract.seedcount"),
        value: "0x5856977880460633c6"
      }, {
        name: this.$t("contract.gid"),
        value: "0x5856977880460633c6"
      }, {
        name: this.$t("contract.confirmTime"),
        value: "0x5856977880460633c6"
      }, {
        name: this.$t("contract.quotaRatio"),
        value: "0x5856977880460633c6"
      }, {
        name: this.$t("contract.version"),
        value: "0x5856977880460633c6"
      }];
    }
  },
  mounted() {
  },
  methods: {
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


