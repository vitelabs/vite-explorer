 <template>
  <div class="default-container">
    <div class="home-nav">
      <div class="home-nav-content">
        <logo-without-words class="logo"></logo-without-words>
        <div class="nav-content">
          <div class="navbar-menu">
            <el-menu :default-active="defaultActive" mode="horizontal" background-color="#ffffff" text-color="#000000"
              active-text-color="#3498db">
              <el-menu-item :key="index" :index="item" v-for="(item, index) in navs" class="text-hover-transition">
                <nuxt-link :to="localePath(item)" class="nav-item">
                {{$t(`nav.${item}`)}}
                </nuxt-link>
              </el-menu-item>
            </el-menu>
          </div>
        </div>
        
        <div class="search-wrapper">
          <div class="vertical-menu" @click="openMenu">
            <div class="v-menu">
              <img src="~assets/images/menu.svg"/>
            </div>
          </div>
          <lang-select class="lang-select"></lang-select>
          <search class="search" :visible="searchOpen" @search-open="closeSearch"></search>
          <div :class="phoneSearchClass" @click="openSearch">
            <div class="p-search">
              <img src="~assets/images/search.svg"/>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="vertail-menu-content">
      <menu-content :navs="navs" :visible.sync="open" @is-open="closeMenu"></menu-content>
    </div>
    <div class="content-wrapper">
      <nuxt class="content"/>
    </div>
    <vite-footer></vite-footer>
  </div>
</template>

<script>
  import logoWithoutWords from "~/components/logoWithoutWords.vue";
  import viteFooter from "~/components/Footer.vue";
  import search from "~/components/search.vue";
  import LangSelect from "~/components/LangSelect.vue";
  import menuContent from "~/components/menuContent.vue";

  export default {
    components: {
      logoWithoutWords, viteFooter, search, LangSelect, menuContent
    },
    head () {
      return {
        title: this.$t("head.home"),
      };
    },
    created() {
      this.keepNavStatus();
    },
    watch: {
      "$route.path": function() {
        this.keepNavStatus();
      }
    },
    data() {
      return {
        navs: ["index", "transactionList", "blockList", "tokenList"],
        defaultActive: "index",
        open: false,
        searchOpen: false,
        phoneSearchClass: {
          "phone-search": true,
          "invisible-search": false
        }
      };
    },
    methods: {
      openMenu() {
        this.open = !this.open;
      },
      closeMenu(val) {
        this.open = val;
      },
      openSearch() {
        this.searchOpen = !this.searchOpen;
        this.phoneSearchClass["invisible-search"] = true;
      },
      closeSearch(val) {
        this.searchOpen = val;
        this.phoneSearchClass["invisible-search"] = false;
      },
      keepNavStatus() {
        if (this.$route.path === "/" || this.$route.path === `/${this.$i18n.locale}`) {
          this.defaultActive = "index";
        } else {
          let paths = this.$route.path.split("/");
          if (this.navs.indexOf(paths[paths.length - 1]) > -1) {
            this.defaultActive = paths[paths.length - 1];
          } else {
            if (this.$i18n.locale === "en") {
              this.defaultActive = paths[1] + "List";
            } else {
              this.defaultActive = paths[2] + "List";
            }
          }
        }
      }
    }
  };
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "assets/css/vars.scss";
  .el-menu--horizontal {
    border-bottom: none;
  }
  .search-wrapper {
    position: absolute;
    top: 0;
    right: 0;
    height: 64px;
    line-height: 64px;
    box-sizing: border-box;
    .phone-search {
      display: none;
    }
    .search {
      float: right;
    }
    .lang-select {
      float: right;
      &:hover {
        cursor: pointer;
        border-bottom: 2px solid $common-color;
        color: $common-color;
      }
    }
    .invisible-search {
      display: none;
    }
    .vertical-menu {
      display: none;
    }
  }
  .content-wrapper {
    min-height: 753px;
    background-color: #fafcff;
    padding: 30px 0;
    .content {
      width: 1160px;
      margin: 0 auto;
    }
    @media only screen and (min-width: 768px) and (max-width: 1024px) {
      .content {
        width: 728px;
      }
    }
    @media only screen and (min-width: 320px) and (max-width: 767px) {
      .content {
        width: 290px;
      }
    }
  }

  .vertical-menu {
    .v-menu {
      width: 56px;
      text-align: center;
      box-sizing: border-box;
      border-left: 1px solid #E5EDF3;
      &:hover {
        cursor: pointer;
      }
    }
  }

  .home-nav {
    position: relative;
    background: #FFFFFF;
    box-shadow: 0 6px 36px 0 rgba(0,62,100,0.04);
    .home-nav-content {
      width: 1160px;
      margin: auto;
      position: relative;
      height: 64px;
      .logo {
        height: 64px;
      }
    }
    .nav-content {
      position: absolute;
      left: 100px;
      top: 0px;
      .navbar-menu {
        .nav-item {
          padding: 0 33px;
          text-decoration: none;
          display: block;
        }
        .el-menu-item {
          padding: 0px;
        }
        .el-menu-item:hover {
          background-color: #ffffff!important;
        }
        .el-menu--horizontal>.el-menu-item {
          height: 64px;
          line-height: 64px;
        }
      }
    }
    /** iPad **/
    @media only screen and (min-width: 768px) and (max-width: 1024px) {
      .home-nav-content {
        box-sizing: border-box;
        padding-left: 20px; 
        width: 768px;
        margin: auto;
      }
      .nav-content {
        display: none;
      }
      .vertical-menu {
        display: block;
        float: right;
      }
    }
    /** iPhone **/
    @media only screen and (min-width: 320px) and (max-width: 767px) {
      .home-nav-content {
        box-sizing: border-box;
        padding-left: 15px; 
        width: 320px;
        margin: auto;
      }
      .nav-content {
        display: none;
      }
      
      .vertical-menu {
        display: block;
        float: right;
      }
      .search-wrapper {
        .phone-search {
          display: block;
          width: 44px;
          text-align: center;
          float: right;
          line-height: 64px;
          border-right: 1px solid #E5EDF3;
        }
        .invisible-search  {
          display: none;
        }
      }
    }
  }

</style>
