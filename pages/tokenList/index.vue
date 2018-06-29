<template>
  <div class="token-list-container">
    <page-header :title="title"></page-header>
    <page-tabel class="token-tabel" :pagination="false" :showOrder="true"
        :title="tokenTabelTitle" 
        :tabelTitles="tokenTitles"
        :tabelData="tokenData">
    </page-tabel>
  </div>
</template>

<script>
  import pageHeader from "~/components/pageHeader.vue";
  import pageTabel from "~/components/pageTabel";

  export default {
    head() {
      return {
        title: this.title
      };
    },
    components: {
      pageHeader, pageTabel
    },
    data() {
      return {
        title: "Token列表",
        tokenTabelTitle: "总计有42种token",
        tokenTitles: [{
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
        }],
        tokenData: [{
          icon: "dsjdlsjdlsds",
          token: "Vite",
          price: 798,
          upDown: "sdjlsjdsl",
          transPrice: 2323232323,
          famc: 90980890
        },{
          icon: "dsjdlsjdlsds",
          token: "Vite",
          price: 798,
          upDown: "sdjlsjdsl",
          transPrice: 2323232323,
          famc: 90980890
        },{
          icon: "dsjdlsjdlsds",
          token: "Vite",
          price: 798,
          upDown: "sdjlsjdsl",
          transPrice: 2323232323,
          famc: 90980890
        },{
          icon: "dsjdlsjdlsds",
          token: "Vite",
          price: 798,
          upDown: "sdjlsjdsl",
          transPrice: 2323232323,
          famc: 90980890
        },{
          icon: "dsjdlsjdlsds",
          token: "Vite",
          price: 798,
          upDown: "sdjlsjdsl",
          transPrice: 2323232323,
          famc: 90980890
        },{
          icon: "dsjdlsjdlsds",
          token: "Vite",
          price: 798,
          upDown: "sdjlsjdsl",
          transPrice: 2323232323,
          famc: 90980890
        },{
          icon: "dsjdlsjdlsds",
          token: "Vite",
          price: 798,
          upDown: "sdjlsjdsl",
          transPrice: 2323232323,
          famc: 90980890
        }]
      };
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  .token-tabel {
    padding-top: 20px; 
  }
</style>
