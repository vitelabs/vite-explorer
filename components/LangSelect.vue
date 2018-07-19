<template>
  <el-dropdown>
    <span class="el-dropdown-link">
      {{ $t('lang') }}<i class="el-icon-arrow-down el-icon--right"></i>
    </span>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item v-for="(item, index) in locales" :key="index" v-if="item.code !== $i18n.locale">
        <nuxt-link class="dropdown-item"
                  :to="switchLocalePath(item.code)">
          {{ item.name }}
        </nuxt-link>
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
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

<style rel="stylesheet/scss" lang="scss">
.dropdown-item {
  padding: 0.5rem 20px;
  text-decoration: none;
  color: #888888
}

</style>
