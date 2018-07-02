<template>
  <div class="token-container">
    <div v-if="!error">
      <detail-layout  
        :title="`${title}: ${tokenDetail.name}`"
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
          <!-- <page-tabel
            :showOrder="true"
            :title="accountTabelTitle" 
            :tabelTitles="accountTitles"
            :tabelData="accountData"
            :total="accountNum"
            :currentChange="accountPageChange">
          </page-tabel> -->
        </el-tab-pane>
      </el-tabs>
    </div>
    <error v-else :error="error"></error>
  </div>
</template>

<script>  
  import detailLayout from "~/components/detailLayout";
  import pageTabel from "~/components/pageTabel";
  import error from "~/components/error";
  import token from "../../services/token.js";

  const transNum = 6;

  export default {
    head() {
      return {
        title: this.title
      };
    },
    components: {
      detailLayout, pageTabel, error
    },
    validate ({ params }) {
      return params.name;
    },
    async asyncData({ params }) {
      try {
        let tokenDetail = await token.getDetail({
          tokenName: params.name
        });
        return {
          tokenDetail
        };
      } catch(err) {
        return {
          error: err.msg || "get token fail"
        };
      }
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

      return {
        title: "Token详情",
        tokenDetail: {},
        error: "",

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
        transNum: 10000
      };
    },
    computed: {
      showTokenDetail() {
        return {
          totalSupply: this.tokenDetail.totalSupply,
          owner: this.tokenDetail.owner,
          price: "----",
          addressNumber: "----",
          transactionNumber: this.tokenDetail.transactionNumber
        };
      },
      list() {
        const tokenDetailMap = {
          totalSupply: "流通额度",
          owner: "所有者地址",
          price: "价格",
          addressNumber: "地址数量",
          transactionNumber: "交易数量"
        };

        let list = [];
        for (let key in this.showTokenDetail) {
          list.push({
            describe: this.showTokenDetail[key],
            name: tokenDetailMap[key],
            link: key === "owner" ? `/account/${this.showTokenDetail[key]}` : ""
          });
        }
        return list;
      }
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
