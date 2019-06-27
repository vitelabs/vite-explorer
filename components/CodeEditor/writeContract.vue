<template>
  <div class="write-code">
    <div class="code-verify">
      <img src="~/assets/images/code/unverified.svg"/>
      <div class="code-verify-text">{{ $t('contract.unverified') }}</div>
    </div>
    <div class="contract-card">
      <ace-card></ace-card>
    </div>
  </div>
</template>
<script>

export default {
  components: {
  },
  data() {
    return {
    };
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
  padding: 32px 36px;
}

</style>


