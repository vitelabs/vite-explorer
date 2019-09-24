<template>
  <div :class="classObj">
    <div class="is-flex phone-info">
      <div class="phone-close">
        <span class="img-wrapper" @click="close">
          <img src="~assets/images/close.svg"/>
        </span>
      </div>
      <div class="search-container">
        <input class="search-input" :placeholder="$t('search.placeholder')"  @keyup.enter="ensureSearch" v-model="searchStr"/>
        <span class="img-wrapper" @click="ensureSearch">
          <img src="~assets/images/search.svg"/>
        </span>
      </div>
    </div>
    <div class="drop-list-content" v-if="accountList.concat(tokenList.concat(superNodeList)) && accountList.concat(tokenList.concat(superNodeList)).length">
      <div v-if="accountList.length">
        <div class="drop-list-title">Address</div>
        <div v-for="(item, index) in accountList" :key="index">
          <nuxt-link :to="`${langStrPath}/account/${item.fullWord}`">
            <div class="is-flex item-wrapper">
              <div class="account-content" @click="clearDropList">
                <div class="item-fullword">{{ item.fullWord }}</div>
              </div>
            </div>
          </nuxt-link>
        </div>
      </div>
      <div v-if="tokenList.length">
        <div class="drop-list-title">Tokens</div>
        <div v-for="(item, index) in tokenList" :key="index">
          <nuxt-link :to="`${langStrPath}/token/${item.fullWord}`">
            <div class="is-flex item-wrapper">
              <img class="icon-wrapper" :src="item.icon"/>
              <div class="" @click="clearDropList">
                <div>{{ item.displayName }}</div>
                <div class="item-fullword">{{ item.fullWord }}</div>
              </div>
            </div>
          </nuxt-link>
        </div>
      </div>
      <div v-if="superNodeList.length">
        <div class="drop-list-title">SBPs</div>
        <div v-for="(item, index) in superNodeList" :key="index">
          <nuxt-link :to="`${langStrPath}/SBPDetail/${item.fullWord}`">
            <div class="item-wrapper">
              <div>{{ item.displayName }}</div>
              <div class="item-fullword">{{ item.fullWord }}</div>
            </div>
          </nuxt-link>
        </div>
      </div>
      
    </div>
  </div>
  
</template>

<script>
  import search from "~/services/search";
  import account from "~/services/account";
  import token from "~/services/token";
  
  // search type

  // 0 ALL
  // 1 ACCOUNT_ADDRESS   
  // 2 TX_HASH 
  // 3 SNAPSHOT_HASH
  // 4 TOKEN_ID 
  // 5 TOKEN_NAME
  // 6 TOKEN_SYMBOL
  // 7 SUPERNODE_NAME  

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
        searchStr: "",
        valueTimeout: null,
        resultList: [],
        accountList: [],
        tokenList: [],
        superNodeList: []
      };
    },
    watch: {
      visible(val) {
        this.open = val;
      },
      searchStr(val) {
        this.debounceInput(val);
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
      langStrPath() {
        return this.$i18n.locale === "zh" ? `/${this.$i18n.locale}` : "";
      }
    },
    methods: {
      debounceInput(val) {
        this.clear();
        this.clearDropList();
        this.valueTimeout = setTimeout(async () => {
          let str = val.trim();
          if (!str) {
            this.searchStr = str;
            this.$message(this.$t("utils.noEmpty"));
            return;
          }
          this.searchStr = str;
          await this.getSimilarList();
          this.showDroplist();
        }, 500);
      },
      async getSimilarList() {
        this.resultList = await search.getSimilar({
          wd: this.searchStr
        });
      },
      clear() {
        this.valueTimeout && clearTimeout(this.valueTimeout);
        this.valueTimeout = null;
      },
      close() {
        this.$emit("search-open", false);
      },
      clearDropList() {
        this.tokenList = [];
        this.superNodeList = [];
        this.accountList = [];
      },
      async ensureSearch() {
        if (!this.searchStr) {
          this.$message(this.$t("utils.noEmpty"));
          return;
        }
        await this.getSimilarList();
        if (this.resultList && this.resultList.length === 1 ) {
          let searchTypeInt = this.resultList[0].searchTypeInt;
          let fullWord = this.resultList[0].fullWord;
          let wd = this.resultList[0].wd;
          if (wd === fullWord) {
            this.jumpSwitch(searchTypeInt, fullWord);
          }
        } else {
          if(this.resultList && !this.resultList.length) {
            this.jumpTo("searchError");
          }
          
        }
        this.showDroplist();
      },
      jumpSwitch(type, params) {
        switch(type) {
        case 1: this.jumpTo("account", params); break;
        case 2: this.jumpTo("transaction", params); break;
        case 3: this.jumpTo("block", params); break;
        case 4: 
        case 5: 
        case 6: this.jumpTo("token", params); break;
        case 7: this.jumpTo("SBPDetail", params); break;
        }
      },
      showDroplist() {
        this.clearDropList();
        if (this.resultList && this.resultList.length) {
          for(let i = 0; i < this.resultList.length; i++) {
            // if (this.resultList.length === 1 && i.wd === i.fullWord) {
            //   return;
            // }
            if (this.resultList[i].searchTypeInt === 1) {
              this.accountList.push(this.resultList[i]);
            }
            if ([5, 6].indexOf(this.resultList[i].searchTypeInt) > -1) {
              this.tokenList.push(this.resultList[i]);
            }
            if (this.resultList[i].searchTypeInt === 7) {
              this.superNodeList.push(this.resultList[i]);
            }
          }
        } 
        
      },
      jumpTo(pageStr, params) {
        let path = params ? `${this.langStrPath}/${pageStr}/${params}` : `${this.langStrPath}/${pageStr}`;
        this.$router.push({ path });
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
.phone-info {
  margin-top: 0px; 
  @include mobile {
    margin-top: -64px;
  }
}

.drop-list-content {
  position: relative;
  z-index: 99999;
  background-color: white;
  max-height: 218px;
  max-width: 300px;
  text-overflow: ellipsis;
  overflow-y: scroll;
  box-shadow:0px 6px 36px 0px rgba(0,62,100,0.04);
  border-radius:0px 0px 4px 4px;
  border:1px solid rgba(229,237,243,1);
  font-size: 12px;
  color:rgba(94,104,117,1);
  a {
      color:rgba(94,104,117,1);
  }
  .drop-list-title {
    background:rgba(24,91,221,0.03);
    height: 20px;
    line-height: 20px;
    padding: 0 12px;
    font-weight:600;
  }
  .icon-wrapper {
    width: 15px;
    margin-right: 4px;
    height:15px;
    border-radius:24px;
    border:1px solid rgba(229,237,243,1);
  }
  .item-wrapper {
    box-sizing: border-box;
    line-height: 16px;
    padding: 6px 12px;
    &:hover {
      background:rgba(245,247,250,1);
      cursor: pointer;
    }
    .item-fullword {
      color: #8D9BAE;
      font-size: 11px;
    }
    
  }
}
.phone-close {
  display: none;
}

.search-container {
  position: relative;
  .search-input {
    width: 300px;
    height: 62px;
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
    font-size: 12px;
    padding-left: 20px; 
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
@include mobile {
  .phone-close {
    display: block;
    background: #fff;
    width: 46px;
    height: 64px;
    line-height: 64px;
    padding-left: 0px;
    box-sizing: border-box;
    &:hover {
      cursor: pointer;
    }
  }
  .whole-search {
    display: block;
    width: 100%;
  }
  .invisible {
    display: none;
  }
  .search-container {
    .search-input {
      height: 64px;
      box-sizing: border-box;
      overflow: hidden; 
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .img-wrapper {
      left: 268px;
    }
  }
}
</style>
