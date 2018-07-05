<template>
  <div class="token-container">
    <trans-list v-if="!error"
        :transactions="transactionList">
    </trans-list>
    <error v-else :error="error"></error>
  </div>
</template>

<script>
  import pageTabel from "~/components/pageTabel";
  import error from "~/components/error";
  import transList from "~/components/transList.vue";
  import transaction from "~/services/transaction";

  const pageSize = 10;

  export default {
    head() {
      return {
        title: "所有交易"
      };
    },
    components: {
      pageTabel, error, transList
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
        transactionList: []
      };
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
