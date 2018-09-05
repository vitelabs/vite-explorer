<template>
  <div class="account-container">
    <div v-if="!error">
      <detail-layout
        :title="`${title}`"
        :list="accountList"
        :clickLab="clickLab"
        :is-account="true"
        :extral-list="tokenDetailList"
        @getAccountAddr="getAccInputInfo">
        <template slot="footer-tab-content">
          <div class="tab-wrapper">
            <div class="tab-content is-active">{{$t('transList.label')}}</div>
          </div>
        </template>
      </detail-layout>
      
      <trans-list
        :tokenId="activeToken ? activeToken.token.id : ''"
        :accountAddress="accountDetail.accountAddress"
        :sub-title="subTitle"
        :page-size="20"
        :need-filter="true"
        :sort-items="['confirmTimes', 'amount']"
        :filter-accout-addr="filterAccObj"
        @totalNumber="getTotalNumber">
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
  import { handleBigNum } from "../../utils/util.js";

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
        paths: this.$route.path.split("/"),
        title: this.$t("account.title"),
        activeTab: "transList",
        error: "",
        accountDetail: {},
        tokenList: [],
        activeTokenIndex: 0,
        filterAccObj: null,
        totalNumber: 0
      };
    },
    created() {
      this.accountDetail.accountAddress = this.paths[this.paths.length - 1];
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
          name: this.$t("account.accType"),
          describe: tokenNameList.length
        }, {
          name: this.$t("account.accToken"),
          list: tokenNameList
        }];
      },
      tokenDetailList() {
        let tokenDetail = this.tokenList.length ? this.tokenList[this.activeTokenIndex] : null;
        if (!tokenDetail) {
          return [{
            name: this.$t("account.tNum"),
            describe: "--"
          }, {
            name: this.$t("account.bAmount"),
            describe: "--"
          }];
        }

        return [{
          name: this.$t("account.tNum"),
          describe: this.totalNumber
        }, {
          name: this.$t("account.bAmount"),
          describe: handleBigNum(tokenDetail.balance, true) || "--"
        }];
      }
    },
    methods: {
      clickLab(lab, index) {
        this.activeTokenIndex = index;
      },
      getAccInputInfo(accObj) {
        this.filterAccObj = accObj;
      },
      getTotalNumber(num) {
        this.totalNumber = num;
      }
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>

</style>
