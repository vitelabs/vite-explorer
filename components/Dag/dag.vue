<template>
  <div class="dag-container">
    <div class="header">
      <img src="~assets/images/dag.svg"/>
      <span>DAG 图</span>
    </div>
    <div class="content">
      <div id="main" style="width: 100%;height:430px;"></div>
    </div>
  </div>
</template>

<script>
import echarts from "echarts";
const transactionList = [
  {
    "hash": "793811be9405022969f0eed8018843eaf0d4a2fd7af432c7dbf32948064345c1",
    "shortHash": "793811...4345c1",
    "amount": "159",
    "accountAddress": "vite_098dfae02679a4ca05a4c8bf5dd00a8757f0c622bfccce7d68",
    "shortAccountAddress": "vite_098dfa...ce7d68",
    "from": "vite_098dfae02679a4ca05a4c8bf5dd00a8757f0c622bfccce7d68",
    "shortFrom": "vite_098dfa...ce7d68",
    "to": "vite_fd62268b3447eb6835e5cdde91b97340b5073cf457c5fc530d",
    "shortTo": "vite_fd6226...fc530d",
    "fromHash": null,
    "status": 1,
    "timestamp": 1536577588,
    "confirmTimes": "125",
    "confirmBlockHash": "99f49c9a6a12d3f73615d47670d2055c1197bf41416104d22a92147118661335",
    "shortConfirmBlockHash": "99f49c...661335",
    "snapshotTimestamp": "60590f98a4b86e89835b2e901dc5399b19977d5681340a8260e8debdc0f53c5b",
    "tokenName": "vite",
    "tokenSymbol": "VITE",
    "tokenId": "tti_000000000000000000004cfd",
    "fAmount": "0"
  },
  {
    "hash": "d3e13463dee1cb36f6253ed3072505255b28f278993d5fb4a0a61341f267a968",
    "shortHash": "d3e134...67a968",
    "amount": "54",
    "accountAddress": "vite_098dfae02679a4ca05a4c8bf5dd00a8757f0c622bfccce7d68",
    "shortAccountAddress": "vite_098dfa...ce7d68",
    "from": "vite_098dfae02679a4ca05a4c8bf5dd00a8757f0c622bfccce7d68",
    "shortFrom": "vite_098dfa...ce7d68",
    "to": "vite_fd62268b3447eb6835e5cdde91b97340b5073cf457c5fc530d",
    "shortTo": "vite_fd6226...fc530d",
    "fromHash": null,
    "status": 1,
    "timestamp": 1536577237,
    "confirmTimes": "165",
    "confirmBlockHash": "4a2df1d596832492f7902e762425807c74e003bd22aa81ceaed89eeb7f626d59",
    "shortConfirmBlockHash": "4a2df1...626d59",
    "snapshotTimestamp": "2b60aa81cd6fd62b85c3686befd3b25d81813a576e1f14d79b34bb0355b1de63",
    "tokenName": "vite",
    "tokenSymbol": "VITE",
    "tokenId": "tti_000000000000000000004cfd",
    "fAmount": "0"
  },
  {
    "hash": "9598bf4e5d5ddb8eb57c36936e22d851c9b25d10eb0483d99ff8a8746e8576eb",
    "shortHash": "9598bf...8576eb",
    "amount": "170",
    "accountAddress": "vite_c244a271e59da9513ac3af8fd884c8465c1363e4da0314ccdf",
    "shortAccountAddress": "vite_c244a2...14ccdf",
    "from": "vite_098dfae02679a4ca05a4c8bf5dd00a8757f0c622bfccce7d68",
    "shortFrom": "vite_098dfa...ce7d68",
    "to": "vite_c244a271e59da9513ac3af8fd884c8465c1363e4da0314ccdf",
    "shortTo": "vite_c244a2...14ccdf",
    "fromHash": "fb0903afa0a54db671c8afd1b97a687cc185983a87c31379eca24e261d708200",
    "status": 2,
    "timestamp": 1536576382,
    "confirmTimes": "259",
    "confirmBlockHash": "9510b587c5249cdc699a4fce284bf015e6ae15a3536b22952888892595b13c7a",
    "shortConfirmBlockHash": "9510b5...b13c7a",
    "snapshotTimestamp": "edb2fb42672dfb2ce5fde4076c953b56404fa1a5e546e5c0ee4d45271025d11f",
    "tokenName": "vite",
    "tokenSymbol": "VITE",
    "tokenId": "tti_000000000000000000004cfd",
    "fAmount": "0"
  },
  {
    "hash": "fb0903afa0a54db671c8afd1b97a687cc185983a87c31379eca24e261d708200",
    "shortHash": "fb0903...708200",
    "amount": "170",
    "accountAddress": "vite_098dfae02679a4ca05a4c8bf5dd00a8757f0c622bfccce7d68",
    "shortAccountAddress": "vite_098dfa...ce7d68",
    "from": "vite_098dfae02679a4ca05a4c8bf5dd00a8757f0c622bfccce7d68",
    "shortFrom": "vite_098dfa...ce7d68",
    "to": "vite_c244a271e59da9513ac3af8fd884c8465c1363e4da0314ccdf",
    "shortTo": "vite_c244a2...14ccdf",
    "fromHash": null,
    "status": 2,
    "timestamp": 1536576379,
    "confirmTimes": "260",
    "confirmBlockHash": "7fb209f1353b87a982d926f421e412f790e8a02e7cf094ea01087865ab359ca6",
    "shortConfirmBlockHash": "7fb209...359ca6",
    "snapshotTimestamp": "edb2fb42672dfb2ce5fde4076c953b56404fa1a5e546e5c0ee4d45271025d11f",
    "tokenName": "vite",
    "tokenSymbol": "VITE",
    "tokenId": "tti_000000000000000000004cfd",
    "fAmount": "0"
  },
  {
    "hash": "7d9468f3fbfdb0b533b89539c975288d467cee174dec3d7b08fd04a613373476",
    "shortHash": "7d9468...373476",
    "amount": "168",
    "accountAddress": "vite_c244a271e59da9513ac3af8fd884c8465c1363e4da0314ccdf",
    "shortAccountAddress": "vite_c244a2...14ccdf",
    "from": "vite_098dfae02679a4ca05a4c8bf5dd00a8757f0c622bfccce7d68",
    "shortFrom": "vite_098dfa...ce7d68",
    "to": "vite_c244a271e59da9513ac3af8fd884c8465c1363e4da0314ccdf",
    "shortTo": "vite_c244a2...14ccdf",
    "fromHash": "6d674a7a7c7e4064e2c0b20344ded72342c4586d7a797a91d1fc7ce39a8777a5",
    "status": 2,
    "timestamp": 1536576242,
    "confirmTimes": "275",
    "confirmBlockHash": "716bda73b486eb889870b53c83a4b1b781d334d118e9dc16f7d95c4d93796b61",
    "shortConfirmBlockHash": "716bda...796b61",
    "snapshotTimestamp": "0c4c97803c4315a449bcbad559206f1328ad78290b7bba1ff6659c8a968f43c5",
    "tokenName": "vite",
    "tokenSymbol": "VITE",
    "tokenId": "tti_000000000000000000004cfd",
    "fAmount": "0"
  },
  {
    "hash": "e090749275d610ae89ab4f251ea686b8d605e2afa2303527b1e014fd7aabd7ee",
    "shortHash": "e09074...abd7ee",
    "amount": "133",
    "accountAddress": "vite_c244a271e59da9513ac3af8fd884c8465c1363e4da0314ccdf",
    "shortAccountAddress": "vite_c244a2...14ccdf",
    "from": "vite_098dfae02679a4ca05a4c8bf5dd00a8757f0c622bfccce7d68",
    "shortFrom": "vite_098dfa...ce7d68",
    "to": "vite_c244a271e59da9513ac3af8fd884c8465c1363e4da0314ccdf",
    "shortTo": "vite_c244a2...14ccdf",
    "fromHash": "88d350c9257dfa0769279ea173dc222ae9e03e27c8fedf05275c847342f529c0",
    "status": 2,
    "timestamp": 1536576240,
    "confirmTimes": "275",
    "confirmBlockHash": "716bda73b486eb889870b53c83a4b1b781d334d118e9dc16f7d95c4d93796b61",
    "shortConfirmBlockHash": "716bda...796b61",
    "snapshotTimestamp": "81d0434d82dbc7c26d768fa5127620a7cf286305948797b2d8bf6c0a205c94a2",
    "tokenName": "vite",
    "tokenSymbol": "VITE",
    "tokenId": "tti_000000000000000000004cfd",
    "fAmount": "0"
  },
  {
    "hash": "6d674a7a7c7e4064e2c0b20344ded72342c4586d7a797a91d1fc7ce39a8777a5",
    "shortHash": "6d674a...8777a5",
    "amount": "168",
    "accountAddress": "vite_098dfae02679a4ca05a4c8bf5dd00a8757f0c622bfccce7d68",
    "shortAccountAddress": "vite_098dfa...ce7d68",
    "from": "vite_098dfae02679a4ca05a4c8bf5dd00a8757f0c622bfccce7d68",
    "shortFrom": "vite_098dfa...ce7d68",
    "to": "vite_c244a271e59da9513ac3af8fd884c8465c1363e4da0314ccdf",
    "shortTo": "vite_c244a2...14ccdf",
    "fromHash": null,
    "status": 2,
    "timestamp": 1536576237,
    "confirmTimes": "276",
    "confirmBlockHash": "9d62a758374e7ef152839aa1ce8c1a87c495c40bdcbfdba6e87c035260e2397d",
    "shortConfirmBlockHash": "9d62a7...e2397d",
    "snapshotTimestamp": "81d0434d82dbc7c26d768fa5127620a7cf286305948797b2d8bf6c0a205c94a2",
    "tokenName": "vite",
    "tokenSymbol": "VITE",
    "tokenId": "tti_000000000000000000004cfd",
    "fAmount": "0"
  },
  {
    "hash": "88d350c9257dfa0769279ea173dc222ae9e03e27c8fedf05275c847342f529c0",
    "shortHash": "88d350...f529c0",
    "amount": "133",
    "accountAddress": "vite_098dfae02679a4ca05a4c8bf5dd00a8757f0c622bfccce7d68",
    "shortAccountAddress": "vite_098dfa...ce7d68",
    "from": "vite_098dfae02679a4ca05a4c8bf5dd00a8757f0c622bfccce7d68",
    "shortFrom": "vite_098dfa...ce7d68",
    "to": "vite_c244a271e59da9513ac3af8fd884c8465c1363e4da0314ccdf",
    "shortTo": "vite_c244a2...14ccdf",
    "fromHash": null,
    "status": 2,
    "timestamp": 1536576236,
    "confirmTimes": "276",
    "confirmBlockHash": "9d62a758374e7ef152839aa1ce8c1a87c495c40bdcbfdba6e87c035260e2397d",
    "shortConfirmBlockHash": "9d62a7...e2397d",
    "snapshotTimestamp": "81d0434d82dbc7c26d768fa5127620a7cf286305948797b2d8bf6c0a205c94a2",
    "tokenName": "vite",
    "tokenSymbol": "VITE",
    "tokenId": "tti_000000000000000000004cfd",
    "fAmount": "0"
  },
  {
    "hash": "462a6af308b3d84cab8d97772a7bd2fb59a766d8dc3da676bac20b0b1b998699",
    "shortHash": "462a6a...998699",
    "amount": "135",
    "accountAddress": "vite_c244a271e59da9513ac3af8fd884c8465c1363e4da0314ccdf",
    "shortAccountAddress": "vite_c244a2...14ccdf",
    "from": "vite_098dfae02679a4ca05a4c8bf5dd00a8757f0c622bfccce7d68",
    "shortFrom": "vite_098dfa...ce7d68",
    "to": "vite_c244a271e59da9513ac3af8fd884c8465c1363e4da0314ccdf",
    "shortTo": "vite_c244a2...14ccdf",
    "fromHash": "2dab74c2457268581d6263c0a62edb35ea11f9f405baea3dc5abfa9fefe23bc8",
    "status": 2,
    "timestamp": 1536576130,
    "confirmTimes": "287",
    "confirmBlockHash": "0202e3a61b38509a87f03d90c5ce768f14d7a558324ecfbcafe152ab6b4740c7",
    "shortConfirmBlockHash": "0202e3...4740c7",
    "snapshotTimestamp": "563259053f89332a21797b45fb5a88c9ad03a6bc0f3a5e7fe9b52e6cc6075dd3",
    "tokenName": "vite",
    "tokenSymbol": "VITE",
    "tokenId": "tti_000000000000000000004cfd",
    "fAmount": "0"
  },
  {
    "hash": "daeba6461c41a2eb9124f03c337480bce2a6f32f0412f15c4818bd7009b76f0a",
    "shortHash": "daeba6...b76f0a",
    "amount": "54",
    "accountAddress": "vite_c244a271e59da9513ac3af8fd884c8465c1363e4da0314ccdf",
    "shortAccountAddress": "vite_c244a2...14ccdf",
    "from": "vite_098dfae02679a4ca05a4c8bf5dd00a8757f0c622bfccce7d68",
    "shortFrom": "vite_098dfa...ce7d68",
    "to": "vite_c244a271e59da9513ac3af8fd884c8465c1363e4da0314ccdf",
    "shortTo": "vite_c244a2...14ccdf",
    "fromHash": "fdc064ea94f58286465f08e9830585529be0273495dccbdd67cf7dd7d1d89665",
    "status": 2,
    "timestamp": 1536576128,
    "confirmTimes": "288",
    "confirmBlockHash": "63c313ce326cf16f89f9b2a707299d4541c17059a4b504f6777adfd756b972fb",
    "shortConfirmBlockHash": "63c313...b972fb",
    "snapshotTimestamp": "563259053f89332a21797b45fb5a88c9ad03a6bc0f3a5e7fe9b52e6cc6075dd3",
    "tokenName": "vite",
    "tokenSymbol": "VITE",
    "tokenId": "tti_000000000000000000004cfd",
    "fAmount": "0"
  }
];



const colors = ["#FFC313", "#F79F1E", "#EE5B24", "#EA2026"
  , "#C4E538", "#A2CB39", "#039433", "#006166"
  , "#12CBC4", "#1289A7"];

let nodes = transactionList.map((item, index)=> {
  return {
    name: item.hash,
    symbol: item.fromHash ? "react" : "circle",
    itemStyle: {
      normal: {
        color: colors[index]
      }
    }
  };
});

let nodeLinks = transactionList.map((item)=> {
  return {
    source: item.hash,
    target: item.fromHash,
  };
});

export default {
  props: {
  },
  mounted() {
    this.draw();
  },
  methods: {
    draw() {
      echarts.init(document.getElementById("main")).setOption({
        series: [{
          type: "graph",
          layout: "force",
          symbolSize: 45,
          roam: true,
          edgeSymbol: ["none", "arrow"],
          force: {
            repulsion: 2500,
            edgeLength: [10, 50]
          },
          emphasis: {
            label: {
              show: false
            }
          },
          draggable: true,
          itemStyle: {
            normal: {
              color: "#4b565b"
            }
          },
          label: {
            normal: {
              show: false
            }
          },
          lineStyle: {
            normal: {
              width: 1,
              color: "#9EA4AC"

            }
          },
          data: nodes,
          links: nodeLinks.concat({
            source: "7d9468f3fbfdb0b533b89539c975288d467cee174dec3d7b08fd04a613373476",
            target: "d3e13463dee1cb36f6253ed3072505255b28f278993d5fb4a0a61341f267a968",
            symbol: ["none", "none"]
          })
        }]
      });
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "assets/css/vars.scss";

  .dag-container {
    height: 500px;
    background: #FFFFFF;
    border: 1px solid #E5EDF3;
    box-shadow: 0 6px 36px 0 rgba(0,62,100,0.04);
    border-radius: 4px 4px 0 0;
    .header {
      box-sizing: border-box;
      border-bottom: 1px solid #E5EDF3;
      height: 70px;
      padding: 0 0 0 34px;
      line-height: 70px;
      font-weight: 500;
      font-size: 16px;
      color: $common-color;
      letter-spacing: 0.3px;
      img {
        vertical-align: middle;
        margin-right: 8px; 
      }
    }
  }
</style>
