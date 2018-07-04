import Router from "koa-trie-router";
import {get, post} from "../api/server.js";

const router = new Router();

export default () => {
  router.get("/api/user", async (ctx) => {
    ctx.type = "json";
    ctx.body = {
      code: 0,
      msg: "",
      data: [{
        name: "zhoudan"
      }]
    };
  });

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
      let result = await post("/token/list", ctx.query);
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
      let result = await post("/snapshotchain/blocklist", ctx.query);
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

  router.get("/api/block/detail", async (ctx) => {
    try {
      let result = await get("/snapshotchain/block", ctx.query);
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

  router.get("/api/transaction/detail", async (ctx) => {
    try {
      let result = await get("/accountchain/block", ctx.query);
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

  router.post("/api/transaction/list", async (ctx) => {
    try {
      let result = await post("/accountchain/blocklist", ctx.query);
      ctx.type = "json";
      ctx.body = result.data ? {
        code: result.data.code,
        msg: result.data.msg,
        data: {
          transactionList: result.data.data.accountList
        }
      } : {
        code: 5000,
        msg: "server error"
      };
    } catch(err) {
      console.log(err);
      // console.log(err.code);
    }
  });

  return router.middleware();
};
