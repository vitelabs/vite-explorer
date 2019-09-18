<template>
  <div :class="classObj">
    <div class="menu-content">
      <div :key="index" v-for="(item, index) in navs" class="menu-item" @click="clickMenu">
        <nuxt-link :to="localePath(item)" class="nav-item">
          {{$t(`nav.${item}`)}}
        </nuxt-link>
      </div>
      <div class="double-navs">
        <div v-for="item in doubleNavs" :key="item.key">
          <div class="menu-item">
            <div class="nav-item" @click="clickDropdown">{{$t(`nav.${item.key}.name`)}}</div>
          </div>
          <div :key="child.name" :index="child.name" v-for="child in item.childs" class="menu-item" v-if="dropDownVisible">
            <a :href="links[item.key][child.name]" target="_blank" class="nav-item double-nav-item" v-if="child.key === 'outer'">
              {{$t(`nav.${item.key}.childs.${child.name}`)}}
            </a>
            <nuxt-link :to="localePath(child.name)" class="nav-item double-nav-item" v-if="child.key === 'inner'">
              {{$t(`nav.${item.key}.childs.${child.name}`)}}
            </nuxt-link>
          </div>
        </div>
      </div>
      <div :key="item" v-for="item in externalNavs" class="menu-item" @click="clickMenu" v-if="externalNavs.length">
        <nuxt-link :to="localePath(item)" class="nav-item">
          {{$t(`nav.${item}`)}}
        </nuxt-link>
      </div>
      <div class="menu-item vite-link">
        <a href="https://vite.org" target="_blank">{{ $t("nav.vitenet") }}</a>
      </div>
    </div>
  </div>
</template>

<script type="text/babel">
  export default {
    props: {
      navs: {
        type: Array,
        default: () => []
      },
      doubleNavs: {
        type: Array,
        default: () => []
      },
      externalNavs: {
        type: Array,
        default: () => []
      },
      visible: {
        type: Boolean,
        default: false
      },
      links: {
        type: Object,
        default: () => {}
      }
    },
    data() {
      return {
        open: this.visible,
        dropDownVisible: false
      };
    },
    watch: {
      visible(val) {
        this.open = val;
      }
    },
    created() {
      this.open = this.visible;
    },
    computed: {
      classObj() {
        return {
          "menu-wrapper": true,
          "invisible": !this.open
        };
      },
    },
    methods: {
      clickMenu() {
        this.open = false;
        this.$emit("is-open", this.open);
      },
      clickDropdown() {
        this.dropDownVisible = !this.dropDownVisible;
      }
    }
  };
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "assets/css/vars.scss";
.invisible {
  display: none;
}

.menu-wrapper {
  width: 100%;
  height: 228px;
  
  position: absolute;
  z-index: 999;
  .menu-content {
    box-sizing: border-box;
    background: #FFFFFF;
    border: 1px solid #E5EDF3;
    box-shadow: 0 6px 36px 0 rgba(0,62,100,0.04);
    width: 768px;
    margin: auto;
    padding-left: 20px;
    .vite-link {
      font-size: 12px;
    }
    .menu-item {
      box-sizing: border-box;
      height: 57px;
      line-height: 57px;
      border-bottom: 1px solid #E5EDF3;
      .nav-item {
        display: inline-block;
        width: 100%;
        font-size: 12px;
        color: #3F3F3F;
        cursor: pointer;
      }
      .double-nav-item {
        padding-left: 15px; 
      }
    }
  }
}

/** iPhone **/
@include mobile {
  .menu-wrapper {
    .menu-content {
      width: 320px;
      margin: auto;
      padding-left: 15px;
    }
  }
}
</style>
