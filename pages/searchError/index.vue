<template>
  <div class="search-error">
    <div class="error-text"> {{ $t('sError.text') }} </div>

  </div>
</template>

<script>


export default {
   head() {
     return {
       title: this.$t('head.sError')
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
    text-align: center;
  }
  .error-text {
    margin-top: 200px;
    color: #333;
    font-size: 30px;
    margin-bottom: 100px;
  }
</style>
