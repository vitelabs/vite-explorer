<template>
  <div class="token-container">
    <div v-if="!error">
      <detail-layout
        :title="`${title}: ${tokenDetail.name}`"
        :list="list"
        :is-token="true">
      </detail-layout>

      <div class="tab-wrapper">
        <div class="tab-content" :class="{'is-active': tabParams === 'tx'}" @click="clickTab('tx')">{{$t('token.tLabel')}}</div>
        <div class="tab-content" :class="{'is-active': tabParams === 'account'}" @click="clickTab('account')">账户列表</div>
      </div>
      <trans-list v-if="tabParams === 'tx'"
        :tokenTitle="false"
        :tokenId="tokenDetail.id"
        :page-size="20"
        :sub-title="subTitle">
      </trans-list>
      <div class="account-content" v-if="tabParams === 'account'" >
        <nuxt-link :to="`${locales}/tokenAccount/a`" target="_blank" class="profile-link">
          <el-button>持有账户图表</el-button>
        </nuxt-link>
        <account-list 
          :sub-title="subAccountTitle">
        </account-list>
      </div>
    </div>
    <error v-else :error="error"></error>
  </div>
</template>

<script>
  import detailLayout from "~/components/detailLayout";
  import error from "~/components/error";
  import transList from "~/components/transList.vue";
  import accountList from "~/components/Token/accountList.vue";

  import token from "~/services/token.js";
  import general from "~/services/general.js";

  export default {
    head() {
      return {
        title: this.title
      };
    },
    components: {
      detailLayout, error, transList, accountList
    },
    validate ({ params }) {
      return params.id;
    },
    async asyncData({ params }) {
      try {
        let data = await token.getDetail({
          tokenId: params.id
        });
        let generalDetail = await general.getGeneralDetail();
        return {
          tokenDetail: data.tokenList[0],
          generalDetail
        };
      } catch(err) {
        return {
          error: err.msg || "get token fail"
        };
      }
    },
    data() {
      return {
        locales: this.$i18n.locale === "en" ? "" : "/" + this.$i18n.locale,
        title: this.$t("head.tTitle"),
        tokenDetail: {},
        error: "",
        activeTab: "transList",
        generalDetail: {},
        tabParams: "tx"
      };
    },
    computed: {
      subTitle() {
        return this.$t("transList.title");
      },
      subAccountTitle() {
        return "总账户数：22";
      },
      showTokenDetail() {
        return {
          symbol: this.tokenDetail.symbol,  // 简介
          accountNum: `${this.tokenDetail.accountNum}`, // 所有者数量
          totalSupply: this.tokenDetail.totalSupply, // 铸币总量
          transactionNumber: this.tokenDetail.transactionNumber, // 交易笔数
          owner: this.tokenDetail.owner,   // 铸币地址
          decimals: this.tokenDetail.decimals, // 小数位数
        };
      },
      list() {
        const tokenDetailMap = this.$t("tokenDetailMap");
        let list = [];
        for (let key in tokenDetailMap) {
          list.push({
            describe: this.showTokenDetail[key] || "--",
            name: tokenDetailMap[key],
            link: key === "owner" ? `${this.locales}/account/${this.showTokenDetail[key]}` : ""
          });
        }
        return list;
      }
    },
    methods: {
      clickTab(str) {
        this.tabParams = str;
      },
      
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
.account-content {
  clear: both;
  padding-top: 20px;
}
</style>
