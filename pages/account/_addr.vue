<template>
  <div class="account-container">
    <div v-if="!error">
      <detail-layout
        :title="`${title}`"
        :list="accountList"
        :clickLab="clickLab"
        :is-account="true"
        :extral-list="tokenDetailList">
      </detail-layout>

      <div class="tab-wrapper">
        <div class="tab-content is-active">{{$t('transList.label')}}</div>
      </div>
      <trans-list
        :tokenId="activeToken.token ? activeToken.token.id : ''"
        :accountAddress="accountDetail.accountAddress"
        :sub-title="subTitle"
        :page-size="6"
        >
      </trans-list>
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
      subTitle() {
        return this.$t("transList.title");
      },
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
        }, {
          name: this.$t("account.accToken"),
          list: tokenNameList
        }];
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
          describe: "--"
        }, {
          name: this.$t("account.tNum"),
          describe: tokenDetail.token.transactionNumber
        }, {
          name: this.$t("account.allToken"),
          describe: "--"
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

</style>
