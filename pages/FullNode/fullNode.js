const defaultGeneralView = {
  latestSnapshotBlockHeight: null,
  onlineNum: null,
  sysTime: null,
  totalNum: null
};

const defaultPercent = {
  name: null,
  percent: null,
  sumPercent: null
};

const defaultNodeList = {
  uniqId: 0,
  status: -1,
  nodeName: null,
  nodeSysInfo: null,
  nodeDelayTime: null,
  peersNum: null,
  latestBlockHeight: null,
  latestBlockTime: null,
  broadcastTime: null,
  avgBroadcastTime: null,
  onlinePercent: null,
  ipInfo: {
    area_code: 0,
    country_name: "USA", 
    found: 0,
    lat: 0.0,
    lng: 0.0,
    metro_code: 0,
    region_name: "California"
  }
};

class FullNode_WS {
  constructor(
    nodeViewList,
    config,
    url = "wss://stats.vite.net/ws/user/aaaa"
  ) {
    this.url = url;
    this.config = config;
    this.nodeViewList = nodeViewList;
    this.socket = null;

    this.generalView = { ...defaultGeneralView };  // generalMsg
    this.percents = [{ ...defaultPercent }];     // block broadcast
    this.mapList = [{ ...defaultNodeList }];      // map
    this.connect();
  }

  connect() {
    /* eslint-disable */
    let wsCtor = window["MozWebSocket"] ? MozWebSocket : WebSocket;
    /* eslint-disable */
    this.socket = new wsCtor(this.url);
    this.socket.onopen = this.onOpen.bind(this);
    this.socket.onmessage = this.onUpdate.bind(this);
    this.socket.onerror = this.onError.bind(this);
    this.socket.onclose = this.onClose.bind(this);
  }

  onOpen() {
    console.log("WebSocket Connection Open.");
  }
  
  onUpdate(msg) {
    let command = JSON.parse(msg.data);
    this.dispatchMsg(command.method, command.data);
  }

  send(msg) {
    this.socket.send(JSON.stringify(msg));
  }

  onError(event) {
    console.error("WebSocket error observed:", event);
  }

  dispatchMsg(method, data) {
    if (method === 'generalview') {
      this.generalView = data;
    } else if (method === 'blockbroadcastview') {
      this.percents = data.percents;
    } else if(method === 'nodelocationlistview') {
      this.mapList = data.nodeViewList;
    } else if (method === 'nodelistview') {
  
      data.nodeViewList.forEach((newitem) => {
        let olditemIndex = this.nodeViewList.findIndex(oldItem=>{
          
          return oldItem.uniqId === newitem.uniqId;
        })
        if(olditemIndex > -1) {
          newitem.weight = this.nodeViewList[olditemIndex].weight
          newitem.originIndex = this.nodeViewList[olditemIndex].originIndex
          this.nodeViewList.splice(olditemIndex, 1, newitem);
        } else {
          this.nodeViewList.push({
            ...newitem,
            originIndex: this.nodeViewList.length,
            tag: 0,
            weight: 0
          })
        }
      })
    }
  }
  
  onClose() {
    console.log("WebSocket is closed now.");
    // this.reconnect();
  }

  close() {
    this.socket.close();
    console.log("WebSocket Connection Closed.");
  }

  reconnect() {
    console.log("try to reconnect");
    this.close();
    this.connect();
  }
}

export default FullNode_WS;
