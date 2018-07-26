<template>
  <div>
    <ve-line :data="chartData" height="313px" :legend-visible="true" :data-empty="dataEmpty" :colors="['#3498db']"></ve-line>
  </div>
</template>

<script>
  import VeLine from "v-charts/lib/line";
  import "v-charts/lib/style.css";

  export default {
    components: {
      VeLine
    },
    props: {

    },
    data () {
      return {
        dataEmpty: false,
        chartData: {
          columns: ["date", "Transactions (no data)"],
          rows: [
            { "date": "07-09", "Transactions (no data)": 1 },
            { "date": "07-10", "Transactions (no data)": 1 },
            { "date": "07-11", "Transactions (no data)": 1 },
            { "date": "07-12", "Transactions (no data)": 1 },
            { "date": "07-13", "Transactions (no data)": 1 },
            { "date": "07-14", "Transactions (no data)": 1 },
            { "date": "07-15", "Transactions (no data)": 1 },
            { "date": "07-16", "Transactions (no data)": 1 },
            { "date": "07-17", "Transactions (no data)": 1 },
            { "date": "07-18", "Transactions (no data)": 1 },
            { "date": "07-19", "Transactions (no data)": 1 },
            { "date": "07-20", "Transactions (no data)": 1 }
          ]
        }
      };
    }
  };
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
