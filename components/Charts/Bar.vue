<template>
  <div class="bar-container">
    <div class="content">
      <div :style="barStyle" ref="bar"></div>
    </div>
  </div>
</template>

<script>
import echarts from "echarts";

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
  },
  methods: {
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