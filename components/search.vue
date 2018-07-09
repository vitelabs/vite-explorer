<template>
  <div class="search-container">
    <el-input class="search-input" :placeholder="$t('search.placeholder')" v-model="searchStr"></el-input>
    <el-button class="search-btn" type="primary" @click="search">{{$t('search.btn')}}</el-button>
  </div>
</template>

<script>
  import search from "~/services/search";


  export default {
    props: {

    },
    data() {
      return {
        searchStr: ""
      };
    },
    methods: {
      search() {
        let str = this.searchStr.trim();
        let langStrPath = "";
        if (this.$i18n.locale === "zh") {
          langStrPath = "/zh";
        }
        if (/vite_[A-Za-z0-9]+/.test(str)) {
        // match account
          this.$router.push({path: `${langStrPath}/account/${str}`});
          return;
        }
        if (/tti_[A-Za-z0-9]+/.test(str)) {
        // match token
          this.$router.push({path: `${langStrPath}/token/${str}`});
          return;
        }
        if (/[A-Za-z0-9]+/.test(str)) {
        // match transaction and block
          this.judgeTransOrBlock(str, langStrPath);
        }
      },
      
      judgeTransOrBlock(str, langStrPath) {
        search.judgeTransOrBlock({
          addr: str 
        })
          .then((data)=> {
            if (data === "transaction") {
              this.$router.push({path: `${langStrPath}/transaction/${str}`});
            }
            if (data === "block") {
              this.$router.push({path: `${langStrPath}/block/${str}`});
            }
            if (data === "null") {
              this.$router.push({path: `${langStrPath}/searchError`});
            }
            console.log("judge data", data);
          }).catch(err=> {
            console.log(err);
          });
      }
    }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .search-input {
    width: 60vw;
    height: 40px;
  }
  .search-btn {
    margin-left: 20px;
  }
</style>
