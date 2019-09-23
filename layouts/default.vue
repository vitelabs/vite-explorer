<template>
  <div class="default-container">
    <div class="home-nav">
      <div class="home-nav-content container">
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
              <el-submenu :index="item.key" v-for="item in doubleNavs" :key="item.key" >
                <template slot="title">{{$t(`nav.${item.key}.name`)}}</template>
                <el-menu-item :key="child.name" :index="child.name" v-for="child in item.childs">
                  <a :href="links[item.key][child.name]" target="_blank" class="sub-a" v-if="child.key === 'outer'">
                    {{$t(`nav.${item.key}.childs.${child.name}`)}}
                  </a>
                  <nuxt-link :to="localePath(child.name)" class="nav-item" v-if="child.key === 'inner'">
                    {{$t(`nav.${item.key}.childs.${child.name}`)}}
                  </nuxt-link>
                </el-menu-item>
              </el-submenu>
              <el-menu-item :key="item" :index="item" v-for="item in externalNavs" class="text-hover-transition" v-if="externalNavs.length">
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
          <div class="vite-net"><a href="https://vite.org" target="_blank">{{ $t("nav.vitenet") }}</a></div>
          <search class="search container" :visible="searchOpen" @search-open="closeSearch"></search>
          <div :class="phoneSearchClass" @click="openSearch">
            <div class="p-search">
              <img src="~assets/images/search.svg"/>
            </div>
          </div>
        </div>
      </div>
      <!-- <search class="search container" :visible="searchOpen" v-if="isMobile"></search> -->
    </div>
    <div class="vertail-menu-content">
      <menu-content :navs="navs" :visible.sync="open" @is-open="closeMenu" :double-navs="doubleNavs" :links="links" :external-navs="externalNavs"></menu-content>
    </div>
    <div class="marquee" v-if="noticelist.length">
      <div class="marquee-content">
        <img src="~assets/images/marquee.svg"/>
        <marquee>
          <span class="quee" v-for="(notice, index) in noticelist" :key="index">
            <a v-if="notice.url" target="_black" :href="notice.url" class="quee-link" :style="`color: ${notice.color}`">{{notice.message}}</a>
            <span v-else :style="`color: ${notice.color}`">{{notice.message}}</span>
          </span>
        </marquee>
      </div>
    </div>
    <div class="content-wrapper">
      <nuxt class="container"/>
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
  import general from "~/services/general.js";
  import moment from "moment";
  // import isMobile from "is-mobile";

  moment.updateLocale("en", {
    relativeTime: {
      past: "%s ago",
      s: "%ds",
      m: "1m",
      mm: "%dm",
      h: "1h",
      hh: "%dh",
      d: "1d",
      dd: "%dd",
      M: "1M",
      MM: "%dM",
      y: "1Y",
      yy: "%dY"
    }
  });

  moment.updateLocale("zh-cn", {
    relativeTime: {
      past: "%s前",
      s: "%d秒",
      m: "1分钟",
      mm: "%d分钟",
      h: "1小时",
      hh: "%d小时",
      d: "1天",
      dd: "%d天",
      M: "1月",
      MM: "%d月",
      y: "1年",
      yy: "%d年"
    }
  });

  moment.relativeTimeThreshold("s", 60);
  moment.relativeTimeThreshold("m", 60);
  moment.relativeTimeThreshold("h", 24);
  moment.relativeTimeThreshold("d", 31);
  moment.relativeTimeThreshold("M", 12);

  export default {
    components: {
      logoWithoutWords, viteFooter, search, LangSelect, menuContent
    },
    head() {
      return {
        title: this.$t("head.home"),
      };
    },
    created() {
      if(process.browser){
        if (document.attachEvent) {
          console.log("IE < 11");
          this.$alert(this.$t("alert"), this.$t("attention"), {
            showClose: false,
            showConfirmButton: false
          });
        } else {
          console.log("not IE or IE >=11", window.onload);
        }
      }
      this.keepNavStatus();
      this.getNotice();
    },
    watch: {
      "$route.path": function () {
        this.keepNavStatus();
      },
      "$i18n.locale": function () {
        this.getNotice();
      }
    },
    data() {
      return {
        // isMobile: isMobile(),
        noticelist: [],
        navs: ["index", "FullNode", "blockList", "tokenList", "DApps"],
        externalNavs: [],
        doubleNavs: [{
          key: "mining",
          childs: [{
            key: "inner",
            name: "SBPList"
          }, 
            // key: "outer",
            // name: "voteReward"
          {
            key: "outer",
            name: "registerSBP"
          }]
        }],
        links: {
          mining: {
            SBPList: "/SBPList",
            voteReward: "https://reward.vite.net/#/",
            registerSBP: "https://x.vite.net/walletSBP"
          }
        },
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
      getNotice() {
        general.getNotice({
          language: this.$i18n.locale
        }).then(data=> {
          this.noticelist = data.noticelist || [];
        }).catch(err=> {
          console.log(err);
        });
      },
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
          if (this.navs.indexOf(paths[paths.length - 1]) > -1 || this.externalNavs.indexOf(paths[paths.length - 1]) > -1) {
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

  a {
    display: inline-block;
    width: 100%;
    color: black;
  }

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
    .vite-net {
      float: right;
      padding: 0 20px;
      font-size: 12px;
      border-right: 1px solid #E5EDF3;
      a {
        color: $common-color;
      }
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
    min-height: calc(100vh - 116px);
    background-color: #fafcff;
    padding: 30px 0;
  }

  .marquee {
    background-color: rgba(236,242,255,1);
    height:40px;
    line-height: 40px;
    .marquee-content {
      display: flex;
      display: -webkit-flex;
      width: 1160px;
      margin: 0 auto;
    }
    @include tablet {
      .marquee-content {
        width: 728px;
      }
    }
    @include mobile {
      .marquee-content {
        width: 290px;
      }
    }
    .quee {
      font-weight:400;
      font-size:12px;
      color:rgba(94,104,117,1);
      display: inline-block;
      margin-right: 30px;
      .quee-link {
        color: $common-color;
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
    box-shadow: 0 6px 36px 0 rgba(0, 62, 100, 0.04);
    .home-nav-content {
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
          padding: 0 13px;
          text-decoration: none;
          display: block;
        }
        .el-menu-item {
          padding: 0px;
          font-size: 12px;
        }
        .el-menu-item:hover {
          background-color: #ffffff !important;
        }
        .el-menu--horizontal > .el-menu-item {
          height: 64px;
          line-height: 64px;
        }
      }
    }
    /** iPad **/
    @include tablet {
      .home-nav-content {
        box-sizing: border-box;
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
    @include mobile {
      .home-nav-content {
        box-sizing: border-box;
        width: 100%;
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
        .invisible-search {
          display: none;
        }
        .vite-net {
          display: none;
        }
      }
    }
  }

</style>
