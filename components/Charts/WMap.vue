<template>
  <div class="map-container">
    <div class="content">
      <div id="map" style="width: 100%; height: 173px;"></div>
    </div>
  </div>
</template>

<script>
import echarts from "echarts";
require("echarts/map/js/world.js");

export default {
  props: {
    list: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      mapInstance: null
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
    fetchList() {},
    clear() {
      this.mapInstance.clear();
    },
    draw() {
      this.mapInstance = echarts.init(document.getElementById("map"));
      this.mapInstance.setOption({
        geo: {
          roam: true,
          map: "world",
          layoutCenter: ["50%", "70%"],
          layoutSize: 500,
          itemStyle: {
            normal: {
              areaColor: "rgba(85,122,198,0.25)",
              borderWidth: 0
            }
          }
        },
        // series: [defaultSeriesOptions]
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