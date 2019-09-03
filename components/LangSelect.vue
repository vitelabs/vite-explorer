<template>
    <el-dropdown>
      <span class="el-dropdown-link">
        {{ $t('lang') }}
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
import locale from "element-ui/lib/locale";
import zhLang from "element-ui/lib/locale/lang/zh-CN";
import enLang from "element-ui/lib/locale/lang/en";

export default {
  computed: {
    locales: function () {
      this.$i18n.locale === "en" ? locale.use(enLang) : locale.use(zhLang) ;
      return this.$i18n.locales;
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
  .el-dropdown-link {
    font-size: 12px;
    letter-spacing: 0;
    padding: 22px 20px;
  }
  .el-dropdown {
    display: inline-block;
    position: relative;
    color: #000000;
    font-size: 14px;
  }
  .dropdown-item {
    padding: 0.5rem 20px;
    text-decoration: none;
    color: #000000;
  }

</style>
