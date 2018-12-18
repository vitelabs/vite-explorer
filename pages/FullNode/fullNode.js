class FullNode_WS {
  constructor(
    url = "ws://123.207.109.139:8080/ws/user/aa"
  ) {
    this.url = url;
    this.socket = null;
    this.array = [];

    this.connect();
  }

  connect() {
    /* eslint-disable */
    let wsCtor = window["MozWebSocket"] ? MozWebSocket : WebSocket;
    /* eslint-disable */
    this.socket = new wsCtor(this.url);
    this.socket.onopen = this.handleWSOpen.bind(this);
    this.socket.onmessage = this.handleWSMsg.bind(this);
  }

  handleWSOpen() {
    this.socket.send("Hello Server!");
    console.log("WebSocket Connection Open.");
  }
  
  handleWSMsg(msg) {
    let command = JSON.parse(msg.data);
    this.array.push(command);
    console.log(this.array);
  }

  handleWSClose() {
    this.socket.close();
    console.log("WebSocket Connection Closed.");
  }
}

export default FullNode_WS;
