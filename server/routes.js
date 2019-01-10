import Router from "koa-trie-router";
import { get, post } from "./server.js";
import { toShort, handleBigNum, formatTx } from "../utils/util.js";
import { mySetInterval, myClearInterval} from "../utils/myInterval.js";
import fs from "fs";
import path from "path";


process.env["NODE_CONFIG_DIR"] = path.resolve(__dirname , "./config");
console.log("NODE_CONFIG_DIR", process.env["NODE_CONFIG_DIR"]);
const config = require("config");

let { explorerApi, sbpDetailApi, statsApi } = config;

const defaultTxData = {
  code: 0,
  msg: "ok",
  data: {
    transactionList: []
  }
};

const defaultBlockData = {
  code: 0,
  msg: "ok",
  data: {
    blockList: []
  }
};

const router = new Router();
var txData = defaultTxData;
var blockData = defaultBlockData;
var graphData = defaultTxData;

var myInterval = null;
var graphInterval = null;

if (myInterval) {
  myClearInterval(myInterval);
}
myInterval = mySetInterval(async function() {
  let requestBody = {
    request: {
      body: {
        paging: {
          count: 10, index: 1
        }
      }
    }
  };
  blockData = defaultBlockData; 
  txData = defaultTxData;
  blockData = await getBlockList(requestBody);
  txData = await getTransactionList(requestBody);
}, 1000);

if (graphInterval) {
  myClearInterval(graphInterval);
}
graphInterval = mySetInterval(async function() {
  graphData = defaultTxData;
  graphData = await getGraphList();
}, 15000);

async function getGraphList() {
  let result = await post(explorerApi + "/accountchain/blocklistgraph", {});
  let body = result.data || {
    code: 5000,
    msg: "Server Error"
  };

  if (body.code !== 0) {
    graphData = body;
    return graphData;
  }
  let rawTransactionList = body.data.blockList || [];
  let transactionList = [];
  rawTransactionList.forEach((transaction) => {
    transactionList.push({
      ...transaction,
      shortHash: toShort(transaction.hash),
      amount: handleBigNum(transaction.amount, transaction.token && transaction.token.decimals || 0, true),
      shortAccountAddress: toShort(transaction.accountAddress),
      shortFrom: toShort(transaction.from),
      shortTo: toShort(transaction.to),
      confirmBlockHash: transaction.confirmBlockHash || null,
      shortConfirmBlockHash: toShort(transaction.confirmBlockHash) || null,
      tokenName: transaction.token && transaction.token.name || "",
      tokenSymbol: transaction.token && transaction.token.symbol || "",
      tokenId: transaction.token && transaction.token.id || null,
      decimals: transaction.token && transaction.token.decimals || 0
    });
  });

  rawTransactionList = [];
  body.data = {
    transactionList,
    totalNumber: +body.data.totalNumber,
    pageTotalNumber: +body.data.pageTotalNumber || 0
  };
  graphData = body;
  return graphData;
}

async function getBlockList(ctx) {
  let result = await post(explorerApi + "/snapshotchain/blocklist", ctx.request.body);
  let body = result.data || {
    code: 5000,
    msg: "Server Error"
  };

  if (body.code !== 0) {
    blockData = body;
    return blockData;
  }

  let rawBlockList = body.data.blockList || [];
  let blockList = [];

  rawBlockList.forEach((block) => {
    blockList.push({
      ...block,
      shortProducer: toShort(block.producer),
      shortHash: toShort(block.hash),
      amount: handleBigNum(block.amount, true),
      age: block.timestamp
    });
  });
  rawBlockList = [];
  body.data = {
    blockList,
    totalNumber: +body.data.totalNumber,
    pageTotalNumber: +body.data.pageTotalNumber || 0
  };
  blockData = body;
  return blockData;
}


async function getTransactionList(ctx) {
  let result = {};
  if(!ctx.request.body.onRoad) {
    result = await post(explorerApi + "/accountchain/blocklist", ctx.request.body);
  } else {
    ctx.request.body.status = 1;
    result = await post(explorerApi + "/accountchain/blocklistonroad", ctx.request.body);
  }
  let body = result.data || {
    code: 5000,
    msg: "Server Error"
  };

  if (body.code !== 0) {
    txData = body;
    return txData;
  }
  let rawTransactionList = body.data.blockList || [];
  let transactionList = [];
  rawTransactionList.forEach((transaction) => {
    transactionList.push({
      ...transaction,
      shortHash: toShort(transaction.hash),
      amount: handleBigNum(transaction.amount, transaction.token && transaction.token.decimals || 0, true),
      shortAccountAddress: toShort(transaction.accountAddress),
      shortFrom: toShort(transaction.from),
      shortTo: toShort(transaction.to),
      confirmBlockHash: transaction.confirmBlockHash || null,
      shortConfirmBlockHash: toShort(transaction.confirmBlockHash) || null,
      tokenName: transaction.token && transaction.token.name || "",
      tokenSymbol: transaction.token && transaction.token.symbol || "",
      tokenId: transaction.token && transaction.token.id || null,
      decimals: transaction.token && transaction.token.decimals || 0
    });
  });

  rawTransactionList = [];
  body.data = {
    transactionList,
    totalNumber: +body.data.totalNumber,
    pageTotalNumber: +body.data.pageTotalNumber || 0
  };
  txData = body;
  return txData;
}


export default () => {
  router.get("/api/stats/pageDelay", async (ctx) => {
    let time = await get(statsApi + "/getDelayTime");
    ctx.body = {
      code: 0,
      msg: "ok",
      data: time.data
    };
  });

  router.get("/api/walletapp/version", async (ctx) => {
    let data = fs.readFileSync("/var/www/walletapp/versions/version.json", "utf8");
    ctx.body = {
      code: 0,
      data: JSON.parse(data),
      msg: "ok"
    };
  });
  router.post("/api/block/list/topBk10", async (ctx) => {
    if (blockData.data && !blockData.data.blockList.length) {
      ctx.body = await getBlockList(ctx);
    } else {
      ctx.body = blockData;
    }
  });

  router.post("/api/block/list", async (ctx) => {
    ctx.body = await getBlockList(ctx);
  });

  router.post("/api/transaction/graph/list", async (ctx) => {
    if (graphData.data && !graphData.data.transactionList.length) {
      ctx.body = await getGraphList();
    } else {
      ctx.body = graphData;
    }
  });
  
  router.post("/api/transaction/list/topTx10", async (ctx) => {
    if (txData.data && !txData.data.transactionList.length) {
      ctx.body = await getTransactionList(ctx);
    } else {
      ctx.body = txData;
    }
  });

  router.post("/api/transaction/list", async (ctx) => {
    ctx.body = await getTransactionList(ctx);
  });

  router.post("/api/account/newtesttoken", async(ctx) => {
    try {
      console.log(ctx.path + ":" + JSON.stringify(ctx.request.body));
      let result = await post(explorerApi + "/account/newtesttoken", ctx.request.body);
      ctx.type = "json";
      ctx.body = result.data || {
        code: 5000,
        msg: "Server Error"
      };
    } catch(err) {
      console.log(err.code);
    }
  });

  router.get("/api/general/market", async(ctx) => {
    try {
      let result = await get("https://api.coinmarketcap.com/v2/ticker/2937/");
      ctx.type = "json";
      let body = result.data;
      ctx.body = {
        data: {
          cirPrice: body.data ? body.data.quotes.USD.price : "",
          ffmCap: body.data ? handleBigNum(body.data.quotes.USD.market_cap, false, true) : "",
          volume_24h: body.data ? handleBigNum(body.data.quotes.USD.volume_24h, false, true) : "",
          percent_change_24h: body.data ? body.data.quotes.USD.percent_change_24h : "",
          circulating_supply: body.data ? body.data.quotes.USD.circulating_supply : "",
        }
      };
    } catch(err) {
      console.log(err.code);
    }
  });

  router.get("/api/general/notice", async(ctx) => {
    try {
      let result = await get(explorerApi + "/notice/list", ctx.query);
      ctx.body = result.data || {
        code: 5000,
        msg: "Server Error"
      };
    } catch(err) {
      console.log(err.code);
    }
  });

  router.get("/api/general/detail", async(ctx) => {
    try {
      let generalBody= await get(explorerApi + "/general/detail", ctx.query);
      ctx.type = "json";
      let generalDetail = generalBody.data;
      ctx.body = {
        data: {
          chainHeight: generalDetail.data.chainHeight || "0",
          sysTps: generalDetail.data.sysTps || "0",
          avgTime: generalDetail.data.avgTime || "0",
          txTotalTAmount: formatTx(generalDetail.data.txTotalTAmount) || "0",
          txMonAmount: formatTx(generalDetail.data.txMonAmount) || "0"
        }
      };
    } catch(err) {
      console.log(err.code);
    }
  });
  router.get("/api/account/detail", async (ctx) => {
    try {
      console.log("/account/detail:" + JSON.stringify(ctx.query));
      let result = await get(explorerApi + "/account/detail", ctx.query);
      ctx.type = "json";
      ctx.body = result.data || {
        code: 5000,
        msg: "Server Error"
      };
    } catch(err) {
      console.log(err.code);
    }
  });

  router.post("/api/account/list", async (ctx) => {
    try {
      console.log(ctx.path + ":" + JSON.stringify(ctx.request.body));
      let result = await post(explorerApi + "/token/accountList", ctx.request.body);
      ctx.type = "json";

      result.data.data.tokenAccountViewList.forEach(item=> {
        item.shortAccountAddress = toShort(item.accountAddress);
      });
      ctx.body = result.data || {
        code: 5000,
        msg: "Server Error"
      };
    } catch(err) {
      console.log(err.code);
    }
  });

  router.post("/api/token/list", async (ctx) => {
    try {
      console.log("/token/list:"+ JSON.stringify(ctx.request.body));
      let result = await post(explorerApi + "/token/list", ctx.request.body);
      ctx.type = "json";
      ctx.body = result.data || {
        code: 5000,
        msg: "Server Error"
      };
    } catch(err) {
      console.log(err);
      // console.log(err.code);
    }
  });

  router.post("/api/node/list", async (ctx) => {
    try {
      console.log("/supernode/list:"+ JSON.stringify(ctx.request.body));
      let result = await post(explorerApi + "/supernode/list", ctx.request.body);
      result.data.data.nodeList.forEach(item=> {
        if (item.voteNum !== 0 && !item.voteNum ) item.voteNum = "";
        item.voteNum = handleBigNum(item.voteNum+"", 0 , false, true);
        item.voteAward = handleBigNum(item.voteAward, 0 , false, true);
        item.superNodeAward = handleBigNum(item.superNodeAward, 0 , false, true);
        item.shortProducerAddress = toShort(item.producerAddress);
      });
      ctx.body = result.data || {
        code: 5000,
        msg: "Server Error"
      };
    } catch(err) {
      console.log(err);
      // console.log(err.code);
    }
  });
  
  router.post("/api/node/detail", async (ctx) => {
    try {
      console.log("/supernode/detail:"+ JSON.stringify(ctx.request.body));
      let result = await post(explorerApi + "/supernode/detail", ctx.request.body);
      ctx.body = result.data || {
        code: 5000,
        msg: "Server Error"
      };
    } catch(err) {
      console.log(err);
      // console.log(err.code);
    }
  });
  
  router.get("/api/node/supernode/cycleExcel", async (ctx) => {
    try {
      console.log("/supernode/cycleExcel:" + JSON.stringify(ctx.query));
      let result = await get(sbpDetailApi + "/reward/cycle/query");
      let cycleList = result.data.data || [];
      cycleList = cycleList.map(item=> {
        return {
          ...item,
          beginTime: new Date(+item.beginTime).toLocaleString(),
          endTime: new Date(+item.endTime).toLocaleString()
        };
      });
      result.data.data= cycleList;
      ctx.body = result.data;
    } catch(err) {
      console.log(err.code);
    }
  });

  router.get("/api/node/supernode/detail", async (ctx) => {
    try {
      console.log("/supernode/detail:"+ JSON.stringify(ctx.query));
      let result = await get(sbpDetailApi + "/reward/node/queryDetails", ctx.query);
      ctx.body = result.data || {
        code: 5000,
        msg: "Server Error"
      };
    } catch(err) {
      console.log(err);
      // console.log(err.code);
    }
  });

  // loop sbplist
  router.post("/api/node/supernode/list/cursbp", async (ctx) => {
    try {
      console.log("/supernode/cursbp:"+ JSON.stringify(ctx.request.body));
      let result = await post(explorerApi + "/supernode/cursbp", ctx.request.body);
      ctx.body = result.data || {
        code: 5000,
        msg: "Server Error"
      };
    } catch(err) {
      console.log(err);
    }
  });

  router.post("/api/node/supernode/detail/producer/list", async (ctx) => {
    try {
      console.log("/supernode/getSuperNodeDetail:"+ JSON.stringify(ctx.request.body));
      let result = await post(explorerApi + "/supernode/getSuperNodeDetail", ctx.request.body);
      ctx.body = result.data || {
        code: 5000,
        msg: "Server Error"
      };
    } catch(err) {
      console.log(err);
    }
  });

  router.get("/api/token/detail", async (ctx) => {
    try {
      let result = await get(explorerApi + "/token/detail", ctx.query);
      ctx.type = "json";
      ctx.body = result.data || {
        code: 5000,
        msg: "Server Error"
      };
    } catch(err) {
      console.log(err);
      // console.log(err.code);
    }
  });

  router.get("/api/block/detail", async (ctx) => {
    try {
      let result = await get(explorerApi + "/snapshotchain/block", ctx.query);
      ctx.type = "json";
      let body = result.data || {
        code: 5000,
        msg: "Server Error"
      };

      if (body.code !== 0) {
        ctx.body = body;
        return;
      }

      let block = body.data || {};
      block = {
        ...block,
        amount: handleBigNum(block.amount),
        age: block.timestamp
      };

      body.data = block;
      ctx.body = body;
    } catch(err) {
      console.log(err);
      // console.log(err.code);
    }
  });

  router.get("/api/transaction/detail", async (ctx) => {
    try {  
      let result = await get(explorerApi + "/accountchain/block", ctx.query);
      ctx.type = "json";
      let body = result.data || {
        code: 5000,
        msg: "Server Error"
      };

      if (body.code !== 0) {
        ctx.body = body;
        return;
      }

      let transaction = body.data || {};
      transaction = {
        ...transaction,
        amount: handleBigNum(transaction.amount, transaction.token && transaction.token.decimals || 0),
        tokenName: transaction.token && transaction.token.name,
        tokenSymbol: transaction.token && transaction.token.symbol || "",
        tokenId: transaction.token && transaction.token.id,
        decimals: transaction.token && transaction.token.decimals || 0,
      };
      body.data = transaction;
      console.log(JSON.stringify(body.data));
      ctx.body = body;
    } catch(err) {
      console.log(err);
      // console.log(err.code);
    }
  });

  router.get("/api/transaction/timeline", async (ctx) => {
    try {
      let result = await get(explorerApi + "/transaction/timeline");
      ctx.type = "json";
      ctx.body = result.data || {
        code: 5000,
        msg: "Server Error"
      };
    } catch(err) {
      console.log(err.code);
    }
  });

  router.get("/api/search/judgeTransOrBlock", async (ctx) => {
    try {
      console.log("/api/search/judgeTransOrBlock:"+ ctx.query.addr);
      let transactionDetail = await get(explorerApi + "/accountchain/block", { blockHash: ctx.query.addr });
      let blockDetail = await get(explorerApi + "/snapshotchain/block", { blockHash: ctx.query.addr });
      let judgeString = "null";
      if (transactionDetail.data.code !== 0) {
        transactionDetail.data.data = null;
      }
      if (blockDetail.data.code !== 0) {
        blockDetail.data.data = null;
      }
      if (transactionDetail.data.data && !blockDetail.data.data) {
        judgeString = "transaction";
      }
      if (!transactionDetail.data.data && blockDetail.data.data) {
        judgeString = "block";
      }
      ctx.body = {
        code: 0,
        data: judgeString,
        msg: "ok"
      };
      return;
    } catch(err) {
      console.log("err", err);
    }
  });

  router.get("/api/search/tokenNameOrSymbol", async (ctx) => {
    try {
      console.log("/api/search/tokenNameOrSymbol:"+ ctx.query.str);
      let symbolResult= await get(explorerApi + "/token/detail", { tokenSymbol: ctx.query.str });
      let tokenSymbolList = [];

      if (symbolResult.data.code === 0) {
        tokenSymbolList = symbolResult.data.data.tokenList || [];
      }

      let tokenList = tokenSymbolList || [];
      return ctx.body = {
        code: 0,
        data: tokenList,
        msg: "ok"
      };
    } catch(err) {
      console.log("err", err);
    }
  });

  return router.middleware();
};
