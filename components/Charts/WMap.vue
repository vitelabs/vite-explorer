<template>
  <div class="map-container">
    <div class="content">
      <div id="map" :style="isMobile ? 'width: 100%; height: 190px;' : 'width: 100%; height: 218px;'"></div>
    </div>
  </div>
</template>

<script>
import echarts from "echarts";
require("echarts/map/js/world.js");
import isMobile from "is-mobile";

export default {
  props: {
    list: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      mapInstance: null,
      isMobile: isMobile()
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
      this.mapInstance.clear();
    },
    convertData() {
      let res = [];
      for (var i = 0; i < this.list.length; i++) {
        if (this.list[i].ipInfo && this.list[i].ipInfo.lng) {
          res.push({
            name: this.$t("fullNode.popover.nodeName"),
            value: [this.list[i].ipInfo.lng, this.list[i].ipInfo.lat, this.list[i].nodeName]
          });
        }
      }
      return res;
    },
    draw() {
      this.mapInstance = echarts.init(document.getElementById("map"));
      this.mapInstance.setOption({
        tooltip: {
          trigger: "item",
          formatter: function (params) {
            return params.name + " : " + params.value[2];
          }
        },
        geo: {
          roam: true,
          map: "world",
          layoutCenter: ["50%", "53%"],
          layoutSize: this.isMobile ? 300 : 500,
          itemStyle: {
            normal: {
              areaColor: "rgba(85,122,198,0.25)",
              borderWidth: 0
            }
          }
        },
        series: [{
          type: "scatter",
          coordinateSystem: "geo",
          symbolSize: 5,
          data: this.convertData()
        }]
      },true);
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "assets/css/vars.scss";
.map-container {
}
</style>