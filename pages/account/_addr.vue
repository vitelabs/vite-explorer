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
        <el-tab-pane class="tab-pane" :label="$t('transList.label')" name="transList">
          <trans-list
            :tokenId="activeToken.token ? activeToken.token.id : ''"
            :accountAddress="accountDetail.accountAddress"
            >
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
        title: this.$t("account.title"),
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
          name: this.$t("account.accHash"),
          describe: this.accountDetail.accountAddress
        },{
          name: this.$t("account.accType"),
          describe: tokenNameList.length
        },{
          name: this.$t("account.accToken"),
          list: tokenNameList
        }];
      },
      subTitle() {
        return this.$t("account.token")+`: ${this.activeToken ? this.activeToken.token.name : ""}`;
      },
      tokenDetailList() {
        let tokenDetail = this.tokenList.length ? this.tokenList[this.activeTokenIndex] : null;
        if (!tokenDetail) {
          return [];
        }

        return [{
          name: this.$t("account.bAmount"),
          describe: tokenDetail.balance || 0
        }, {
          name: this.$t("account.bValue"),
          describe: "----"
        }, {
          name: this.$t("account.tNum"),
          describe: tokenDetail.token.transactionNumber
        }, {
          name: this.$t("account.allToken"),
          describe: "----"
        }];
      }
    },
    methods: {
      clickLab(lab, index) {
        this.activeTokenIndex = index;
      },
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  .tab-wrapper {
    margin-top: 20px;
  }
</style>
