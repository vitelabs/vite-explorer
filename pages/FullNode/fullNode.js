function FullNode() {
  this.socket = null;
  this.array = [];
}

FullNode.prototype.connect = function(url) {
  /* eslint-disable */
  let wsCtor = window["MozWebSocket"] ? MozWebSocket : WebSocket;
  /* eslint-disable */
  this.socket = new wsCtor(url);
  this.socket.onopen = this.handleWSOpen.bind(this);
  this.socket.onmessage = this.handleWSMsg.bind(this);
};

FullNode.prototype.handleWSOpen = function() {
  this.socket.send("Hello Server!");
  console.log("WebSocket Connection Open.");
};

FullNode.prototype.handleWSMsg = function(msg) {
  let command = JSON.parse(msg.data);
  this.array.push(command);
};

FullNode.prototype.handleWSClose = function() {
  this.socket.close();
  console.log("WebSocket Connection Closed.");
};

export default FullNode;
