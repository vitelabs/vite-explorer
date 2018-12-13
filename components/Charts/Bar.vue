<template>
  <div class="bar-container">
    <div class="content">
      <div id="main" style="width: 100%; height: 225px; margin-top: -32px;"></div>
    </div>
  </div>
</template>

<script>
import echarts from "echarts";


const colors = ["rgb(164,205,238)","rgb(42,170,227)","rgb(25,46,94)","rgb(195,229,235)"];

const defaultSeriesOptions = {
  type: "bar",
  data: [10, 20, 30, 40, 50, 60],
  itemStyle: {
    color: function (params){
      let colorList = colors;
      return colorList[params.dataIndex];
    }
  }
};

export default {
  props: {
    list: {
      type: Array,
      default: ()=> []
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
    draw() {
      this.echarsInstance = echarts.init(document.getElementById("main"));
      this.echarsInstance.setOption({
        xAxis: {
          type: "category",
          data: ["0s", "2s", "4s", "6s", "8s", "10s"]
        },
        yAxis:{ 
          position: "right"
        },
        series: [defaultSeriesOptions]
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