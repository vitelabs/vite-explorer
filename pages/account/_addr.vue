<template>
  <div class="account-container">
    <div v-if="!error">
      <detail-layout
        :title="`${title}`"
        :list="accountList"
        :clickLab="clickLab"
        :is-account="true"
        :extral-list="tokenDetailList"
        @changeTab="changeTab">
        <template slot="external-item">
          <filter-address @getAccountAddr="getAccInputInfo"></filter-address>
        </template>
        <template slot="footer-tab-content">
          <div class="tab-wrapper">
            <div class="tab-content" :class="{'is-active': tabParams === 'tx'}" @click="clickTab('tx')">{{$t('transList.label')}}</div>
            <div class="tab-content" 
                 :class="{'is-active': tabParams === 'onroad'}" 
                 @click="clickTab('onroad')">
                 {{ $t('onroad.label') }}
            </div>
            <div class="tab-content" 
                 :class="{'is-active': tabParams === 'block'}" 
                 @click="clickTab('block')"
                 v-if="this.isSBP">
                 {{ $t('SBP.label') }}
            </div>
            <div class="tab-content" 
                 :class="{'is-active': tabParams === 'contract'}" 
                 @click="clickTab('contract')">
                 {{ $t('contract.label') }}
            </div>
          </div>
        </template>
      </detail-layout>

      <trans-list v-if="tabParams === 'tx' || tabParams === 'onroad'"
        :tokenId="activeToken ? activeToken.token.id : null"
        :accountAddress="accountDetail.accountAddress"
        :page-size="20"
        :on-road="tabParams === 'onroad'"
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
  import filterAddress from "~/components/filterAddress.vue";

  export default {
    head() {
      return {
        title: this.title
      };
    },
    components: {
      detailLayout, filterAddress, error, transList, blockList
    },
    validate({ params }) {
      return params.addr;
    },
    async asyncData(ctx) {
      try {
        let accountDetail = await account.getDetail({
          accountAddress: ctx.params.addr
        });
        let tokenList = accountDetail.tokenList ? [{token: {symbol: "ALL", id: null}}].concat(accountDetail.tokenList) : [{token: {symbol: "ALL", id: null}}];

        let superNodeDetail = await node.getDetail({
          producerAddress: ctx.params.addr
        });
        let isSBP = (superNodeDetail.sbpType === 1 || superNodeDetail.sbpType === 2) ? true : false;
        let tabParams = "tx";
        if (isSBP && ctx.query.showBlockList === "true") {
          tabParams = "block";
        }
        return {
          accountDetail,
          tokenList,
          superNodeDetail,
          isSBP,
          tabParams
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
          iconList: this.iconListMap(this.superNodeDetail.sbpType),
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
        }, {
          name: this.$t("account.balanceOnroad"),
          describe: tokenDetail.balanceOnroad,
          innerLink: "onroad"
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
        this.tabParams = "tx";
        this.activeTokenIndex = index;
      },
      getAccInputInfo(accObj) {
        this.filterAccObj = accObj;
      },
      getTotalNumber(num) {
        if (this.tabParams === "tx") {
          this.totalNumber = num;
        }
      },
      iconListMap(sbpType) {
        let lang = "";
        lang = this.$i18n.locale !== "en" ? `/${this.$i18n.locale}` : "";
        let map = {
          0: [],
          1: [{
            key: 1,
            icon: require("~/assets/images/sbp2.svg"),
            link: `${lang}/SBPDetail/${this.superNodeDetail.nodeName}`
          }],
          2: [{
            key: 2,
            icon: require("~/assets/images/sbp.svg"),
            link: `${lang}/SBPDetail/${this.superNodeDetail.nodeName}`
          }],
          3: [{
            key: 3,
            icon: require("~/assets/images/bank.svg"),
          }],
          10: [{ 
            key: 10,
            icon: require("~/assets/images/register.svg") 
          }],
          11: [{
            key: 11,
            icon: require("~/assets/images/vote.svg") 
          }],
          12: [{
            key: 12,
            icon: require("~/assets/images/quota.svg")
          }],
          14: [ {
            key: 14,
            icon: require("~/assets/images/coin.svg")
          }]
        };
        return map[sbpType];
      }
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
</style>
