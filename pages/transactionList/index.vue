<template>
  <div class="token-container">
    <trans-list v-if="!error"
        :transactions="transactionList"
        :total="totalNumber">
    </trans-list>
    <error v-else :error="error"></error>
  </div>
</template>

<script>
  import error from "~/components/error";
  import transList from "~/components/transList.vue";
  import transaction from "~/services/transaction";

  const pageSize = 10;

  export default {
    head() {
      return {
        title: this.$t("head.transTitle")
      };
    },
    components: {
      error, transList
    },
    async asyncData() {
      const pageIndex = 0;
      try {
        let { transactionList, totalNumber} = await transaction.getList({
          pageIndex, pageSize
        });
        return {
          pageIndex,
          transactionList,
          totalNumber
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
        transactionList: [],
        totalNumber: 0
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
