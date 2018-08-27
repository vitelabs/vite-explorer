<template>
  <div class="token-container">
    <div v-if="!error">
      <detail-layout
        :title="`${title}: ${tokenDetail.name}`"
        :list="list"
        :is-token="true">
      </detail-layout>

      <div class="tab-wrapper">
        <div class="tab-content is-active">{{$t('token.tLabel')}}</div>
      </div>
      <trans-list 
        :tokenTitle="false"
        :tokenId="tokenDetail.id"
        :page-size="20"
        :sub-title="subTitle">
      </trans-list>
      
        <!-- <el-tab-pane class="tab-pane" :label="$t('token.aLabel')" name="accountList">
          <account-list></account-list>
        </el-tab-pane> -->
      <!-- </el-tabs> -->
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
        title: this.$t("head.tTitle"),
        tokenDetail: {},
        error: "",
        activeTab: "transList",
        generalDetail: {}
      };
    },
    computed: {
      subTitle() {
        return this.$t("transList.title");
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
          let lang;
          this.$i18n.locale !== "en" ? lang = `/${this.$i18n.locale}` : lang = "";
          list.push({
            describe: this.showTokenDetail[key] || "--",
            name: tokenDetailMap[key],
            link: key === "owner" ? `${lang}/account/${this.showTokenDetail[key]}` : ""
          });
        }
        return list;
      }
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
</style>
