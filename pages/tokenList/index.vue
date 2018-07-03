<template>
  <div class="token-list-container">
    <div v-if="!error">
      <page-header :title="title"></page-header>
      <page-tabel class="token-tabel" :pagination="false" :showOrder="true"
          :title="tokenTabelTitle" 
          :tabelTitles="tokenTitles"
          :tabelData="tokenData">
      </page-tabel>
    </div>
    <error v-else :error="error"></error>
  </div>
</template>

<script>
  import pageHeader from "~/components/pageHeader.vue";
  import pageTabel from "~/components/pageTabel";
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
      pageHeader, pageTabel, error
    },
    async asyncData() {
      const pageIndex = 0;

      try {
        let tokenList = await token.getList({
          pageIndex, pageSize
        });
        return {
          pageIndex,
          tokenList
        };
      } catch(err) {
        return {
          error: err.msg || "get account fail"
        };
      }
    },
    data() {
      return {
        title: "Token列表",
        tokenList: [],
        error: ""
      };
    },
    computed: {
      tokenTabelTitle() {
        return `总计有${this.tokenList.length}种token`;
      },
      tokenTitles() {
        return [{
          prop: "icon",
          name: "图标"
        }, {
          prop: "token",
          name: "Token"
        }, {
          prop: "price",
          name: "价格"
        }, {
          prop: "upDown",
          name: "涨跌"
        }, {
          prop: "transPrice",
          name: "交易金额"
        }, {
          prop: "famc",
          name: "流通市值"
        }];
      },
      tokenData() {
        let list = [];
        this.tokenList.forEach(token => {
          list.push({
            icon: "----",
            token: `<a href="/token/${token.name}}">${token.name} (${token.symbol})</a><br/>${token.introduction}`,
            price: "----",
            upDown: "----",
            transPrice: "----",
            famc: "----"
          });
        });
        return list;
      }
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  .token-tabel {
    padding-top: 20px; 
  }
</style>
