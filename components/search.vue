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
        this.distinguishSearch();
      },
      distinguishSearch() {
        let str = this.searchStr.trim();
        if (/vite_[A-Za-z0-9]+/.test(str)) {
        // match account

          return;
        }
        if (/tti_[A-Za-z0-9]+/.test(str)) {
        // match token
          return;
        }
        if (/[A-Za-z0-9]+/.test(str)) {
        // match transaction and block
          search.judgeTransOrBlock({
            addr: str
          })
            .then((data)=> {
              if (data === "transaction") {
                // jump to transactionList
              }
              if (data === "block") {
                // jump to blockList
              }
              if (data === "") {
                // cannot search
              }
              console.log("judge data", data);
            }).catch(err=> {
              console.log(err);
            });
        }
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
