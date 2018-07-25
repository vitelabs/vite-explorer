<template>
  <div>
    <ve-line :data="chartData" height="313px" :legend-visible="false" :data-empty="dataEmpty" :colors="['#185BDD']"></ve-line>
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
          columns: ["date", "PV"],
          rows: [
            { "date": "07-09", "PV": 1231 },
            { "date": "07-10", "PV": 1223 },
            { "date": "07-11", "PV": 2123 },
            { "date": "07-12", "PV": 4123 },
            { "date": "07-13", "PV": 3123 },
            { "date": "07-14", "PV": 5123 },
            { "date": "07-15", "PV": 1231 },
            { "date": "07-16", "PV": 1223 },
            { "date": "07-17", "PV": 2123 },
            { "date": "07-18", "PV": 4123 },
            { "date": "07-19", "PV": 3123 },
            { "date": "07-20", "PV": 5123 }
          ]
        }
      };
    }
  };
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
