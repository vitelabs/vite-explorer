<template>
  <div class="page-home">
    <el-row>
      <el-col :span="24">
        <el-button>{{name}}</el-button>
      </el-col>
    </el-row>
    <v-footer></v-footer>
  </div>
</template>

<script>
  import Footer from '~/components/Footer.vue';
  import auth from '../services/index';

  export default {
    components: {
      VFooter: Footer,
    },
    async asyncData(ctx) {
      let data = await auth.getUser();

      console.log(data);

      return {name: data[0].name}
    },
    data() {
      return {
        name: this.name
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
