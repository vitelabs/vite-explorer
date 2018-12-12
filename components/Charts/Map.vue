<template>
  <div class="map-container">
    <div class="content">
      <div id="main" style="width: 100%; height: 172px"></div>
    </div>
  </div>
</template>

<script>
import echarts from "echarts";


const colors = ["rgb(164,205,238)","rgb(42,170,227)","rgb(25,46,94)","rgb(195,229,235)"];

const defaultSeriesOptions = {
  type: "bar",
  data: [120, 200, 150, 80],
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
          data: ["鲜花", "星星", "香蕉", "嫌弃"]
        },
        yAxis: {
          type: "value"
        },
        series: [defaultSeriesOptions]
      });
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "assets/css/vars.scss";
  .map-container {
  }
</style>