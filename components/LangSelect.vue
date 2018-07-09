<template>
  <el-submenu index="language" text-color="#888888">
    <template slot="title">{{$t('lang')}}</template>
    <el-menu-item v-for="(item, index) in locales" :key="index" :index="item.code" class="nav-item" v-if="item.code !== $i18n.locale">
      <nuxt-link class="dropdown-item"
                  :to="switchLocalePath(item.code)">
        {{item.name}}
      </nuxt-link>
    </el-menu-item>
  </el-submenu>
</template>

<script type="text/babel">
  export default {
    computed: {
      locales: function () {
        return this.$i18n.locales;
      }
    }
  };
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dropdown-item {
  padding: 0.5rem 40px;
  text-decoration: none;
  color: #888888
}

</style>
