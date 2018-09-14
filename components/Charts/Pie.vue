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
    props: {
      list: {
        type: Array,
        default: () => []
      }
    },
    watch: {
      list(val) {
        this.chartData.rows = val.map(item=> {
          return {
            "address": item.accountAddress,
            "holdings": +item.balance
          };
        });
      }
    },
    data() {
      return {
        chartExtend: {
          tooltip: {
            backgroundColor: "#fff",
            formatter: "<div class='address'>{b0}</div><div class='hold'>Holding Amount: <span class='value'>{d}%</span></div>",
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
          columns: ["address", "holdings"],
          rows: []
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
