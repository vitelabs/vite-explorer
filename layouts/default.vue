<template>
  <div class="default-container headroom">
    <div class="home-nav">
      <a class="navbar-brand" href="/">
        <logo-without-words></logo-without-words>
      </a>
      <div class="nav-content">
        <div class="search-wrapper">
          <search></search>
        </div>
        <div class="navbar-menu">
          <div ref="navbarEnd" class="navbar-end">
            <nuxt-link :key="item" :to="localePath(item)" class="nav-item text-hover-transition" v-for="item in navs">
              {{$t(`nav.${item}`)}}
            </nuxt-link>
          </div>
        </div>
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
    },
    head () {
      return {
        title: "首页"
      };
    },
    data: function() {
      return {
        navs: ["index", "transaction", "snapshot", "token"],
      };
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
    .navbar-brand {
      display: inline-block;
      text-decoration: none;
      padding: 0;
      margin: 0; 
      color: #000;
    }
    .nav-content {
      position: absolute;
      right: 40px;
      bottom: 40px;
      top: 30px;
      float: right;
      .navbar-end {
        margin-top: 15px;
        display: -webkit-flex; /* Safari */
        display: flex;
        justify-content: space-between;
        .nav-item {
          padding: 5px;
        }
      }
    }
    
  }
  .content-wrapper {
    padding: 20px 120px 120px;
  }
</style>



