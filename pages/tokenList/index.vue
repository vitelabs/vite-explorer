<template>
  <div class="token-list-container">
    <div v-if="!error">
      <page-header :title="title"></page-header>
      <page-table class="token-table" :pagination="false" :showOrder="true"
        :loading="loading"
        :title="tokenTableTitle"
        :tableTitles="tokenTitles"
        :tableData="tokenData">
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
    async asyncData() {
      const pageIndex = 0;

      try {
        let { tokenList } = await token.getList({
          pageIndex, pageSize
        });
        console.log("tokenList", tokenList);
        return {
          pageIndex,
          tokenList
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
        loading: false
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
            token: `<a href="/token/${token.id}}">${token.name} (${token.symbol})</a>`
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
