<template>
  <div class="token-container">
    <page-tabel v-if="!error"
        :title="'总交易量：---- (仅展示最近----条数据)'" 
        :tabelTitles="transTitles"
        :tabelData="[]"
        :currentChange="transPageChange">
        <!-- :total="transNum" -->
    </page-tabel>
    <error v-else :error="error"></error>
  </div>
</template>

<script>
  import pageTabel from "~/components/pageTabel";
  import error from "~/components/error";
  import transaction from "~/services/transaction.js";

  const pageSize = 10;

  export default {
    head() {
      return {
        title: "所有交易"
      };
    },
    components: {
      pageTabel, error
    },
    validate({ params }) {
      // [todo]
      return !params.id || params.id;
    },
    async asyncData() {
      const pageIndex = 0;

      try {
        let transactionList = await transaction.getList({
          pageIndex, pageSize
        });
        return {
          pageIndex,
          transactionList
        };
      } catch(err) {
        return {
          error: err.msg || "get transactionList fail"
        };
      }
    },
    data() {
      return {
        error: "",
        pageIndex: 0,
        transactionList: [],

        transTitles: [{
          prop: "transHash",
          name: "交易Hash"
        }, {
          prop: "type",
          name: "交易类型"
        }, {
          prop: "status",
          name: "状态"
        }, {
          prop: "snapshotBlockHash",
          name: "首次快照块"
        }, {
          prop: "snapshotBlockTimestamp",
          name: "时间戳"
        }, {
          prop: "confirms",
          name: "确认数"
        }, {
          prop: "from",
          name: "转出方"
        }, {
          prop: "to",
          name: "转入方"
        }, {
          prop: "token",
          name: "Token"
        }, {
          prop: "amount",
          name: "金额"
        }]
      };
    },
    methods: {
      transPageChange(currentInx) {
        console.log(currentInx);
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
