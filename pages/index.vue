<template>
  <div class="page-home">
    <el-row>
      <el-col :span="24">
        <el-button>Default Button1111</el-button>
      </el-col>
    </el-row>
    <v-footer></v-footer>
  </div>
</template>

<script>
  import Footer from '~/components/Footer.vue';


  export default {
    components: {
      VFooter: Footer,
    },
    asyncData(ctx) {
      return {name: 'world'}
    },
    data() {
      return {
        title: 'hahha'
      }
    },
    head() {
      return {
        title: this.title,
      }
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  .page-home {
    margin-top: 100px;
  }

</style>
