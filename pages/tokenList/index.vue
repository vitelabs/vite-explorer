<template>
  <div class="token-list-container">
    <div v-if="!error">
      <page-header :title="title"></page-header>
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

  const pageSize = 10;

  export default {
    head() {
      return {
        title: this.title
      };
    },
    components: {
      pageHeader, pageTable, error
    },
    async asyncData(ctx) {
      const pageIndex = 0;
      if (ctx.query.filter) {
        try {
          let data = await search.judgeTokenName({ str: ctx.query.filter });
          console.log(data);
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
        return {
          pageIndex,
          tokenList,
          totalNumber
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
        totalNumber: 0
      };
    },
    computed: {
      tokenTableTitle() {
        return this.$t("tokenList.cut1")+`${this.tokenList && this.tokenList.length || 0}`+ this.$t("tokenList.cut2");
      },
      tokenData() {
        let list = [];
        this.tokenList && this.tokenList.forEach(token => {
          list.push({
            token: `<a href="/token/${token.id}">${token.name} (${token.symbol})</a>`
          });
        });
        return list;
      }
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  .token-table {
    padding-top: 20px;
  }
</style>
