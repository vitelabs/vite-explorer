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
          <el-menu :default-active="defaultActive" mode="horizontal" background-color="#f0f0f0" text-color="#888888"
            active-text-color="#333333">
            <el-menu-item :key="index" :index="item" v-for="(item, index) in navs" class="text-hover-transition">
              <nuxt-link :to="localePath(item)" class="nav-item">
              {{$t(`nav.${item}`)}}
              </nuxt-link>
            </el-menu-item>
            <lang-select></lang-select>
          </el-menu>
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
        if (this.$route.path === "/" || this.$route.path === "/zh") {
          this.defaultActive = "index";
        } else {
          //TODO fix
          let paths = this.$route.path.split("/");
          this.defaultActive = paths[paths.length - 1];
        }
      }
    }
  };
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .el-menu--horizontal {
    border-bottom: none;
  }
  .home-nav {
    position: relative;
    right: 0;
    left: 0;
    top: 0;
    z-index: 9999;
    padding: 19px;
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
      .navbar-menu {
        .nav-item {
          padding: 0 40px;
          text-decoration: none;
          height: 60px;
          display: block;
        }
      }
    }

  }
  .content-wrapper {
    padding: 20px 120px 120px;
  }
</style>
