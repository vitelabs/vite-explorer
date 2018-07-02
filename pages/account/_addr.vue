<template>
  <div class="account-container">
    <detail-layout 
        :title="`${title}: ${accountDetail.accountAddress}`"
        :list="accountList"
        :clickLab="clickLab">
    </detail-layout>

    <detail-layout v-if="subTitle"
        :title="subTitle"
        :list="tokenDetailList">
    </detail-layout>

    <el-tabs class="tab-wrapper" v-model="activeTab" type="card">
      <el-tab-pane class="tab-pane" label="交易列表" name="transList">
        <page-tabel
          :title="transTabelTitle" 
          :tabelTitles="transTitles"
          :tabelData="transData"
          :total="transNum"
          :currentChange="transPageChange">
        </page-tabel>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>  
  import detailLayout from "~/components/detailLayout";
  import pageTabel from "~/components/pageTabel";
  import account from "../../services/account.js";

  export default {
    head() {
      return {
        title: this.title
      };
    },
    components: {
      detailLayout, pageTabel
    },
    validate({ params }) {
      return params.addr;
    },
    async asyncData({ params }) {
      try {
        let accountDetail = await account.getDetail({
          accountAddres: params.addr
        });
        let tokenList = accountDetail.tokenList || [];
        return {
          accountDetail,
          tokenList
        };
      } catch(err) {
        return {
          error: err.msg || "get account fail"
        };
      }
    },
    data() {
      let transData = [];
      for(let i=0; i<10; i++) {
        transData.push({
          transHash: "sdsdsdsds",
          transType: "sdsdsdsd",
          status: "sdsd",
          firstBlock: "sdsdsdsd",
          timestamp: "sdsdsdsd",
          confirmNum: "sdsdsdsd",
          outer: "dsdsdsd",
          inner: "sdsdsdsds",
          token: "sdsdsds",
          price: "sdsdsds"
        });
      }

      return {
        title: "账户详情",
        activeTab: "transList",
  
        accountDetail: {},
        tokenList: [],

        activeTokenIndex: 0,

        transTabelTitle: "最近的10笔交易, 总交易笔数2089",
        transTitles: [{
          prop: "transHash",
          name: "交易Hash"
        }, {
          prop: "transType",
          name: "交易类型"
        }, {
          prop: "status",
          name: "状态"
        }, {
          prop: "firstBlock",
          name: "首次快照块"
        }, {
          prop: "timestamp",
          name: "时间戳"
        }, {
          prop: "confirmNum",
          name: "确认数"
        }, {
          prop: "outer",
          name: "转出方"
        }, {
          prop: "inner",
          name: "转入方"
        }, {
          prop: "token",
          name: "Token"
        }, {
          prop: "price",
          name: "金额"
        }],
        transData,
        transNum: 10000,
      };
    },
    computed: {
      accountList() {
        let tokenNameList = [];
        this.tokenList.forEach((token) => {
          tokenNameList.push(token.name);
        });

        return [{
          name: "账户Hash",
          describe: this.accountDetail.accountAddres
        },{
          name: "账户持有代币种类",
          describe: tokenNameList.length
        },{
          name: "账户持有代币",
          list: tokenNameList
        }];
      },
      subTitle() {
        return `代币: ${this.tokenList.length ? this.tokenList[this.activeTokenIndex].token.name || "" : ""}`;
      },
      tokenDetailList() {
        let tokenDetail = this.tokenList.length ? this.tokenList[this.activeTokenIndex] : null;
        if (!tokenDetail) {
          return [];
        }

        return [{
          name: "余额数量",
          describe: tokenDetail.balance || 0
        }, {
          name: "余额价值",
          describe: "----"
        }, {
          name: "交易次数",
          describe: tokenDetail.token.transactionNumber
        }, {
          name: "所有代币估值",
          describe: "----"
        }];
      }
    },
    methods: {
      clickLab(lab, index) {
        this.activeTokenIndex = index;
      },

      transPageChange(currentInx) {
        let transData = [];
        for(let i=0; i<10; i++) {
          transData.push({
            transHash: "sdsdsdsds" + currentInx,
            transType: "sdsdsdsd" + currentInx,
            status: "sdsd" + currentInx,
            firstBlock: "sdsdsdsd" + currentInx,
            timestamp: "sdsdsdsd" + currentInx,
            confirmNum: "sdsdsdsd" + currentInx,
            outer: "dsdsdsd" + currentInx,
            inner: "sdsdsdsds" + currentInx,
            token: "sdsdsds" + currentInx,
            price: "sdsdsds" + currentInx
          });
        }
        // todo
        this.transData = transData;
      }
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  .tab-wrapper {
    margin-top: 20px;
  }
</style>
