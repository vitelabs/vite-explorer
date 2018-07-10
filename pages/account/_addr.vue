<template>
  <div class="account-container">
    <div v-if="!error">
      <detail-layout 
        :title="`${title}: ${accountDetail.accountAddress}`"
        :list="accountList"
        :clickLab="clickLab">
      </detail-layout>

      <detail-layout v-if="subTitle"
        :title="subTitle"
        :list="tokenDetailList">
      </detail-layout>

      <el-tabs v-if="tokenList.length" class="tab-wrapper" v-model="activeTab" type="card">
        <el-tab-pane class="tab-pane" label="交易列表" name="transList">
          <trans-list
            :tokenId="activeToken.token ? activeToken.token.id : ''"
            :accountAddress="accountDetail.accountAddress">
          </trans-list>
        </el-tab-pane>
      </el-tabs>
    </div>
    <error v-else :error="error"></error>
  </div>
</template>

<script>  
  import detailLayout from "~/components/detailLayout";
  import error from "~/components/error";
  import transList from "~/components/transList.vue";
  import account from "~/services/account.js";

  export default {
    head() {
      return {
        title: this.title
      };
    },
    components: {
      detailLayout, error, transList
    },
    validate({ params }) {
      return params.addr;
    },
    async asyncData({ params }) {
      try {
        let accountDetail = await account.getDetail({
          accountAddress: params.addr
        });
        let tokenList = accountDetail.tokenList || [];
        return {
          accountDetail,
          tokenList
        };
      } catch(err) {
        return {
          error: err.msg || "get account fail"
        };
      }
    },
    data() {
      return {
        title: "账户详情",
        activeTab: "transList",
        error: "",
        accountDetail: {},
        tokenList: [],
        activeTokenIndex: 0
      };
    },
    computed: {
      activeToken() {
        return this.tokenList.length ? this.tokenList[this.activeTokenIndex] : null;
      }, 
      accountList() {
        let tokenNameList = [];
        this.tokenList.forEach((tokenDetail) => {
          if (tokenDetail.token) {
            tokenNameList.push(tokenDetail.token.name);
          }
        });

        return [{
          name: "账户Hash",
          describe: this.accountDetail.accountAddress
        },{
          name: "账户持有代币种类",
          describe: tokenNameList.length
        },{
          name: "账户持有代币",
          list: tokenNameList
        }];
      },
      subTitle() {
        return `代币: ${this.activeToken && this.activeToken.token ? this.activeToken.token.name : ""}`;
      },
      tokenDetailList() {
        let tokenDetail = this.tokenList.length ? this.tokenList[this.activeTokenIndex] : null;
        if (!tokenDetail) {
          return [];
        }

        return [{
          name: "余额数量",
          describe: tokenDetail.balance || 0
        }, {
          name: "余额价值",
          describe: "----"
        }, {
          name: "交易次数",
          describe: tokenDetail.token && tokenDetail.token.transactionNumber
        }, {
          name: "所有代币估值",
          describe: "----"
        }];
      }
    },
    methods: {
      clickLab(lab, index) {
        this.activeTokenIndex = index;
      }
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  .tab-wrapper {
    margin-top: 20px;
  }
</style>
