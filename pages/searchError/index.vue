<template>
  <div class="search-error">
    <div class="error-content">
      <img src="~assets/images/empty.svg"/>
      <div class="error-text"> {{ $t('sError.text') }} </div>
    </div>
  </div>
</template>

<script>


export default {
  head() {
    return {
      title: this.$t("head.sError")
    };
  },
  components: {
  },
  data() {
    return {
    };
  },
  methods: {

  }
};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  .search-error {
    width: 100%;
    display: flex;
    display: -webkit-flex;
    height: 100%;
    text-align: center;
    .error-content {
      width: 240px;
      margin: auto;
      margin-top: 242px; 
    }
  }
  .error-text {
    margin: auto;
    color: #333;
    font-size: 16px;
    color: #8D9BAE;
    text-align: center;
    margin-top: 30px; 
  }
</style>
