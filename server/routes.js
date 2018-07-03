import Router from "koa-trie-router";

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
    ctx.type = "json";
    ctx.body = {
      code: 0,
      msg: "",
      data: {
        accountAddress: "sdjsfjsdlfjsd",
        blockHeight: 54,
        tokenList: [{
          token: {
            name: "vite",                        // 代币名称
            id: "dsdsd",                          // 代币Id
            introduction: "sdsdsdsd",                // 代币介绍   
            symbol: "vite",                      // 代币符号
            owner: "c",                       // 代币拥有者
            decimals: "sdsdsdsd",                    // 最小精确到小数点后几位
            totalSupply: "sdsdsdsdsd",                 // 代币总量
            transactionNumber: "sdsdsdsds",           // 当前交易数量
          },
          balance: "sdsdjsds"
        },{
          token: {
            name: "vite",                        // 代币名称
            id: "dsdsd",                          // 代币Id
            introduction: "sdsdsdsd",                // 代币介绍   
            symbol: "vite",                      // 代币符号
            owner: "c",                       // 代币拥有者
            decimals: "sdsdsdsd",                    // 最小精确到小数点后几位
            totalSupply: "sdsdsdsdsd",                 // 代币总量
            transactionNumber: "sdsdsdsds",           // 当前交易数量
          },
          balance: "sdsdjsds"
        },{
          token: {
            name: "vite",                        // 代币名称
            id: "dsdsd",                          // 代币Id
            introduction: "sdsdsdsd",                // 代币介绍   
            symbol: "vite",                      // 代币符号
            owner: "c",                       // 代币拥有者
            decimals: "sdsdsdsd",                    // 最小精确到小数点后几位
            totalSupply: "sdsdsdsdsd",                 // 代币总量
            transactionNumber: "sdsdsdsds",           // 当前交易数量
          },
          balance: "sdsdjsds"
        }]
      }
    };
  });

  router.post("/api/token/list", async (ctx) => {
    ctx.type = "json";
    ctx.body = {
      code: 0,
      msg: "",
      data: [{
        name: "vite",                        // 代币名称
        id: "dsdsd",                          // 代币Id
        introduction: "sdsdsdsd",                // 代币介绍   
        symbol: "vite",                      // 代币符号
        owner: "c",                       // 代币拥有者
        decimals: "sdsdsdsd",                    // 最小精确到小数点后几位
        totalSupply: "sdsdsdsdsd",                 // 代币总量
        transactionNumber: "sdsdsdsds",           // 当前交易数量
      },{
        name: "vite",                        // 代币名称
        id: "dsdsd",                          // 代币Id
        introduction: "sdsdsdsd",                // 代币介绍   
        symbol: "vite",                      // 代币符号
        owner: "c",                       // 代币拥有者
        decimals: "sdsdsdsd",                    // 最小精确到小数点后几位
        totalSupply: "sdsdsdsdsd",                 // 代币总量
        transactionNumber: "sdsdsdsds",           // 当前交易数量
      },{
        name: "vite",                        // 代币名称
        id: "dsdsd",                          // 代币Id
        introduction: "sdsdsdsd",                // 代币介绍   
        symbol: "vite",                      // 代币符号
        owner: "c",                       // 代币拥有者
        decimals: "sdsdsdsd",                    // 最小精确到小数点后几位
        totalSupply: "sdsdsdsdsd",                 // 代币总量
        transactionNumber: "sdsdsdsds",           // 当前交易数量
      },{
        name: "vite",                        // 代币名称
        id: "dsdsd",                          // 代币Id
        introduction: "sdsdsdsd",                // 代币介绍   
        symbol: "vite",                      // 代币符号
        owner: "c",                       // 代币拥有者
        decimals: "sdsdsdsd",                    // 最小精确到小数点后几位
        totalSupply: "sdsdsdsdsd",                 // 代币总量
        transactionNumber: "sdsdsdsds",           // 当前交易数量
      }]
    };    
  });

  router.get("/api/token/detail", async (ctx) => {
    ctx.type = "json";
    ctx.body = {
      code: 0,
      msg: "",
      data: {
        name: "vite",                        // 代币名称
        id: "dsdsd",                          // 代币Id
        introduction: "sdsdsdsd",                // 代币介绍   
        symbol: "vite",                      // 代币符号
        owner: "c",                       // 代币拥有者
        decimals: "sdsdsdsd",                    // 最小精确到小数点后几位
        totalSupply: "sdsdsdsdsd",                 // 代币总量
        transactionNumber: "sdsdsdsds",           // 当前交易数量
      }
    };
  });

  router.get("/api/block/list", async (ctx) => {
    ctx.type = "json";
    ctx.body = {
      code: 0,
      msg: "",
      data: [{
        prevHash: "sdsdsd",                        // 前一个快照块的hash
        height: "sdsdsd",                          // 当前快照块高度
        producer: "sdsdsd",                        // 生产这个快照块的账号地址
        snapshot: "sdsdsd",           // 当前所有用户的状态快照，为了减小存储空间，只存储发生状态变化的用户的状态快照
        signature: "sdsdsd",                       // 生产这个快照块的签名
        amount: "sdsds"
      },{
        prevHash: "sdsdsd",                        // 前一个快照块的hash
        height: "sdsdsd",                          // 当前快照块高度
        producer: "sdsdsd",                        // 生产这个快照块的账号地址
        snapshot: "sdsdsd",           // 当前所有用户的状态快照，为了减小存储空间，只存储发生状态变化的用户的状态快照
        signature: "sdsdsd",                       // 生产这个快照块的签名
        amount: "sdsds"
      },{
        prevHash: "sdsdsd",                        // 前一个快照块的hash
        height: "sdsdsd",                          // 当前快照块高度
        producer: "sdsdsd",                        // 生产这个快照块的账号地址
        snapshot: "sdsdsd",           // 当前所有用户的状态快照，为了减小存储空间，只存储发生状态变化的用户的状态快照
        signature: "sdsdsd",                       // 生产这个快照块的签名
        amount: "sdsds"
      },{
        prevHash: "sdsdsd",                        // 前一个快照块的hash
        height: "sdsdsd",                          // 当前快照块高度
        producer: "sdsdsd",                        // 生产这个快照块的账号地址
        snapshot: "sdsdsd",           // 当前所有用户的状态快照，为了减小存储空间，只存储发生状态变化的用户的状态快照
        signature: "sdsdsd",                       // 生产这个快照块的签名
        amount: "sdsds"
      },{
        prevHash: "sdsdsd",                        // 前一个快照块的hash
        height: "sdsdsd",                          // 当前快照块高度
        producer: "sdsdsd",                        // 生产这个快照块的账号地址
        snapshot: "sdsdsd",           // 当前所有用户的状态快照，为了减小存储空间，只存储发生状态变化的用户的状态快照
        signature: "sdsdsd",                       // 生产这个快照块的签名
        amount: "sdsds"
      }]
    };
  });

  router.get("/api/block/detail", async (ctx) => {
    ctx.type = "json";
    ctx.body = {
      code: 0,
      msg: "",
      data: {
        prevHash: "sdsdsd",                        // 前一个快照块的hash
        height: "sdsdsd",                          // 当前快照块高度
        producer: "sdsdsd",                        // 生产这个快照块的账号地址
        snapshot: "sdsdsd",           // 当前所有用户的状态快照，为了减小存储空间，只存储发生状态变化的用户的状态快照
        signature: "sdsdsd",                       // 生产这个快照块的签名
        amount: "sdsds"
      }
    };
  });

  return router.middleware();
};
