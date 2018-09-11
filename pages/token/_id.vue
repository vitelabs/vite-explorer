<template>
  <div class="token-container">
    <div v-if="!error">
      <detail-layout
        :title="`${title}`"
        :list="list"
        :is-token="true">
        <template slot="header-content">
          <div class="header-container">
            <img :src="tokenDetail.icon" width="60" height="60"/>
            <div class="header-detail">
              <div class="name">{{ tokenDetail.name }}</div>
              <div class="introduction">{{ tokenDetail.introduction }}</div>
            </div>
          </div>
        </template>
        <template slot="footer-tab-content">
          <div class="tab-wrapper">
            <div class="tab-content" :class="{'is-active': tabParams === 'tx'}" @click="clickTab('tx')">{{$t('token.tLabel')}}</div>
            <div class="tab-content" :class="{'is-active': tabParams === 'account'}" @click="clickTab('account')">{{$t('token.aLabel')}}</div>
          </div>
        </template>
      </detail-layout>


      <trans-list v-if="tabParams === 'tx'"
        :tokenTitle="false"
        :tokenId="tokenDetail.id"
        :page-size="20"
        :sub-title="subTitle"
        @totalNumber="getTotalNumber">
      </trans-list>
      <div class="account-content" v-if="tabParams === 'account'" >
        <nuxt-link :to="`${locales}/tokenAccount/${tokenDetail.id}?tokenName=${tokenDetail.name}`" target="_blank" class="profile-link">
          <div class="hold-button"><img src="~assets/images/pie.svg"/><span>{{$t('token.charts')}}</span></div>
        </nuxt-link>
        <account-list
          :table-titles="$t('accTitles').concat($t('addedAccTitles'))"
          :pagination="true"
          :tokenId="tokenDetail.id"
          :need-sort="true">
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
        tabParams: "tx",
        totalNumber: 0
      };
    },
    computed: {
      subTitle() {
        return this.$t("transList.title");
      },
      showTokenDetail() {
        return {
          symbol: this.tokenDetail.symbol,
          accountNum: `${this.tokenDetail.accountNum}`,
          totalSupply: this.tokenDetail.totalSupply,
          transactionNumber: this.totalNumber,
          owner: this.tokenDetail.owner,
          decimals: this.tokenDetail.decimals,
        };
      },
      list() {
        const tokenDetailMap = this.$t("tokenDetailMap");
        let list = [];
        for (let key in tokenDetailMap) {
          list.push({
            key: key,
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
      getTotalNumber(num) {
        this.totalNumber = num;
      }
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
@import "assets/css/vars.scss";
.header-container {
  border-bottom: 1px solid #E5EDF3;
  margin-bottom: 23px;
  box-sizing: border-box;
  padding: 0 32px 28px 32px;
  display: flex;
  display: -webkit-flex;
  .header-detail {
    margin-left: 24px;
    .name {
      font-size: 16px;
      color: #3F3F3F;
      line-height: 22px;
      font-weight: 500;
    }
    .introduction {
      margin-top: 12px;
      font-size: 14px;
      color: #5E6875;
      line-height: 22px;
    }
  }

}
.account-content {
  clear: both;
  padding-top: 20px;
  .hold-button {
    width: 158px;
    height: 32px;
    background: #E6EEFF;
    border: 1px solid $common-color;
    border-radius: 4px;
    font-size: 14px;
    color: $common-color;
    letter-spacing: 0;
    line-height: 22px;
    box-sizing: border-box;
    padding: 5px 12px;
    img {
      margin-right: 6px;
      vertical-align: text-top;
    }
  }
}
</style>
