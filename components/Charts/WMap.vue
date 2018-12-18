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

// const nodeViewList = [{
//   "avgBroadcastTime": 0,
//   "broadcastTime": 0,
//   "getAvgBroadcastTime": 0,
//   "ipInfo": {
//     "area_code": 0,
//     "country_name": "USA",
//     "found": 0,
//     "lat": 31.0,
//     "lng": 111.0,
//     "metro_code": 0,
//     "region_name": "California"
//   },
//   "latestBlockHeight": 0,
//   "latestBlockTime": 0,
//   "nodeDelayTime": 0,
//   "nodeName": "AAABBB",
//   "onlinePercent": 0.0,
//   "peersNum": 0
// }, {
//   "avgBroadcastTime": 0,
//   "broadcastTime": 0,
//   "getAvgBroadcastTime": 0,
//   "ipInfo": {
//     "area_code": 0,
//     "country_name": "USA",
//     "found": 0,
//     "lat": 36.0,
//     "lng": 87.0,
//     "metro_code": 0,
//     "region_name": "California"
//   },
//   "latestBlockHeight": 0,
//   "latestBlockTime": 0,
//   "nodeDelayTime": 0,
//   "nodeName": "AAA",
//   "onlinePercent": 0.0,
//   "peersNum": 0
// }];

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
  },
  methods: {
    clear() {
      this.mapInstance.clear();
    },
    convertData() {
      let res = [];
      for (var i = 0; i < this.list.length; i++) {
        res.push({
          name: "节点名称",
          value: [this.list[i].ipInfo.lng, this.list[i].ipInfo.lat, this.list[i].nodeName]
        });
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
          layoutCenter: ["50%", "70%"],
          layoutSize: 500,
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