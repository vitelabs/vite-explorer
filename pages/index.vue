<template>
  <div class="page-home">
    <div class="top">
      <div class="profile">
        <profile 
          :general-detail="generalDetail" 
          :general-market="generalMarket" 
          :pre-general-detail="preGeneralDetail">
        </profile>
      </div>
      <div class="line-chart">
        <line-chart :chart-data="chartData" :chart-settings="chartSettings"></line-chart>
      </div>
    </div>
    <div class="bottom">
      <div class="snapshot">
        <snapshot-list :list="blockList" :pre-list="preBlockList"></snapshot-list>
      </div>
      <div class="transaction">
        <transaction-list :list="transactionList" :pre-list="preTransactionList"></transaction-list>
      </div>
    </div>
    <div>
      <dag :list="dagTransactionList"></dag>
    </div>
  </div>
</template>

<script>
  import Profile from "~/components/Home/Profile.vue";
  import SnapshotList from "~/components/Home/SnapshotList.vue";
  import TransactionList from "~/components/Home/TransactionList.vue";
  import LineChart from "~/components/Home/LineChart.vue";
  import Dag from "~/components/Dag/dag.vue";
  // const LineChart = () => require("~/components/Home/LineChart.vue");
  import block from "~/services/block.js";
  import transaction from "~/services/transaction.js";
  import general from "~/services/general.js";
  

  import { mySetInterval, myClearInterval} from "~/utils/myInterval.js";

  export default {
    components: {
      Profile,
      LineChart,
      SnapshotList,
      TransactionList,
      Dag
    },
    async asyncData() {
      let generalDetail = {};
      let generalMarket = {};
      let blockList = [];
      let transactionList = [];
      let dagTransactionList = [];
      let chartData = {};
      let chartSettings = {};
      try {
        let lineChart = await transaction.getChartData();
        chartData = {
          columns: ["date", "transactions", "accountNum"],
          rows: lineChart
        };
        chartSettings = {
          labelMap: {
            transactions: "Transactions",
            accountNum: "Active Accounts"
          }
        };
      }catch(err) {
        console.log(err);
      }
      try {
        generalMarket = await general.getGeneralMarket();
      }catch(err) {
        console.log(err);
      }
      try {
        generalDetail = await general.getGeneralDetail();
      }catch(err) {
        console.log(err);
      }
      try {
        let blockObj= await block.getTop10List();
        blockList = blockObj.blockList;
      }catch(err) {
        console.log(err);
      }
      try {
        let transactionObj = await transaction.getTop10List();
        transactionList = transactionObj.transactionList;
      }catch(err) {
        console.log(err);
      }
      try {
        let graphTransactionObj = await transaction.getGraphList();
        dagTransactionList = graphTransactionObj.transactionList;
      }catch(err) {
        console.log(err);
      }
      
      return {
        blockList,
        transactionList,
        dagTransactionList,
        generalDetail,
        generalMarket,
        chartData,
        chartSettings
      };
    },
    mounted() {
      this.getTop10List();
      this.getGraphList();
    },
    data() {
      return {
        name: this.name,
        blockList: [],
        preBlockList: [],
        transactionList: [],
        preTransactionList: [],
        dagTransactionList: [],
        generalDetail: null,
        preGeneralDetail: null,
        count: 0,
        interval: null,
      };
    },
    destroyed() {
      if (this.interval) {
        myClearInterval(this.interval);
      }
      if (this.gInterval) {
        myClearInterval(this.gInterval);
      }
    },
    methods: {
      getGeneralMarket() {
        general.getGeneralMarket().then(data=> {
          this.generalMarket = data;
        }).catch(err => {
          console.log(err);
        });
      },
      getGeneralDetail() {
        general.getGeneralDetail().then(data=> {
          this.preGeneralDetail = this.generalDetail;
          this.generalDetail = data;
        }).catch(err => {
          console.log(err);
        });
      },
      getTop10BlockList() {
        block.getTop10List().then(data => {
          this.preBlockList = this.blockList;
          this.blockList = data.blockList;
        }).catch(err => {
          console.log(err);
        });
      },

      getTop10TxList() {
        transaction.getTop10List().then(data => {
          this.preTransactionList = this.transactionList;
          this.transactionList = data.transactionList;
        }).catch(err => {
          console.log(err);
        });
      },

      getTop10List() {
        this.interval = mySetInterval(() => {
          this.getTop10BlockList();
          this.getTop10TxList();
          this.getGeneralDetail();
        }, 1000);
        
      },
      getGraphList() {
        this.gInterval = mySetInterval(() => {
          transaction.getGraphList().then(data => {
            this.dagTransactionList = data.transactionList;
          }).catch(err => {
            console.log(err);
          });
        }, 15000);
      }
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
@import "~assets/css/vars.scss";
  .page-home {
    .top {
      color: #FFFFFF;
      display: -webkit-flex; /* Safari */
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      .profile {
        width: 470px;
        height: 313px;
        background-image: url("../assets/images/bg.svg");
        background-size:470px 313px;
        border-radius: 2px;
        margin-bottom: 30px;
      }
      .line-chart {
        box-sizing: border-box;
        width: 55%;
        height: 313px;
        padding-top: 25px;
        background: #FFFFFF;
        border: 1px solid #E5EDF3;
        box-shadow: 0 6px 36px 0 rgba(0,62,100,0.04);
        border-radius: 4px;
        margin-bottom: 30px;
      }
    }
    .bottom {
      display: -webkit-flex; /* Safari */
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      .snapshot {
        width: 470px;
        height: 456px;
        box-sizing: border-box;
        background: #FFFFFF;
        border: 1px solid #E5EDF3;
        box-shadow: 0 6px 36px 0 rgba(0,62,100,0.04);
        border-radius: 4px 4px 0 0;
        border-bottom: 4px solid $common-color;
        margin-bottom: 30px;
      }
      .transaction {
        width: 55%;
        box-sizing: border-box;
        height: 456px;
        background: #FFFFFF;
        border: 1px solid #E5EDF3;
        box-shadow: 0 6px 36px 0 rgba(0,62,100,0.04);
        border-radius: 4px 4px 0 0;
        border-bottom: 4px solid $common-color;
        margin-bottom: 30px;
      }
    }
  }
  /** iPad **/
  @include tablet {
    .page-home {
      .top {
        width: 100%;
        .profile {
          width: 42%;
        }
        .line-chart {
          width: 55%;
        }
      }
      .bottom {
        width: 100%;
        .snapshot {
          width: 42%;
        }
        .transaction {
          width: 55%;
        }
      }
    }
  }
  /** iPhone **/
  @include mobile {
    .page-home {
      .top {
        width: 100%;
        .profile {
          margin-bottom: 20px;
          width: 100%;
        }
        .line-chart {
          margin-bottom: 20px;
          width: 100%;
        }
      }
      .bottom {
        width: 100%;
        .snapshot {
          margin-bottom: 20px;
          width: 100%;
        }
        .transaction {
          margin-bottom: 20px;
          width: 100%;
        }
      }
     
    }
  }
</style>
