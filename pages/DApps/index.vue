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
    async asyncData(ctx) {
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
      dappTableTitle() {
        return this.$t("Dapps.total")+`${this.totalNumber || 0}`;
      },
      dappData() {
        let list = [];
        list = this.DappList;
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

<style lang="scss" rel="stylesheet/scss" scoped>
.introduction {
   word-wrap: break-word; 
}
</style>
