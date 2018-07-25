<template>
  <div :class="classObj">
    <div class="menu-content">
      <div :key="index" v-for="(item, index) in navs" class="menu-item" @click="clickMenu">
        <nuxt-link :to="localePath(item)" class="nav-item">
          {{$t(`nav.${item}`)}}
        </nuxt-link>
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
      visible: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        open: this.visible
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
      }
    }
  };
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

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
    .menu-item {
      box-sizing: border-box;
      height: 57px;
      line-height: 57px;
      border-bottom: 1px solid #E5EDF3;
      .nav-item {
        display: inline-block;
        width: 100%;
        font-size: 14px;
        color: #3F3F3F;
      }
    }
  }
}

/** iPhone **/
@media only screen and (min-width: 320px) and (max-width: 767px) {
  .menu-wrapper {
    .menu-content {
      width: 320px;
      margin: auto;
      padding-left: 15px;
    }
  }
}
</style>
