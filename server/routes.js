import Router from "koa-trie-router";
import { get, post } from "../api/server.js";
import { toShort } from "../utils/toShort.js";
import axios from "axios";
import { mySetInterval, myClearInterval} from "../utils/myInterval.js";

const router = new Router();
var txData;
var blockData;

var txInterval = null;
var blockInterval = null;

if (blockInterval) {
  myClearInterval(blockInterval);
}
blockInterval = mySetInterval(async function () {
  let result = await post("/snapshotchain/blocklist", { count: 10, index: 0});
  let body = result.data || {
    code: 5000,
    msg: "Server Error"
  };

  if (body.code !== 0) {
    blockData = [];
    return;
  }

  let rawBlockList = body.data.blockList || [];
  let blockList = [];

  rawBlockList.forEach((block) => {
    let accountNum = 0;
    /* eslint-disable */
    for(let key in block.snapshot || {}) {
      accountNum++;
    }

    blockList.push({
      height: block.height,
      producer: block.producer,
      shortProducer: toShort(block.producer),
      accountNum,
      hash: block.hash,
      shortHash: toShort(block.hash),
      amount: block.amount,
      age: block.timestamp
    });
  });
  rawBlockList = [];
  body.data = {
    blockList,
    totalNumber: +body.data.totalNumber
  };
  blockData = body;
}, 3000);

if (txInterval) {
  myClearInterval(txInterval);
}

txInterval = mySetInterval(async function () {
  let result = await post("/accountchain/blocklist", { count: 10, index: 0});
  let body = result.data || {
    code: 5000,
    msg: "Server Error"
  };

  if (body.code !== 0) {
    txData = body;
    return;
  }
  let rawTransactionList = body.data.blockList || [];
  let transactionList = [];
  rawTransactionList.forEach((transaction) => {
    transactionList.push({
      hash: transaction.hash,
      shortHash: toShort(transaction.hash),
      amount: transaction.amount,
      accountAddress: transaction.accountAddress,
      shortAccountAddress: toShort(transaction.accountAddress),
      from: transaction.from,
      shortFrom: toShort(transaction.from),
      to: transaction.to,
      shortTo: toShort(transaction.to),
      fromHash: transaction.fromHash,
      status: transaction.status,
      timestamp: transaction.timestamp,
      confirmTimes: transaction.confirmTimes,
      confirmBlockHash: transaction.confirmBlockHash || null,
      shortConfirmBlockHash: toShort(transaction.confirmBlockHash) || null,
      snapshotTimestamp: transaction.snapshotTimestamp,
      tokenName: transaction.token && transaction.token.name || "",
      tokenSymbol: transaction.token && transaction.token.symbol || "",
      tokenId: transaction.token && transaction.token.id || null,
      fAmount: transaction.fAmount,
    });
  });

  rawTransactionList = [];
  body.data = {
    transactionList,
    totalNumber: +body.data.totalNumber
  };
  txData = body;
}, 3000);

export default () => {
  router.post("/api/block/list/topBk10", async (ctx) => {
    ctx.body = blockData;
  });
  
  router.post("/api/transaction/list/topTx10", async (ctx) => {
    ctx.body = txData;
  });

  router.post("/api/account/newtesttoken", async(ctx) => {
    try {
      let result = await post("/account/newtesttoken", ctx.request.body);
      ctx.type = "json";
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
      let result = await axios.get("https://api.coinmarketcap.com/v2/ticker/2937/");
      ctx.type = "json";
      let body = result.data;
      ctx.body = {
        data: {
          cirPrice: body.data ? body.data.quotes.USD.price : "",
          ffmCap: body.data ? body.data.quotes.USD.market_cap : "",
          volume_24h: body.data ? body.data.quotes.USD.volume_24h : "",
          percent_change_24h: body.data ? body.data.quotes.USD.percent_change_24h : "",
          circulating_supply: body.data ? body.data.quotes.USD.circulating_supply : "",
        }
      };
    } catch(err) {
      console.log(err.code);
    }
  });
  router.get("/api/account/detail", async (ctx) => {
    try {
      let result = await get("/account/detail", ctx.query);
      ctx.type = "json";
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
      let result = await post("/token/list", ctx.request.body);
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

  router.get("/api/token/detail", async (ctx) => {
    try {
      let result = await get("/token/detail", ctx.query);
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

  router.post("/api/block/list", async (ctx) => {
    try {
      let result = await post("/snapshotchain/blocklist", ctx.request.body);
      ctx.type = "json";
      let body = result.data || {
        code: 5000,
        msg: "Server Error"
      };

      if (body.code !== 0) {
        ctx.body = body;
        return;
      }

      let rawBlockList = body.data.blockList || [];
      let blockList = [];

      rawBlockList.forEach((block) => {
        let accountNum = 0;
        /* eslint-disable */
        for(let key in block.snapshot || {}) {
          accountNum++;
        }

        blockList.push({
          height: block.height,
          producer: block.producer,
          shortProducer: toShort(block.producer),
          accountNum,
          hash: block.hash,
          shortHash: toShort(block.hash),
          amount: block.amount,
          age: block.timestamp
        });
      });
      rawBlockList = [];
      body.data = {
        blockList,
        totalNumber: +body.data.totalNumber
      };
      ctx.body = body;
    } catch(err) {
      console.log(err);
      // console.log(err.code);
    }
  });

  router.get("/api/block/detail", async (ctx) => {
    try {
      let result = await get("/snapshotchain/block", ctx.query);
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
      let accountNum = 0;
      /* eslint-disable */
      for(let key in block.snapshot || {}) {
        accountNum++;
      }
      block = {
        height: block.height,
        accountNum,
        producer: block.producer,
        hash: block.hash,
        amount: block.amount,
        timestamp: block.timestamp,
        age: block.timestamp
      }

      body.data = block;
      ctx.body = body;
    } catch(err) {
      console.log(err);
      // console.log(err.code);
    }
  });

  router.get("/api/transaction/detail", async (ctx) => {
    try {
      let result = await get("/accountchain/block", ctx.query);
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
        hash: transaction.hash,
        amount: transaction.amount,
        from: transaction.from,
        to: transaction.to,
        accountAddress: transaction.accountAddress,
        fromHash: transaction.fromHash,
        status: transaction.status,
        timestamp: transaction.timestamp,
        confirmTimes: transaction.confirmTimes,
        snapshotTimestamp: transaction.snapshotTimestamp,
        tokenName: transaction.token && transaction.token.name,
        tokenSymbol: transaction.token && transaction.token.symbol || "",
        tokenId: transaction.token && transaction.token.id,
        fAmount: transaction.fAmount,
        confirmBlockHash: transaction.confirmBlockHash
      }

      body.data = transaction;
      ctx.body = body;
    } catch(err) {
      console.log(err);
      // console.log(err.code);
    }
  });

  router.post("/api/transaction/list", async (ctx) => {
    try {
      let result = await post("/accountchain/blocklist", ctx.request.body);
      ctx.type = "json";
      let body = result.data || {
        code: 5000,
        msg: "Server Error"
      };

      if (body.code !== 0) {
        ctx.body = body;
        return;
      }
      let rawTransactionList = body.data.blockList || [];
      let transactionList = [];
      rawTransactionList.forEach((transaction) => {
        transactionList.push({
          hash: transaction.hash,
          shortHash: toShort(transaction.hash),
          amount: transaction.amount,
          accountAddress: transaction.accountAddress,
          shortAccountAddress: toShort(transaction.accountAddress),
          from: transaction.from,
          shortFrom: toShort(transaction.from),
          to: transaction.to,
          shortTo: toShort(transaction.to),
          fromHash: transaction.fromHash,
          status: transaction.status,
          timestamp: transaction.timestamp,
          confirmTimes: transaction.confirmTimes,
          confirmBlockHash: transaction.confirmBlockHash || null,
          shortConfirmBlockHash: toShort(transaction.confirmBlockHash) || null,
          snapshotTimestamp: transaction.snapshotTimestamp,
          tokenName: transaction.token && transaction.token.name || "",
          tokenSymbol: transaction.token && transaction.token.symbol || "",
          tokenId: transaction.token && transaction.token.id || null,
          fAmount: transaction.fAmount,
        });
      });

      rawTransactionList = [];
      body.data = {
        transactionList,
        totalNumber: +body.data.totalNumber
      };
      ctx.body = body;
    } catch(err) {
      console.log(err);
      // console.log(err.code);
    }
  });

  // router.get("/api/general/detail", async (ctx) => {
  //   try {
  //     let result = await get("/general/detail");
  //     ctx.type = "json";
  //     ctx.body = result.data || {
  //       code: 5000,
  //       msg: "Server Error"
  //     };
  //   } catch(err) {
  //     console.log(err.code);
  //   }
  // });

  router.get("/api/search/judgeTransOrBlock", async (ctx) => {
    try {
      let transactionDetail = await get("/accountchain/block", { blockHash: ctx.query.addr });
      let blockDetail = await get("/snapshotchain/block", { blockHash: ctx.query.addr });
      let judgeString = 'null';
      if (transactionDetail.data.code !== 0) {
        transactionDetail.data.data = null;
      }
      if (blockDetail.data.code !== 0) {
        blockDetail.data.data = null;
      }
      if (transactionDetail.data.data && !blockDetail.data.data) {
        judgeString = 'transaction';
      }
      if (!transactionDetail.data.data && blockDetail.data.data) {
        judgeString = 'block';
      }
      ctx.body = {
        code: 0,
        data: judgeString,
        msg: 'ok'
      }
      return;
    } catch(err) {
      console.log('err', err);
    }
  });

  router.get("/api/search/tokenNameOrSymbol", async (ctx) => {
    try {
      let nameResult = await get("/token/detail", { tokenName: ctx.query.str });
      let symbolResult= await get("/token/detail", { tokenSymbol: ctx.query.str });

      let tokenNameList = [];
      let tokenSymbolList = [];

      if (nameResult.data.code === 0) {
        tokenNameList = nameResult.data.data.tokenList || [];
      }
      if (symbolResult.data.code === 0) {
        tokenSymbolList = symbolResult.data.data.tokenList || [];
      }

      let tokenList = tokenNameList.concat(tokenSymbolList) || [];
      if (tokenNameList.length === 1 && !tokenSymbolList.length) {
        tokenList = tokenNameList;
      }
      if (tokenSymbolList.length === 1 && !tokenNameList.length) {
        tokenList = tokenSymbolList;
      }
      return ctx.body = {
        code: 0,
        data: tokenList,
        msg: 'ok'
      };
    } catch(err) {
      console.log('err', err);
    }
  });

  return router.middleware();
};
