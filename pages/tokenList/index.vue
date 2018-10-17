<template>
  <div class="token-list-container">
    <div v-if="!error">
      <page-table class="token-table" :pagination="false" :showOrder="true"
        :loading="loading"
        :title="tokenTableTitle"
        :tableTitles="tokenTitles"
        :tableData="tokenData"
        :total="totalNumber">
      </page-table>
    </div>
    <error v-else :error="error"></error>
  </div>
</template>

<script>
  import pageHeader from "~/components/pageHeader.vue";
  import pageTable from "~/components/pageTable";
  import error from "~/components/error";
  import token from "~/services/token.js";
  import search from "~/services/search.js";
  import general from "~/services/general.js";

  const pageSize = 20;

  export default {
    head() {
      return {
        title: this.title,
      };
    },
    components: {
      pageHeader, pageTable, error
    },
    async asyncData(ctx) {
      const pageIndex = 1;
      if (ctx.query.filter) {
        try {
          let data = await search.judgeTokenName({ str: ctx.query.filter });
          return {
            pageIndex,
            tokenList: data
          };
        } catch(err) {
          return {
            error: err.msg || "get filter tokenList fail"
          };
        }
      }
      
      try {
        let { tokenList, totalNumber} = await token.getList({
          pageIndex, pageSize
        });
        let generalDetail = await general.getGeneralMarket();
        return {
          pageIndex,
          tokenList,
          totalNumber: +totalNumber,
          generalDetail
        };
      } catch(err) {
        return {
          error: err.msg || "get tokenList fail"
        };
      }
    },
    data() {
      return {
        title: this.$t("tokenList.title"),
        tokenList: [],
        tokenTitles: this.$t("tokenTitles"),
        error: "",
        loading: false,
        totalNumber: 0,
        generalDetail: {}
      };
    },
    computed: {
      tokenTableTitle() {
        return this.$t("tokenList.total")+`${this.tokenList && this.tokenList.length || 0}`;
      },
      tokenData() {
        let list = [];
        this.tokenList && this.tokenList.forEach(token => {
          let lang = "";
          this.$i18n.locale !== "en" ? lang = `/${this.$i18n.locale}` : lang = "";
          let externalTokenInfo = {};
          if (token.symbol === "VITE") {
            externalTokenInfo = {
              price: `$${this.generalDetail.cirPrice}`,
              upDown: `${this.generalDetail.percent_change_24h}%`,
              transPrice: `$${this.generalDetail.volume_24h}`,
              famc: `$${this.generalDetail.ffmCap}`
            };
          }
          list.push(Object.assign({
            icon: `<img src="${token.icon || ""}" width="25" height="25"/>`,
            token: `<a href="${lang}/token/${token.id}" target="_blank">${token.name} (${token.symbol})</a><div style="white-space:normal;">${token.introduction || ""}</div>`,
          }, externalTokenInfo));
        });
        return list;
      }
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
.introduction {
   word-wrap: break-word; 
}
</style>
