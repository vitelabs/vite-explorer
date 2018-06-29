<template>
  <div class="account-container">
    <detail-layout 
        :title="`${title}: ${accountAddress}`"
        :list="list"
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
    asyncData({ params }) {
      let tokenList = [1, 2, 3];

      return {
        accountAddress: params.addr || "",
        list: [{
          name: "账户Hash",
          describe: "2830928023984014810481"
        }, {
          name: "账户持有币种种类",
          describe: 23820
        }, {
          name: "账户持有代币",
          list: tokenList
        }, {
          name: "所有代币估值",
          describe: "2830928023984014810481"
        }],
        tokenList,
        subTitle: `代币: ${tokenList && tokenList.length ? tokenList[0] : ""}`
      };
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
        accountAddress: "",
        list: [],
        tokenList: [],

        subTitle: "",
        tokenDetailList: [{
          name: "余额数量",
          describe: "2830928023984014810481"
        }, {
          name: "余额价值",
          describe: 23820
        }, {
          name: "交易次数",
          describe: "2830928023984014810481"
        }],

        activeTab: "transList",
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
    methods: {
      clickLab(lab) {
        this.subTitle = `代币: ${lab}`;

        // request
        this.tokenDetailList = [{
          name: "余额数量",
          describe: "2830928023984014810481"
        }, {
          name: "余额价值",
          describe: 23820
        }, {
          name: "交易次数",
          describe: "2830928023984014810481"
        }];
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
