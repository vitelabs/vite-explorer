<template>
  <div class="search-container">
    <el-input class="search-input" :placeholder="$t('search.placeholder')" v-model="searchStr"></el-input>
    <el-button class="search-btn" type="primary" @click="search">{{$t('search.btn')}}</el-button>
  </div>
</template>

<script>
  import search from "~/services/search";
  import account from "~/services/account";
  import token from "~/services/token";
  

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
        if (this.$i18n.locale !== "en") {
          langStrPath = `/${this.$i18n.locale}`;
        }
        if (/vite_[A-Za-z0-9]+/.test(str)) {
        // match account
          console.log("match account");
          this.getAccountDetail(str, langStrPath);
          return;
        }
        if (/tti_[A-Za-z0-9]+/.test(str)) {
        // match token
          console.log("match token");
          this.getTokenDetail(str, langStrPath);
          return;
        }
        if (/[A-Za-z0-9]+/.test(str)) {
        // match transaction and block
          this.judgeTransOrBlock(str, langStrPath);
        }
      },

      getTokenDetail(str, langStrPath) {
        token.getDetail({
          tokenId: str
        })
          .then(data=> {
            data ? this.$router.push({path: `${langStrPath}/token/${str}`}) 
              : this.$router.push({path: `${langStrPath}/searchError`});

          })
          .catch(err=> {
            console.log(err);
          });
      },

      getAccountDetail(str, langStrPath) {
        account.getDetail({
          accountAddress: str
        })
          .then(data=> {
            data ? this.$router.push({path: `${langStrPath}/account/${str}`}) 
              : this.$router.push({path: `${langStrPath}/searchError`});

          })
          .catch(err=> {
            console.log(err);
          });
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
