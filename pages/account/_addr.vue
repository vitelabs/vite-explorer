<template>
  <div class="account-container">
    <div v-if="!error">
      <detail-layout
        :title="`${title}`"
        :list="accountList"
        :clickLab="clickLab"
        :is-account="true"
        :extral-list="tokenDetailList"
        @getAccountAddr="getAccInputInfo"
        @changeTab="changeTab">
        <template slot="footer-tab-content">
          <div class="tab-wrapper">
            <div class="tab-content" :class="{'is-active': tabParams === 'tx'}" @click="clickTab('tx')">{{$t('transList.label')}}</div>
            <div class="tab-content" 
                 :class="{'is-active': tabParams === 'block'}" 
                 @click="clickTab('block')"
                 v-if="this.isSBP">
                 {{$t('SBP.label')}}
            </div>
          </div>
        </template>
      </detail-layout>

      <trans-list v-if="tabParams === 'tx'"
        :tokenId="activeToken ? activeToken.token.id : null"
        :accountAddress="accountDetail.accountAddress"
        :page-size="20"
        :need-filter="true"
        :sort-items="['timestamp', 'amount']"
        :default-sort="{ prop: 'timestamp', order: 'descending' }"
        :filter-accout-addr="filterAccObj"
        @totalNumber="getTotalNumber">
      </trans-list>
      <block-list v-if="this.isSBP && tabParams === 'block'"
        :has-title="false"
        :isSBP="this.isSBP"
        :producer-address="this.accountDetail.accountAddress">
      </block-list>
    </div>
    <error v-else :error="error"></error>
  </div>
</template>

<script>
  import detailLayout from "~/components/detailLayout";
  import error from "~/components/error";
  import transList from "~/components/transList.vue";
  import blockList from "~/components/blockList.vue";
  import account from "~/services/account.js";
  import node from "~/services/superNode.js";
  import { handleBigNum } from "../../utils/util.js";

  export default {
    head() {
      return {
        title: this.title
      };
    },
    components: {
      detailLayout, error, transList, blockList
    },
    validate({ params }) {
      return params.addr;
    },
    async asyncData({ params }) {
      try {
        let accountDetail = await account.getDetail({
          accountAddress: params.addr
        });
        let tokenList = accountDetail.tokenList ? [{token: {symbol: "ALL", id: null}}].concat(accountDetail.tokenList) : [{token: {symbol: "ALL", id: null}}];

        let superNodeDetail = await node.getDetail({
          producerAddress: params.addr
        });
        let isSBP = superNodeDetail.sbpType ? true : false;
        return {
          accountDetail,
          tokenList,
          superNodeDetail,
          isSBP
        };
      } catch(err) {
        return {
          error: err.msg || "get account || superNodeDetail failed"
        };
      }
    },
    data() {
      return {
        paths: this.$route.path.split("/"),
        title: this.$t("account.title"),
        error: "",
        accountDetail: {},
        tokenList: [],
        activeTokenIndex: 0,
        filterAccObj: null,
        totalNumber: 0,
        tabParams: "tx"
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
        return this.tokenList && this.tokenList.length ? this.tokenList[this.activeTokenIndex] : null;
      },
      accountList() {
        let tokenNameList = [];
        this.tokenList && this.tokenList.forEach((tokenDetail) => {
          if (tokenDetail.token) {
            let name = tokenDetail.token.symbol;
            tokenNameList.push(name);
          }
        });
        return [{
          key: "address",
          sbpType: this.superNodeDetail.sbpType,
          iconList: this.superNodeDetail.sbpType === 1 ? [require("~/assets/images/sbp2.svg")] : [require("~/assets/images/sbp.svg")],
          name: this.$t("account.accHash"),
          describe: this.accountDetail.accountAddress
        }, {
          name: this.$t("account.accType"),
          describe: tokenNameList.length ? tokenNameList.length - 1 : 0
        }, {
          name: this.$t("account.accToken"),
          list: tokenNameList
        }];
      },
      tokenDetailList() {
        let tokenDetail = this.tokenList && this.tokenList.length ? this.tokenList[this.activeTokenIndex] : null;

        if (!tokenDetail) {
          return [{
            name: this.$t("account.tNum"),
            describe: "--"
          }, {
            name: this.$t("account.bAmount"),
            describe: "--"
          }];
        }
        let SBP = this.isSBP  ? [
        // {
        //   name: this.$t("account.blockPercent"),
        //   describe: this.superNodeDetail.totalSNBPercent
        // }, 
        // {
        //   name: this.$t("account.blockAward"),
        //   describe: this.superNodeDetail.totalSNBAward,
        //   innerLink: true
        // }
        ] : [];

        return SBP.concat([
        // {
        //   name: this.$t("account.quota"),
        //   describe: this.superNodeDetail.quota
        // },
          {
            name: this.$t("account.tNum"),
            describe: this.totalNumber
          }]).concat(tokenDetail.token && tokenDetail.token.id ? [{
          name: this.$t("account.bAmount"),
          describe: handleBigNum(tokenDetail.balance, tokenDetail.token && tokenDetail.token.decimals || 0, true) || "--"
        }] : []);
      }
    },
    methods: {
      changeTab(tabName) {
        this.tabParams = tabName;
      },
      clickTab(str) {
        this.tabParams = str;
      },
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
