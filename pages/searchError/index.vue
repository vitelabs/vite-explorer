<template>
  <div class="search-error">
    <p class="error-text"> 竟然没有搜索到，换个词试试~ </p>
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
    display: flex;
    display: -webkit-flex;
    height: 100%;
  }
  .error-text {
    margin: auto;
    margin-top: 200px;
    color: #333;
    font-size: 24px;
    width: 328px;
    padding: 20px;
    background-color: #eee;
  }
</style>
