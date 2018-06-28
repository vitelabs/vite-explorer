<template>
  <div class="error-container">
    <h1 class="error" v-if="error.statusCode === 404">404</h1>
    <h1 v-else>应用发生错误异常</h1>
    <nuxt-link class="go-home" to="/">点击返回首页</nuxt-link>
  </div>
</template>

<script>
  export default {
    props: ["error"],
    layout: "blog",
    head() {
      return {
        title: "404",
      };
    }
  };
</script>

<style>
  .error-container {
    margin-top: 200px;
    width: 100%;
    text-align: center;
  }
  .error {
    font-weight: bold;
    font-size: 60px;
  }
  .go-home {
    text-decoration: none;
    color: #999
  }
</style>
