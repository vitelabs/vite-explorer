import { mySetInterval, myClearInterval } from "../myInterval.js";

// const HEARTBEAT = 10000;
const MaxRetryTimes = 5;
const RetryInterval = 3000;
const OVERTIME = 60000;


class WsClient {
  constructor(
    wsUrl,
    callback,
    isRetry = true
  ) {
    this.wsUrl = wsUrl;
    this.isRetry = isRetry;
    
    this.socket = null;
    this.callback = callback;

    this.retryTimes = 0;

    this.lastMsgTime = null;

    // this._heartBeat = mySetInterval(()=> {
    //   this.send("");
    // }, HEARTBEAT);

    window.onbeforeunload = () => {
      this.close();
    };

    this.createConnect();

    this.interval = mySetInterval(()=> {
      this.checkConnect();
    }, 5000);

  }

  get ready() {
    return this.socket && this.socket.readyState === 1;
  }

  get closed() {
    return !this.socket || (this.socket && this.socket.readyState === 3);
  }

  checkConnect() {
    if (this.lastMsgTime && (Date.now() - this.lastMsgTime > OVERTIME)) {
      console.log(`message over ${OVERTIME} ms, reconnect`);
      this.retryConnect();
    }
  }

  createConnect() {
    console.log("create connect");
    this.socket = new WebSocket(this.wsUrl);

    this.socket.onopen = () => {
      // this.send("");
    };
 
    this.socket.onclose = () => {
      console.log("[WebSocket closed]");
      this.retryConnect();
    };

    this.socket.onmessage = (e) => {
      this.lastMsgTime = Date.now();
      let msg = JSON.parse(e.data);
      this.callback && this.callback(msg);
    };
  }

  send(msg) {
    if (!this.ready || this.closed) return;
    console.log("real senddddd", msg);
    this.socket.send(JSON.stringify(msg));
  }

  close() {
    if (!this.socket) {
      return;
    }
    this.interval && myClearInterval(this.interval);
    // this._heartBeat && myClearInterval(this._heartBeat);
    console.log("client close connect");
    this.socket.close();
  }

  retryConnect() {
    if (!this.isRetry || this.ready) {
      return;
    }
    if (navigator && !navigator.onLine) {
      window.addEventListener("online", () => {
        this.retryConnect();
      });
      return;
    }

    if (this.retryTimes > MaxRetryTimes) {
      this.retryTimes = 0;
      return;
    }

    setTimeout(()=> {
      console.log("retry    connect");
      this.createConnect();
      this.retryTimes++;
    }, RetryInterval);
  }
}

export default WsClient;
