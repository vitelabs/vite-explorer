<template>
  <div>
    <ve-line 
      :data="chartData" 
      height="313px" 
      :legend-visible="true" 
      :data-empty="dataEmpty" 
      :colors="['#3498db']"
      :loading="loading"
      :after-config="afterConfig">
    </ve-line>
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
        },
        loading: false
      };
    },
    methods: {
      afterConfig (options) {
        options.series[0].smooth = false;
        return options;
      },
      getChartData() {
        this.loading = true;
        transaction.getChartData()
          .then(data=> {
            this.chartData.rows = data;
            this.loading = false;
          })
          .catch(err=> {
            this.loading = false;
            console.log(err);
          });
      }
    }
  };
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
