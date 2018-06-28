<template>
  <div class="default-container">
    <div class="home-nav">
      <a class="navbar-brand" href="/">
        <logo-without-words></logo-without-words>
      </a>
      <div class="search-wrapper">
        <search></search>
      </div>
    </div>

    <div class="content-wrapper">
      <nuxt/>
    </div>

    <vite-footer></vite-footer>
  </div>
</template>

<script>
  import logoWithoutWords from "~/components/logoWithoutWords.vue";
  import viteFooter from "~/components/footer.vue";
  import search from "~/components/search.vue";

  export default {
    components: {
      logoWithoutWords, viteFooter, search
    }
  };
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .home-nav {
    position: relative;
    right: 0;
    left: 0;
    top: 0;
    z-index: 9999;
    padding: 20px;
    background: #f0f0f0;
    .search-wrapper {
      position: absolute;
      right: 40px;
      bottom: 40px;
      float: right;
    }
    .navbar-brand {
      display: inline-block;
      text-decoration: none;
      padding: 0;
      margin: 0; 
      color: #000;
    }
  }
  .content-wrapper {
    padding: 20px 120px;
  }
</style>



