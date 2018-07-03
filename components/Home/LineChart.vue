<!-- 交易量曲线 -->
<template>
  <div>
    <div>交易量曲线</div>
    <div class="vite-transaction">
      <ve-line :data="chartData"></ve-line>
    </div>
  </div>
</template>

<script>
  import VeLine from "v-charts/lib/line";

  export default {
    components: {
      VeLine
    },
    props: {
      
    },
    data () {
      return {
        chartData: {
          columns: ["date", "PV"],
          rows: [
            { "date": "01-01", "PV": 1231 },
            { "date": "01-02", "PV": 1223 },
            { "date": "01-03", "PV": 2123 },
            { "date": "01-04", "PV": 4123 },
            { "date": "01-05", "PV": 3123 },
            { "date": "01-06", "PV": 7123 }
          ]
        }
      };
    }
  };
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "assets/css/vars.scss";

  .vite-transaction {
    margin-top: 10px;
    width: 100%;
  }
</style>
