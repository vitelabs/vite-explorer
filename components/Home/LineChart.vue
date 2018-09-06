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

  export default {
    components: {
      VeLine
    },
    props: {
      chartData: {
        type: Object,
        default: () => {}
      }
    },
    data () {
      return {
        dataEmpty: false,
        rows: [],
        loading: false
      };
    },
    methods: {
      afterConfig (options) {
        options.series[0].smooth = false;
        return options;
      }
    }
  };
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
