<template>
  <div>
    <ve-line :data="chartData" height="313px" :legend-visible="true" :data-empty="dataEmpty" :colors="['#3498db']"></ve-line>
  </div>
</template>

<script>
  import VeLine from "v-charts/lib/line";
  import "v-charts/lib/style.css";
  import transaction from "~/services/transaction.js";

  export default {
    components: {
      VeLine
    },
    props: {

    },
    mounted() {
      this.getChartData();
    },
    data () {
      return {
        dataEmpty: false,
        chartData: {
          columns: ["date", "transactions"],
          rows: []
        }
      };
    },
    methods: {
      getChartData() {
        transaction.getChartData()
          .then(data=> {
            this.chartData.rows = data;
          })
          .catch(err=> {
            console.log(err);
          });
      }
    }
  };
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
