<template>
  <div class="page-home">
    <div class="top">
      <div class="profile mb30">
        <profile :general-detail="generalDetail" :height="blockList[0] && blockList[0].height"></profile>
      </div>
      <div class="line-chart ml30 mb30">
        <line-chart></line-chart>
      </div>
    </div>
    <div class="bottom">
      <div class="snapshot mb30">
        <snapshot-list :list="blockList"></snapshot-list>
      </div>
      <div class="transaction ml30 mb30">
        <transaction-list :list="transactionList"></transaction-list>
      </div>
    </div>
  </div>
</template>

<script>
  import Profile from "~/components/Home/Profile.vue";
  import SnapshotList from "~/components/Home/SnapshotList.vue";
  import TransactionList from "~/components/Home/TransactionList.vue";
  import LineChart from "~/components/Home/LineChart.vue";
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
      TransactionList
    },
    async asyncData() {
      try {
        let generalDetail = {};
        let { blockList } = await block.getTop10List();
        let { transactionList } = await transaction.getTop10List();
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
    mounted() {
      this.getTop10List();
    },
    data() {
      return {
        name: this.name,
        blockList: [],
        transactionList: [],
        generalDetail: {},
        count: 0,
        interval: null,
      };
    },
    destroyed() {
      if (this.interval) {
        myClearInterval(this.interval);
      }
    },
    methods: {
      getGeneralDetail() {
        general.getGeneralDetail().then(data=> {
          this.generalDetail = data;
        }).catch(err => {
          console.log(err);
        });
      },
      getTop10BlockList() {
        block.getTop10List().then(data => {
          this.blockList = data.blockList;
        }).catch(err => {
          console.log(err);
        });
      },

      getTop10TxList() {
        transaction.getTop10List().then(data => {
          this.transactionList = data.transactionList;
        }).catch(err => {
          console.log(err);
        });
      },

      getTop10List() {
        this.interval = mySetInterval(() => {
          this.getTop10BlockList();
          this.getTop10TxList();
        }, 3000);
        
      }
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
@import "~assets/css/vars.scss";
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
      flex-wrap: wrap;
      width: 1160px;
      .profile {
        width: 470px;
        height: 313px;
        background-image: url("../assets/images/bg.svg");
        background-size:470px 313px;
        border-radius: 2px;
      }
      .line-chart {
        box-sizing: border-box;
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
      width: 1160px;
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
      }
      .transaction {
        width: 660px;
        box-sizing: border-box;
        height: 456px;
        background: #FFFFFF;
        border: 1px solid #E5EDF3;
        box-shadow: 0 6px 36px 0 rgba(0,62,100,0.04);
        border-radius: 4px 4px 0 0;
        border-bottom: 4px solid $common-color;
      }
    }
  }
  /** iPad **/
  @media only screen and (min-width: 768px) and (max-width: 1024px) {
    .page-home {
      .mb30 {
        margin-bottom: 20px;
      }
      .ml30 {
        margin-left: 20px;
      }
      .top {
        width: 728px;
        .profile {
          width: 294px;
        }
        .line-chart {
          width: 414px;
        }
      }
      .bottom {
        width: 728px;
        .snapshot {
          width: 294px;
          height: 500px;
        }
        .transaction {
          width: 414px;
          height: 500px;
        }
      }
    }
  }
  /** iPhone **/
  @media only screen and (min-width: 320px) and (max-width: 767px) {
    .page-home {
      .mb30 {
        margin-bottom: 15px;
      }
      .ml30 {
        margin-left: 0;
      }
      .top {
        width: 290px;
        .profile {
          width: 290px;
        }
        .line-chart {
          width: 290px;
        }
      }
      .bottom {
        width: 290px;
        .snapshot {
          width: 290px;
          height: 492px;
        }
        .transaction {
          width: 290px;
          height: 492px;
        }
      }
    }
  }
</style>
