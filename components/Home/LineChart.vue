<template>
  <div>
    <ve-line 
      :data="chartData" 
      height="313px" 
      :legend-visible="true" 
      :data-empty="dataEmpty" 
      :colors="['#3498db', '#ccc']"
      :loading="loading"
      :after-config="afterConfig"
      :settings="chartSettings"
      :extend="chartExtend">
    </ve-line>
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
      chartData: {
        type: Object,
        default: () => {}
      },
      chartSettings: {
        type: Object,
        default: () => {}
      }
    },
    data () {
      return {
        dataEmpty: false,
        rows: [],
        loading: false,
        chartExtend: {
          legend: {
            selectedMode: "single"
          }
        }
      };
    },
    methods: {
      afterConfig (options) {
        options.series[0].smooth = false;
        options.series[1].smooth = false;
        return options;
      }
    }
  };
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
