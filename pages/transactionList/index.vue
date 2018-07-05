<template>
  <div class="token-container">
    <page-tabel v-if="!error"
        :loading="loading"
        :title="'总交易量：---- (仅展示最近----条数据)'" 
        :tabelTitles="transTitles"
        :tabelData="transactionsData"
        :total="12192019"
        :currentChange="transPageChange">
        <!-- :total="transNum" -->
    </page-tabel>
    <error v-else :error="error"></error>
  </div>
</template>

<script>
  import pageTabel from "~/components/pageTabel";
  import error from "~/components/error";
  import transaction from "~/services/transaction";

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
    async asyncData() {
      const pageIndex = 0;

      try {
        let { transactionList } = await transaction.getList({
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
        loading: false,
        transactionList: [],

        transTitles: [{
          prop: "signature",
          name: "交易Hash"
        }, {
          prop: "type",
          name: "交易类型"
        }, {
          prop: "status",
          name: "状态"
        }, {
          prop: "snapshotTimestamp",
          name: "首次快照块"
        }, {
          prop: "snapshotTimestamp",
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
          prop: "tokenName",
          name: "Token"
        }, {
          prop: "amount",
          name: "金额"
        }]
      };
    },
    computed: {
      transactionsData() {
        let list = [];
        this.transactionList.forEach((transaction) => {
          transaction.type = transaction.fromHash ? "发送" : "接收";
          transaction.amount = transaction.fromHash ? `-${transaction.amount}` : transaction.amount;
          transaction.status = +transaction.status === 0 ? "unknown" : 
            +transaction.status === 1 ? "open" : 
              "closed";
          list.push(transaction);
        });
        return list;
      }
    },
    methods: {
      transPageChange(currentInx) {
        console.log(currentInx);
        this.loading = true;
        this.pageIndex = currentInx;

        transaction.getList({
          pageIndex: currentInx,
          pageSize
        }).then(({ transactionList })=>{
          console.log(transactionList);
          if (this.pageIndex !== currentInx) {
            return;
          }
          this.loading = false;
          this.transactionList = transactionList;
        }).catch((err) => {
          if (this.pageIndex !== currentInx) {
            return;
          }
          this.loading = false;
          this.$message.error(err.msg || "get transactionList fail");
        });
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
