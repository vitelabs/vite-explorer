<template>
  <div class="read-code">
    <div class="code-verify">
      <img src="~/assets/images/code/verified.svg"/>
      <div class="code-verify-text">{{ $t('contract.verified') }}</div>
    </div>
    
    <div class="contract-card">
      <key-info :data-list="dataList"></key-info>
      <div class="card-content">
        <common-card :name="$t('contract.abi')" :has-control="true"></common-card>
        <common-card :name="$t('contract.hexCode')" :has-control="true"></common-card>
        <ace-card :name="$t('contract.contractCode')" :has-control="true" :read-only="true"></ace-card>
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
    };
  },
  computed: {
    dataList() {
      return [{
        name: "合约名称",
        value: "0x5856977880460633c6"
      }, {
        name: "合约名称",
        value: "0x5856977880460633c6"
      }, {
        name: "合约名称",
        value: "0x5856977880460633c6"
      }, {
        name: "合约名称",
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


