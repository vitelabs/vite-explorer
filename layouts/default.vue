 <template>
  <div class="default-container headroom">
    <div class="home-nav">
      <div class="home-nav-content">
        <nuxt-link :to="localePath('index')">
        <logo-without-words class="logo"></logo-without-words>
        </nuxt-link>
        <div class="nav-content">
          <div class="navbar-menu">
            <el-menu :default-active="defaultActive" mode="horizontal" background-color="#ffffff" text-color="#000000"
              active-text-color="#005CC7">
              <el-menu-item :key="index" :index="item" v-for="(item, index) in navs" class="text-hover-transition">
                <nuxt-link :to="localePath(item)" class="nav-item">
                {{$t(`nav.${item}`)}}
                </nuxt-link>
              </el-menu-item>
            </el-menu>
          </div>
        </div>
        <div class="search-wrapper">
          <lang-select class="lang-select"></lang-select>
          <search class="search"></search>
        </div>
      </div>
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

  export default {
    components: {
      logoWithoutWords, viteFooter, search, LangSelect
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
      };
    },
    methods: {
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
  .home-nav {
    position: relative;
    right: 0;
    left: 0;
    top: 0;
    z-index: 0;
    background: #FFFFFF;
    box-shadow: 0 6px 36px 0 rgba(0,62,100,0.04);
    .home-nav-content {
      width: 1160px; // phone and pad and pc
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
  }
  .search-wrapper {
    position: absolute;
    top: 0;
    right: 0;
    height: 64px;
    line-height: 64px;
    box-sizing: border-box;
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
  }
  .content-wrapper {
    min-height: 753px;
    background-color: #fafcff;
    padding: 30px 0;
    .content {
      width: 1160px;
      margin: 0 auto;
    }
  }
  
</style>
