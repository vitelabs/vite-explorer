<template>
  <div class="search-error">
    <div class="error-text"> 竟然没有搜索到，换个词试试~ </div>
    
  </div>
</template>

<script>
 

export default {
   head() {
     return {
       title: "搜索无结果"
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
