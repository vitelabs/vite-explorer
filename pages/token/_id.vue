<template>
  <div class="token-container">
    <div v-if="!error">
      <detail-layout
        :title="`${title}: ${tokenDetail.name}`"
        :list="list">
      </detail-layout>

      <el-tabs class="tab-wrapper" v-model="activeTab" type="card">
        <el-tab-pane class="tab-pane" :label="$t('token.tLabel')" name="transList">
          <trans-list :tokenTitle="false" :pagination="false"
            :tokenId="tokenDetail.id">
          </trans-list>
        </el-tab-pane>

        <el-tab-pane class="tab-pane" :label="$t('token.aLabel')" name="accountList">
          <account-list></account-list>
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
  import accountList from "~/components/Token/accountList.vue";

  import token from "~/services/token.js";

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
        return {
          tokenDetail: data.tokenList[0]
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
        activeTab: "transList"
      };
    },
    computed: {
      showTokenDetail() {
        return {
          owner: this.tokenDetail.owner
        };
      },
      list() {
        const tokenDetailMap = this.$t("tokenDetailMap");
        let list = [];
        for (let key in tokenDetailMap) {
          let lang;
          this.$i18n.locale !== "en" ? lang = `/${this.$i18n.locale}` : lang = "";
          list.push({
            describe: this.showTokenDetail[key] || "----",
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
  .tab-wrapper {
    padding-top: 20px;
    .tab-pane {
      margin-bottom: 0;
    }
  }
</style>
