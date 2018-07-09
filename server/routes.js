import Router from "koa-trie-router";
import {get, post} from "../api/server.js";

const router = new Router();

export default () => {
  router.get("/api/account/detail", async (ctx) => {
    try {
      let result = await get("/account", ctx.query);
      ctx.type = "json";
      ctx.body = result.data || {
        code: 5000,
        msg: "server error"
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
        msg: "server error"
      };
    } catch(err) {
      // console.log(err);
      // console.log(err.code);
    }  
  });

  router.get("/api/token/detail", async (ctx) => {
    try {
      let result = await get("/token/detail", ctx.query);
      ctx.type = "json";
      ctx.body = result.data || {
        code: 5000,
        msg: "server error"
      };
    } catch(err) {
      // console.log(err);
      // console.log(err.code);
    }  
  });

  router.post("/api/block/list", async (ctx) => {
    try {
      let result = await post("/snapshotchain/blocklist", ctx.request.body);
      ctx.type = "json";
      let body = result.data || {
        code: 5000,
        msg: "server error"
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
          accountNum,
          hash: block.hash,
          amount: block.amount
        });
      });
      rawBlockList = [];
      body.data = {
        blockList
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
        msg: "server error"
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
        amount: block.amount
      }

      body.data = block;
      ctx.body = body;
    } catch(err) {
      // console.log(err);
      // console.log(err.code);
    }
  });

  router.get("/api/transaction/detail", async (ctx) => {
    try {
      let result = await get("/accountchain/block", ctx.query);
      ctx.type = "json";
      let body = result.data || {
        code: 5000,
        msg: "server error"
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
        fromHash: transaction.fromHash,
        status: transaction.status,
        timestamp: transaction.timestamp,
        confirmTimes: transaction.confirmTimes,
        snapshotTimestamp: transaction.snapshotTimestamp,
        tokenName: transaction.token.name,
        tokenSymbol: transaction.token.symbol || "",
        tokenId: transaction.token.id
      }

      body.data = transaction;
      ctx.body = body;
    } catch(err) {
      // console.log(err);
      // console.log(err.code);
    }
  });

  router.post("/api/transaction/list", async (ctx) => {
    try {
      let result = await post("/accountchain/blocklist", ctx.request.body);
      ctx.type = "json";
      let body = result.data || {
        code: 5000,
        msg: "server error"
      };

      if (body.code !== 0) {
        ctx.body = body;
        return;
      }

      let rawTransactionList = body.data.accountList || [];
      let transactionList = [];
      rawTransactionList.forEach((transaction) => {
        transactionList.push({
          hash: transaction.hash,
          amount: transaction.amount,
          from: transaction.from,
          to: transaction.to,
          fromHash: transaction.fromHash,
          status: transaction.status,
          timestamp: transaction.timestamp,
          confirmTimes: transaction.confirmTimes,
          snapshotTimestamp: transaction.snapshotTimestamp,
          tokenName: transaction.token.name,
          tokenSymbol: transaction.token.symbol || "",
          tokenId: transaction.token.id
        });
      });

      rawTransactionList = [];
      body.data = {
        transactionList
      };
      ctx.body = body;
    } catch(err) {
      console.log(err);
      // console.log(err.code);
    }
  });

  router.get("/api/search/judgeTransOrBlock", async (ctx) => {
    try {
      let transactionDetail = await get("/accountchain/block", { blockHash: ctx.query.addr });
      let blockDetail = await get("/snapshotchain/block", { blockHash: ctx.query.addr });
      let judgeString = 'null'; 
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

  return router.middleware();
};
