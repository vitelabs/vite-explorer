<template>
  <div class="token-container">
    <detail-layout  
        :title="`${title}: ${id}`"
        :list="list">
    </detail-layout>

    <el-tabs class="tab-wrapper" v-model="activeTab" type="card">
      <el-tab-pane class="tab-pane" label="交易列表" name="transList">
        <page-tabel :pagination="false"
          :title="transTabelTitle" 
          :tabelTitles="transTitles"
          :tabelData="transData"
          :total="transNum">
        </page-tabel>
      </el-tab-pane>

      <el-tab-pane class="tab-pane" label="账户列表" name="accountList">
        <page-tabel
          :showOrder="true"
          :title="accountTabelTitle" 
          :tabelTitles="accountTitles"
          :tabelData="accountData"
          :total="accountNum"
          :currentChange="accountPageChange">
        </page-tabel>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>  
  import detailLayout from "~/components/detailLayout";
  import pageTabel from "~/components/pageTabel";

  const transNum = 6;

  export default {
    head() {
      return {
        title: this.title
      };
    },
    components: {
      detailLayout, pageTabel
    },
    validate ({ params }) {
      return params.id;
    },
    asyncData({ params }) {
      return {
        id: params.id || "",
        list: [{
          name: "流通额度",
          describe: "2830928023984014810481"
        }, {
          name: "所有者地址",
          describe: "2830928023984014810481",
          link: "/account/2830928023984014810481"
        }, {
          name: "价格",
          describe: "283"
        }, {
          name: "地址数量",
          describe: "2830928023984014810481"
        }, {
          name: "交易数据",
          describe: "2830928023984014810481"
        }]
      };
    },
    data() {
      let transData = [];
      for(let i=0; i<transNum; i++) {
        transData.push({
          transHash: "sdsdsdsds",
          transType: "sdsdsdsd",
          status: "sdsd",
          firstBlock: "sdsdsdsd",
          timestamp: "sdsdsdsd",
          confirmNum: "sdsdsdsd",
          outer: "dsdsdsd",
          inner: "sdsdsdsds",
          all: "sdsdsds"
        });
      }

      const accountNum = 382;
      const accountTotal = 2372032382;
      let accountData = [];
      for(let i=0; i<10; i++) {
        accountData.push({
          accountAddress: "sdsdsdsds",
          accountBalance: "sdsdsdsd",
          percent: "sdsd",
          transNum: "sdsdsdsd"
        });
      }

      return {
        title: "Token详情",
        blockHash: "",
        list: [],

        activeTab: "transList",

        transTabelTitle: `最近的${transNum}笔交易`,
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
          prop: "all",
          name: "全部"
        }],
        transData,
        transNum: 10000,

        accountTabelTitle: `总账户数${accountTotal}: (仅展示最近${accountNum}条数据)`,
        accountNum,
        accountTitles: [{
          prop: "accountAddress",
          name: "账户地址"
        }, {
          prop: "accountBalance",
          name: "账户余额"
        }, {
          prop: "percent",
          name: "占总流量比例"
        }, {
          prop: "transNum",
          name: "账户交易次数"
        }],
        accountData
      };
    },
    methods: {
      accountPageChange(currentInx) {
        let accountData = [];
        for(let i=0; i<10; i++) {
          accountData.push({
            accountAddress: "sdsdsdsds" + currentInx,
            accountBalance: "sdsdsdsd" + currentInx,
            percent: "sdsd" + currentInx,
            transNum: "sdsdsdsd" + currentInx
          });
        }
        // todo
        this.accountData = accountData;
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
