<template>
  <div>
    <div id="home-nav">
      <div class="container">
        <div class="navbar-brand">
          <div @click="onLogoClick">
            <a>
              <logo-without-words></logo-without-words>
            </a>
          </div>
        </div>
        <div class="navbar-menu"></div>
      </div>
    </div>
    <nuxt/>
  </div>
</template>
<script>
  import logoWithoutWords from '~/components/logoWithoutWords.vue'

  export default {
    components: {
      logoWithoutWords
    },
    data: function () {
      return {}
    },
    computed: {},
    methods: {
      onLogoClick() {
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  #home-nav {
    position: fixed;
  }

</style>



