<template>
  <div class="page-home">
    <div class="top mb30">
      <div class="profile">
        <profile :general-detail="generalDetail"></profile>
      </div>
      <div class="line-chart ml30">
        <line-chart></line-chart>
      </div>
    </div>
    <div class="bottom mb30">
      <div class="snapshot">
        <snapshot-list :list="blockList"></snapshot-list>
      </div>
      <div class="transaction ml30">
        <transaction-list :list="transactionList"></transaction-list>
      </div>
    </div>
  </div>
</template>

<script>
  import Profile from "~/components/Home/Profile.vue";
  import LineChart from "~/components/Home/LineChart.vue";
  import SnapshotList from "~/components/Home/SnapshotList.vue";
  import TransactionList from "~/components/Home/TransactionList.vue";

  import block from "~/services/block.js";
  import transaction from "~/services/transaction.js";
  import general from "~/services/general.js";
  
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
        let generalDetail = {};
        let { blockList } = await block.getList({
          pageIndex, pageSize
        });
        let { transactionList } = await transaction.getList({
          pageIndex, pageSize
        });
        try{
          generalDetail = await general.getGeneralDetail();
        }catch(err) {
          console.log(err);
        }
      
        return {
          blockList,
          transactionList,
          generalDetail
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
        transactionList: [],
        generalDetail: {}
      };
    },
    methods: {
      
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  .page-home {
    .mb30 {
      margin-bottom: 30px;
    }
    .ml30 {
      margin-left: 30px;
    }
    .top {
      color: #FFFFFF;
      display: -webkit-flex; /* Safari */
      display: flex;
      .profile {
        width: 470px;
        height: 313px;
        background-image: url("../assets/images/bg.png");
        background-size:470px 313px;
        background-repeat:no-repeat;
        // background-image: linear-gradient(138deg, #00E0F2 0%, #0BB6EB 31%, #0B92E7 49%,  #176CE0 71%, #1B3BD8 100%);
        border-radius: 2px;
      }
      .line-chart {
        width: 660px;
        height: 313px;
        background: #FFFFFF;
        border: 1px solid #E5EDF3;
        box-shadow: 0 6px 36px 0 rgba(0,62,100,0.04);
        border-radius: 4px;
      }
    }
    .bottom {
      display: -webkit-flex; /* Safari */
      display: flex;
      justify-content: space-between;
      .snapshot {
        width: 470px;
        height: 460px;
        background: #FFFFFF;
        border: 1px solid #E5EDF3;
        box-shadow: 0 6px 36px 0 rgba(0,62,100,0.04);
        border-radius: 4px 4px 0 0;
        overflow: scroll;
      }
      .transaction {
        width: 660px;
        height: 460px;
        background: #FFFFFF;
        border: 1px solid #E5EDF3;
        box-shadow: 0 6px 36px 0 rgba(0,62,100,0.04);
        border-radius: 4px 4px 0 0;
        overflow: scroll;
      }
    }
    
  }
</style>
