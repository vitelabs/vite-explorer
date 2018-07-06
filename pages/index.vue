<template>
  <div class="page-home">
    <el-row :gutter="50">
      <el-col :span="12"><profile></profile></el-col>
      <el-col :span="12"><line-chart></line-chart></el-col>
    </el-row>
    <el-row :gutter="50">
      <el-col :span="12"><snapshot-list :list="blockList"></snapshot-list></el-col>
      <el-col :span="12"><transaction-list :list="transactionList"></transaction-list></el-col>
    </el-row>
  </div>
</template>

<script>
  import Profile from "~/components/Home/Profile.vue";
  import LineChart from "~/components/Home/LineChart.vue";
  import SnapshotList from "~/components/Home/SnapshotList.vue";
  import TransactionList from "~/components/Home/TransactionList.vue";

  import block from "~/services/block.js";
  import transaction from "~/services/transaction.js";
  
  export default {
    components: {
      Profile,
      LineChart,
      SnapshotList,
      TransactionList
    },
    async asyncData() {
      try {
        let pageIndex = 0;
        let pageSize = 10;
        let { blockList } = await block.getList({
          pageIndex, pageSize
        });
        let { transactionList } = await transaction.getList({
          pageIndex, pageSize
        });
        return {
          blockList,
          transactionList
        };
      } catch(err) {
        return {
          error: err.msg || "get data fail"
        };
      }
    },
    data() {
      return {
        name: this.name,
        blockList: [],
        transactionList: []
      };
    },
    methods: {
      
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  .page-home {
    // margin-top: 100px;
  }
</style>
