<template>
  <div class="dapp-list-container">
    <div v-if="!error">
      <page-table class="dapp-table" :pagination="true" :showOrder="true"
        :loading="loading"
        :title="dappTableTitle"
        :tableTitles="DappTitles"
        :tableData="dappData"
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
  import dapp from "~/services/dapp.js";

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
    async asyncData() {
      const pageIndex = 1;
      try {
        let { DappList, totalNumber} = await dapp.getList({
          pageIndex, pageSize
        });
        return {
          pageIndex,
          DappList,
          totalNumber: +totalNumber
        };
      } catch(err) {
        return {
          error: err.msg || "get DappList fail"
        };
      }
    },
    data() {
      return {
        title: this.$t("Dapps.title"),
        DappList: [],
        DappTitles: this.$t("DappTitles"),
        error: "",
        loading: false,
        totalNumber: 0,
      };
    },
    computed: {
      lang() {
        return this.$i18n.locale !== "en" ? `/${this.$i18n.locale}` : "";
      },
      dappTableTitle() {
        return this.$t("Dapps.total")+`${this.totalNumber || 0}`;
      },
      dappData() {
        let list = [];

        this.DappList && this.DappList.forEach(dapp => {
          list.push({
            ...dapp,
            address: `<a href="${this.lang}/account/${dapp.address}" target="_blank" title="${dapp.address}">${dapp.shortAddress}</a>`,
            codeStatus: dapp.codeStatus ? 
              `<div class="is-flex"><div class="img-wrapper"><img src="${require("~/assets/images/code/verified.svg")}" class="veri-img"/></div>已审计</div>` 
              : `<div class="is-flex"><div class="img-wrapper"><img src="${require("~/assets/images/code/unverified.svg")}" class="veri-img"/></div>未审计</div>` ,
          });
        });
        return list;
      }
    },
    methods: {
      async pageChange(currentInx = 1) {
        let { DappList, totalNumber} = await dapp.getList({
          pageIndex: currentInx, 
          pageSize
        });
        this.DappList = DappList;
        this.totalNumber = +totalNumber;
      }
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss">
.dapp-list-container {
  .img-wrapper {
    display: flex;
    display: -webkit-flex;
    align-items: center;
    .veri-img {
      width: 16px;
      height: 16px;
      margin-right: 4px;
    }
  }
  
}

</style>
