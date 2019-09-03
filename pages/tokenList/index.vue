<template>
  <div class="token-list-container">
    <div v-if="!error">
      <page-table class="token-table" :pagination="true" :showOrder="true"
        :loading="loading"
        :title="tokenTableTitle"
        :tableTitles="tokenTitles"
        :tableData="tokenData"
        :total="totalNumber"
        :currentChange="pageChange">
      </page-table>
    </div>
    <error v-else :error="error"></error>
  </div>
</template>

<script>
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
      pageTable, error
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
        return this.$t("tokenList.total")+`${this.totalNumber || 0}`;
      },
      tokenData() {
        let list = [];
        this.tokenList && this.tokenList.forEach(token => {
          let lang = "";
          this.$i18n.locale !== "en" ? lang = `/${this.$i18n.locale}` : lang = "";
          let externalTokenInfo = {};
          let percent = this.generalDetail.percent_change_24h;
          if (token.symbol === "VITE") {
            externalTokenInfo = {
              price: `$${this.generalDetail.cirPrice}`,
              upDown: percent == 0 ? `<span>${percent}%</span>` : percent > 0 ? `<span style="color: #00D764; font-weight:600;">+ ${percent}%</span>` : `<span style="color: #E5494D; font-weight:600;">- ${percent}%</span>`,
              transPrice: `$${this.generalDetail.volume_24h}`,
              famc: `$${this.generalDetail.ffmCap}`
            };
          }
          list.push(Object.assign({
            icon: `<img src="${token.icon || ''}" style="width:48px; height:48px; border-radius:24px; border:1px solid rgba(229,237,243,1);"/>`,
            token: `<a href="${lang}/token/${token.id}" target="_blank">${token.name} (${token.indexName})</a><div style="white-space:normal;">${token.introduction || ""}</div>`,
          }, externalTokenInfo));
        });
        return list;
      }
    },
    methods: {
      async pageChange(currentInx = 1) {
        let { tokenList, totalNumber} = await token.getList({
          pageIndex: currentInx, 
          pageSize
        });
        this.tokenList = tokenList;
        this.totalNumber = +totalNumber;
      }
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
.introduction {
   word-wrap: break-word; 
}
</style>
