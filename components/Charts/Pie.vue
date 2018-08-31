<template>
  <ve-pie class="ve-pie"
    :data="chartData" 
    :colors="chartColors" 
    :settings="chartSettings"
    :legend-visible="false" 
    :extend="chartExtend"
    height="480px">
  </ve-pie>
</template>

<script>
  import VePie from "v-charts/lib/pie";

  export default {
    components: {
      VePie
    },
    data() {
      return {
        chartExtend: {
          tooltip: {
            backgroundColor: "#fff",
            formatter: "<div class='address'>{b0}</div><div class='hold'>持有量: <span class='value'>{d}%</span></div>",
            borderColor: "#E5EDF3",
            borderWidth: 1,
          }
        },
        chartColors: ["rgba(3,60,206,1)", "rgba(3,60,206,0.95)", "rgba(3,60,206,0.9)", "rgba(3,60,206,0.85)", "rgba(3,60,206,0.8)", "rgba(3,60,206,0.75)", "rgba(3,60,206,0.7)", 
          "rgba(3,60,206,0.65)", "rgba(3,60,206,0.6)", "rgba(3,60,206,0.55)", "rgba(3,60,206,0.5)", "rgba(3,60,206,0.45)", "rgba(3,60,206,0.4)", "rgba(3,60,206,0.35)", "rgba(3,60,206,0.3)", 
          "rgba(3,60,206,0.25)", "rgba(3,60,206,0.2)", "rgba(3,60,206,0.15)", "rgba(3,60,206,0.1)", "rgba(3,60,206,0.05)","rgba(3,60,206,0.02)"],
        chartSettings:{
          offsetY: 240,
          radius: 140,
          limitShowNum: 20,
          itemStyle: {
            borderWidth: 1,
            borderColor: "#F8FBFF"
          },
          label: {
            color: "#8D9BAE",
            fontSize: 11
          }
        },
        chartData: {
          columns: ["地址", "持有量"],
          rows: [
            { "地址": "vite_098dfae02679a4ca05a4c8bf5dd00a8757f0c622bfccce7d68", "持有量": 6000 },
            { "地址": "vite_098dfae02679a4ca05a4c8bf5dd00a8757f0c622bfccce7d61", "持有量": 5000 },
            { "地址": "vite_098dfae02679a4ca05a4c8bf5dd00a8757f0c622bfccce7d62", "持有量": 4000 },
            { "地址": "vite_098dfae02679a4ca05a4c8bf5dd00a8757f0c622bfccce7d63", "持有量": 3000 },
            { "地址": "vite_098dfae02679a4ca05a4c8bf5dd00a8757f0c622bfccce7d64", "持有量": 2888 },
            { "地址": "vite_098dfae02679a4ca05a4c8bf5dd00a8757f0c622bfccce7d65", "持有量": 2611 },
            { "地址": "vite_098dfae02679a4ca05a4c8bf5dd00a8757f0c622bfccce7d66", "持有量": 2122 },
            { "地址": "vite_098dfae02679a4ca05a4c8bf5dd00a8757f0c622bfccce7d69", "持有量": 2000 },
            { "地址": "vite_098dfae02679a4ca05a4c8bf5dd00a8757f0c622bfccce7d60", "持有量": 1000 },
            { "地址": "vite_098dfae02679a4ca05a4c8bf5dd00a8757f0c622bfccce7d50", "持有量": 993 },
            { "地址": "vite_098dfae02679a4ca05a4c8bf5dd00a8757f0c622bfccce7d51", "持有量": 432 },
            { "地址": "vite_098dfae02679a4ca05a4c8bf5dd00a8757f0c622bfccce7d52", "持有量": 321 },
            { "地址": "vite_098dfae02679a4ca05a4c8bf5dd00a8757f0c622bfccce7d53", "持有量": 300 },
            { "地址": "vite_098dfae02679a4ca05a4c8bf5dd00a8757f0c622bfccce7d54", "持有量": 211 },
            { "地址": "vite_098dfae02679a4ca05a4c8bf5dd00a8757f0c622bfccce7d55", "持有量": 200 },
            { "地址": "vite_098dfae02679a4ca05a4c8bf5dd00a8757f0c622bfccce7d56", "持有量": 123 },
            { "地址": "vite_098dfae02679a4ca05a4c8bf5dd00a8757f0c622bfccce7d57", "持有量": 100 },
            { "地址": "vite_098dfae02679a4ca05a4c8bf5dd00a8757f0c622bfccce7d58", "持有量": 99 },
            { "地址": "vite_098dfae02679a4ca05a4c8bf5dd00a8757f0c622bfccce7d59", "持有量": 98 },
            { "地址": "vite_098dfae02679a4ca05a4c8bf5dd00a8757f0c622bfccce7d35", "持有量": 97 },
            { "地址": "vite_098dfae02679a4ca05a4c8bf5dd00a8757f0c622bfccce7d34", "持有量": 96 },
            { "地址": "vite_098dfae02679a4ca05a4c8bf5dd00a8757f0c622bfccce7d33", "持有量": 95 },
            { "地址": "vite_098dfae02679a4ca05a4c8bf5dd00a8757f0c622bfccce7d32", "持有量": 92 },
            { "地址": "vite_098dfae02679a4ca05a4c8bf5dd00a8757f0c622bfccce7d31", "持有量": 43 },
            { "地址": "vite_098dfae02679a4ca05a4c8bf5dd00a8757f0c622bfccce7d30", "持有量": 31 },
            { "地址": "vite_098dfae02679a4ca05a4c8bf5dd00a8757f0c622bfccce7d68", "持有量": 21 },
            { "地址": "vite_098dfae02679a4ca05a4c8bf5dd00a8757f0c622bfccce7d68", "持有量": 10 },
            { "地址": "vite_098dfae02679a4ca05a4c8bf5dd00a8757f0c622bfccce7d68", "持有量": 6 },
            { "地址": "vite_098dfae02679a4ca05a4c8bf5dd00a8757f0c622bfccce7d68", "持有量": 1 },
          ]
        }
      };
    },
    computed: {
    },
    methods: {
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss">
.ve-pie {
  font-size: 12px;
  .address {
    color: #3498db;
  }
  .hold {
    margin-top: 8px; 
    color: #5E6875;
    font-weight: bold;
  }
  .value {
    color: #8D9BAE;
    font-weight: 400;
  }
}


</style>
