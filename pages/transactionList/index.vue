<template>
  <div class="token-container">
    <trans-list v-if="!error"
        :transactions="transactionList"
        :total="pageTotalNumber"
        :page-size="pageSize"
        :title="txTitle"
        :sub-common-title="subCommonTitle">
    </trans-list>
    <error v-else :error="error"></error>
  </div>
</template>

<script>
  import error from "~/components/error";
  import transList from "~/components/transList.vue";
  import transaction from "~/services/transaction";
  import moment from "moment";

  const pageSize = 50;

  export default {
    head() {
      return {
        title: this.title
      };
    },
    computed: {
      txTitle() {
        return this.$t("transList.title") + this.totalNumber;
      },
      subCommonTitle() {
        return this.$t("transList.time")+`${moment().format("HH:mm:ss")}`;
      }
    },
    components: {
      error, transList
    },
    async asyncData() {
      let pageIndex = 1;
      try {
        let { transactionList, totalNumber, pageTotalNumber } = await transaction.getList({
          pageIndex, pageSize
        });
        return {
          pageIndex,
          transactionList,
          totalNumber,
          pageTotalNumber,
          pageSize
        };
      } catch(err) {
        console.log(err);
        return {
          error: err.msg || "get transactionList fail"
        };
      }
    },
    created() {
    },
    data() {
      return {
        error: "",
        title: this.$t("head.transTitle")
      };
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
</style>
