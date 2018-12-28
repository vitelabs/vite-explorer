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

import { mySetInterval, myClearInterval } from "~/utils/myInterval.js";
class FullNode_WS {
  constructor(
    url,
    overtime = 60000
  ) {
    this.url = url;
    this.socket = null;
    this.interval = null;
    this.overtime = overtime;
    this.lastMsgTime = Date.now();
    
    this.generalView = { ...defaultGeneralView };  // generalMsg
    this.percents = [{ ...defaultPercent }];     // block broadcast
    this.mapList = [{ ...defaultNodeList }];      // map
    this.networkList = [];
    this.connect();
    this.interval = mySetInterval(()=> {
      this.checkConnect();
    }, 5000);
  }

  connect() {
    if (this.interval) {
      myClearInterval(this.interval);
    }
    /* eslint-disable */
    let wsCtor = window["MozWebSocket"] ? MozWebSocket : WebSocket;
    /* eslint-disable */
    this.socket = new wsCtor(this.url);
    this.socket.onopen = this.onOpen.bind(this);
    this.socket.onmessage = this.onUpdate.bind(this);
    this.socket.onerror = this.onError.bind(this);
    this.socket.onclose = this.onClose.bind(this);
  }

  checkConnect() {
    if (Date.now() - this.lastMsgTime > this.overtime) {
      console.log("heartbeat");
      this.reconnect();
    }
  }

  onOpen() {
    console.log("WebSocket Connection Open.");
  }
  
  onUpdate(msg) {
    this.lastMsgTime = Date.now();
    let command = JSON.parse(msg.data);
    this.dispatchMsg(command.method, command.data);
  }

  send(msg) {
    this.socket.send(JSON.stringify(msg));
  }

  onError(event) {
    console.error("WebSocket error observed:", event);
    // this.reconnect();
    // this.interval = mySetInterval(()=> {
    //   this.reconnect();
    // }, 10000)
  }

  dispatchMsg(method, data) {
    if (method === 'generalview') {
      this.generalView = data;
    } else if (method === 'blockbroadcastview') {
      this.percents = data.percents;
    } else if(method === 'nodelocationlistview') {
      this.mapList = data.nodeViewList;
    } else if (method === 'nodelistview') {
      this.networkList = data.nodeViewList;
    }
  }
  
  onClose() {
    console.log("WebSocket is closed now.");
  }

  close() {
    this.socket.close();
    console.log("WebSocket Connection Closed.");
  }

  reconnect() {
    console.log("try to reconnect");
    if (this.interval) {
      myClearInterval(this.interval);
    }
    this.close();
    this.connect();
  }
}

export default FullNode_WS;
