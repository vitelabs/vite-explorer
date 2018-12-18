<template>
  <div class="bar-container">
    <div class="content">
      <div :style="barStyle" ref="bar"></div>
    </div>
  </div>
</template>

<script>
import echarts from "echarts";


// const data = {
//   percents: [{
//     name: "0s",
//     percent: 0.02,
//     sumPercent: 0.02
//   }, {
//     name: "0.25s",
//     percent: 0.3,
//     sumPercent: 0.32
//   }, {
//     name: "0.5s",
//     percent: 0.3,
//     sumPercent: 0.62
//   }, {
//     name: "0.75s",
//     percent: 0.3,
//     sumPercent: 0.92
//   }, {
//     name: "1s",
//     percent: 0.08,
//     sumPercent: 1.0
//   }, {
//     name: "1.25s",
//     percent: 0.1,
//     sumPercent: 0.4
//   }, {
//     name: "1.5s",
//     percent: 0.13,
//     sumPercent: 0.5
//   }, {
//     name: "1.75s",
//     percent: 0.13,
//     sumPercent: 0.5
//   }, {
//     name: "2s",
//     percent: 0.13,
//     sumPercent: 0.5
//   }, {
//     name: "2.25s",
//     percent: 0.13,
//     sumPercent: 0.5
//   }, {
//     name: "2.5s",
//     percent: 0.13,
//     sumPercent: 0.5
//   }, {
//     name: "2.75s",
//     percent: 0.13,
//     sumPercent: 0.5
//   }, {
//     name: "3s",
//     percent: 0.13,
//     sumPercent: 0.5
//   }, {
//     name: "3.25s",
//     percent: 0.13,
//     sumPercent: 0.5
//   }, {
//     name: "3.5s",
//     percent: 0.13,
//     sumPercent: 0.5
//   }, {
//     name: "3.75s",
//     percent: 0.13,
//     sumPercent: 0.5
//   }, {
//     name: "4s",
//     percent: 0.13,
//     sumPercent: 0.5
//   }, {
//     name: "4.25s",
//     percent: 0.13,
//     sumPercent: 0.5
//   }, {
//     name: "4.5s",
//     percent: 0.13,
//     sumPercent: 0.5
//   }, {
//     name: "4.75s",
//     percent: 0.13,
//     sumPercent: 0.5
//   }, {
//     name: "5s",
//     percent: 0.13,
//     sumPercent: 0.5
//   }, {
//     name: "5.25s",
//     percent: 0.02,
//     sumPercent: 0.02
//   }, {
//     name: "5.5s",
//     percent: 0.3,
//     sumPercent: 0.32
//   }, {
//     name: "5.75s",
//     percent: 0.3,
//     sumPercent: 0.62
//   }, {
//     name: "6s",
//     percent: 0.3,
//     sumPercent: 0.92
//   }, {
//     name: "6.25s",
//     percent: 0.08,
//     sumPercent: 1.0
//   }, {
//     name: "6.5s",
//     percent: 0.1,
//     sumPercent: 0.4
//   }, {
//     name: "6.75s",
//     percent: 0.13,
//     sumPercent: 0.5
//   }, {
//     name: "7s",
//     percent: 0.13,
//     sumPercent: 0.5
//   }, {
//     name: "7.25s",
//     percent: 0.13,
//     sumPercent: 0.5
//   }, {
//     name: "7.5s",
//     percent: 0.13,
//     sumPercent: 0.5
//   }, {
//     name: "7.75s",
//     percent: 0.13,
//     sumPercent: 0.5
//   }, {
//     name: "8s",
//     percent: 0.13,
//     sumPercent: 0.5
//   }, {
//     name: "8.25s",
//     percent: 0.13,
//     sumPercent: 0.5
//   }, {
//     name: "8.5s",
//     percent: 0.13,
//     sumPercent: 0.5
//   }, {
//     name: "8.75s",
//     percent: 0.13,
//     sumPercent: 0.5
//   }, {
//     name: "9s",
//     percent: 0.13,
//     sumPercent: 0.5
//   }, {
//     name: "9.25s",
//     percent: 0.13,
//     sumPercent: 0.5
//   }, {
//     name: "9.5s",
//     percent: 0.13,
//     sumPercent: 0.5
//   }, {
//     name: "9.75s",
//     percent: 0.23,
//     sumPercent: 0.5
//   }, {
//     name: "10s",
//     percent: 0.33,
//     sumPercent: 0.5
//   }]
// };


export default {
  props: {
    list: {
      type: Array,
      default: ()=> []
    },
    barStyle: {
      type: Object,
      default: ()=> {}
    },
    showAxis: {
      type: Boolean,
      default: true
    },
    type: {
      type: String,
      default: "large"
    }
  },
  data() {
    return {
      echarsInstance: null,
    };
  },
  watch: {
    list() {
      this.draw();
    }
  },
  mounted() {
    this.draw();
    // this.fetchList();
  },
  methods: {
    fetchList() {
      
    },
    clear() {
      this.echarsInstance.clear();
    },
    dispatchBarColor(name) {
      if (name === 0) return "#749AF8";
      if (name > 0 && name <= 1) return "#5CB85C";
      if (name > 1 && name <= 3) return "#F4CD41";
      if (name > 3 && name <= 7) return "#E87400";
      if (name > 7) return "#EE2E38";
      return "";
    },
    draw() {
      this.echarsInstance = echarts.init(this.$refs.bar);
      this.echarsInstance.setOption({
        xAxis: {
          show: this.showAxis,
          type: "category",
          data: this.list.map(item => {
            return item.name;
          })
        },
        yAxis:{
          show: this.showAxis,
          position: "right",
          axisLabel : { 
            formatter : "{value}%" 
          }, 
          splitLine:{ 
            show:false 
          }
        },
        tooltip: {
          trigger: "item"
        },
        series: [{
          type: "bar",
          data: this.list.map(item => {
            return item.percent * 100;
          }),
          barWidth: "50%",
          itemStyle: {
            color: params =>{
              let itemName = this.list[params.dataIndex].name;
              let name = itemName && itemName.substring(0, itemName.length - 1) || "";
              return name && this.dispatchBarColor(+name) || "";
            }
          },
          tooltip: {
            position: "top",
            formatter: params=> {
              let index = params.dataIndex;
              let item = this.list[index];
              if (this.type === "mini") {
                return `<div class="card-header">${item.name}</div>`;
              }
              return `<div class="card">
                <div class="card-header">${item.name}</div>
                <div class="card-content">${this.$t("fullNode.popover.percent")}：${item.percent * 100}%</div> 
                <div class="card-footer">${this.$t("fullNode.popover.sumPercent")}：${item.sumPercent * 100}%</div>
              </div>`;
            }
          }
        }]
      });
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "assets/css/vars.scss";
  .bar-container {
  }
</style>