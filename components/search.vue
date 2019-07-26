<template>
  <div :class="classObj">
    <div class="phone-close">
      <span class="img-wrapper" @click="close">
        <img src="~assets/images/close.svg"/>
      </span>
    </div>
    <div class="search-container">
      <input class="search-input" :placeholder="$t('search.placeholder')" v-model="searchStr" @keyup.enter="search" />
      <span class="img-wrapper" @click="search">
        <img src="~assets/images/search.svg"/>
      </span>
    </div>
  </div>
  
</template>

<script>
  import search from "~/services/search";
  import account from "~/services/account";
  import token from "~/services/token";
  

  export default {
    props: {
      visible: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        open: this.visible,
        searchStr: ""
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
          "whole-search": true,
          "invisible": !this.open
        };
      },
    },
    methods: {
      close() {
        this.$emit("search-open", false);
      },
      search() {
        let str = this.searchStr.trim();
        if (!str) {
          this.$message(this.$t("utils.noEmpty"));
          return;
        }
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
        // match tokenid
          console.log("match tokenId");
          this.getTokenDetailById(str, langStrPath);
          return;
        }
        if (/[A-Za-z0-9]+/.test(str) && str.length === 64) {
        // match transaction and block
          console.log("transaction and block");
          this.judgeTransOrBlock(str, langStrPath);
        } else {
          // match tokenName or tokenSymbol
          console.log("match tokenName or tokenSymbol");
          this.judgeTokenName(str, langStrPath);
        }
      },

      judgeTokenName(str, langStrPath) {
        search.judgeTokenName({
          str
        })
          .then((data)=> {
            if (data.length === 1) {
              // jump to detail
              let { id } = data[0];
              this.$router.push({path: `${langStrPath}/token/${id}`});
            } else if (data.length > 1){
              // jump to list
              this.$router.push({path: `${langStrPath}/tokenList?filter=${str}`});
            } else {
              this.$router.push({path: `${langStrPath}/searchError`});
            }
          }).catch(err=> {
            console.log(err);
          });
      },
      getTokenDetailById(str, langStrPath) {
        token.getDetail({
          tokenId: str
        })
          .then(data=> {
            data ? this.$router.push({path: `${langStrPath}/token/${str}`}) 
              : this.$router.push({path: `${langStrPath}/searchError`});

          })
          .catch(err=> {
            this.$router.push({path: `${langStrPath}/searchError`});
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
            this.$router.push({path: `${langStrPath}/searchError`});
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
          }).catch(err=> {
            console.log(err);
          });
      }
    }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "assets/css/vars.scss";
.phone-close {
  display: none;
}

.search-container {
  position: relative;
  .search-input {
    width: 300px;
    height: 64px;
    box-sizing: border-box;
    overflow: hidden; 
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  input {
    border: 1px solid #E5EDF3;
    border-top: 0; 
    border-bottom: 0; 
    padding: 0 50px 0;
    margin: 0;
    font-size: 14px;
    padding-left: 23px; 
    &:focus {
      border-left: 1px solid $common-color;
      border-right: 1px solid $common-color;
      outline: none;
    }
  }
  
  .img-wrapper {
    position: absolute;
    left: 264px;
    top: 3px;
    &:hover {
      cursor: pointer;
    }
  }
}

/** iPhone **/
@media only screen and (min-width: 320px) and (max-width: 767px) {
  .phone-close {
    display: block;
    position: absolute;
    z-index: 999;
    margin-top: -64px; 
    margin-left: -40px; 
    background: #fff;
    width: 46px;
    height: 64px;
    margin-left: -34px;
    &:hover {
      cursor: pointer;
    }
  }
  .whole-search {
    display: block;
  }
  .invisible {
    display: none;
  }
  .search-container {
    margin-top: -64px; 
    position: relative;
    z-index: 999;
    .search-input {
      width: 272px;
      height: 64px;
      box-sizing: border-box;
      overflow: hidden; 
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .img-wrapper {
      left: 241px;
    }
  }
}
</style>
