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

  router.post("/api/block/list", async (ctx) => {
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

  router.get("/api/transaction/detail", async (ctx) => {
    ctx.type = "json";
    ctx.body = {
      code: 0,
      msg: "",
      data: {
        height: "dsdsdsdsdsd",                 // 用户块高度
        accountAddress: "sdsdsdsdsdsd",         // 用户账号地址
        to: "sdsdsdjsldjsldsjd",                     // 交易的接受方账号地址
        from: "sdsdsdsdsdsdsdsd",
        fromHash: "sdsjdlsdjsldjsld",               // 接受块所对应的发送块has
        prevHash: "sdssdsjdlsjdlsdjsld",               // 当前用户前一个用户块的hash  
        status: "2",                 // 区块状态。 0为UnKnown, 1为Open, 2为Closed
        balance: 3232323, // 当前账号这个代币的余额
        amount: 2392739273,                 // 接受或发送的代币数量
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
        data: "fsfsfsdfsdfsd",                   // 请求或响应的数据    
        snapshotTimestamp: "sdsdjslfjdlfjds",      // 发送交易时当前的snapshotBlockHash
        signature: "sdjsdjsdlfjdsfjsd",              // 这个交易的签名
        nounce: "sdsldsjdlsjlds",                 // 为了发送这个交易的PoW的nounce
        difficulty: "sdjsldjsldsjd",             // 为了发送这个交易的PoW的难度
        fAmount: "sdsdsdsdsdsdsd"   
      }
    };
  });

  router.post("/api/transaction/list", async (ctx) => {
    ctx.type = "json";
    ctx.body = {
      code: 0,
      msg: "",
      data: [{
        height: "dsdsdsdsdsd",                 // 用户块高度
        accountAddress: "sdsdsdsdsdsd",         // 用户账号地址
        to: "sdsdsdjsldjsldsjd",                     // 交易的接受方账号地址
        from: "sdsdsdsdsdsdsdsd",
        fromHash: "sdsjdlsdjsldjsld",               // 接受块所对应的发送块has
        prevHash: "sdssdsjdlsjdlsdjsld",               // 当前用户前一个用户块的hash  
        status: "2",                 // 区块状态。 0为UnKnown, 1为Open, 2为Closed
        balance: 3232323, // 当前账号这个代币的余额
        amount: 2392739273,                 // 接受或发送的代币数量
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
        data: "fsfsfsdfsdfsd",                   // 请求或响应的数据    
        snapshotTimestamp: "sdsdjslfjdlfjds",      // 发送交易时当前的snapshotBlockHash
        signature: "sdjsdjsdlfjdsfjsd",              // 这个交易的签名
        nounce: "sdsldsjdlsjlds",                 // 为了发送这个交易的PoW的nounce
        difficulty: "sdjsldjsldsjd",             // 为了发送这个交易的PoW的难度
        fAmount: "sdsdsdsdsdsdsd"   
      },{
        height: "dsdsdsdsdsd",                 // 用户块高度
        accountAddress: "sdsdsdsdsdsd",         // 用户账号地址
        to: "sdsdsdjsldjsldsjd",                     // 交易的接受方账号地址
        from: "sdsdsdsdsdsdsdsd",
        fromHash: "sdsjdlsdjsldjsld",               // 接受块所对应的发送块has
        prevHash: "sdssdsjdlsjdlsdjsld",               // 当前用户前一个用户块的hash  
        status: "2",                 // 区块状态。 0为UnKnown, 1为Open, 2为Closed
        balance: 3232323, // 当前账号这个代币的余额
        amount: 2392739273,                 // 接受或发送的代币数量
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
        data: "fsfsfsdfsdfsd",                   // 请求或响应的数据    
        snapshotTimestamp: "sdsdjslfjdlfjds",      // 发送交易时当前的snapshotBlockHash
        signature: "sdjsdjsdlfjdsfjsd",              // 这个交易的签名
        nounce: "sdsldsjdlsjlds",                 // 为了发送这个交易的PoW的nounce
        difficulty: "sdjsldjsldsjd",             // 为了发送这个交易的PoW的难度
        fAmount: "sdsdsdsdsdsdsd"   
      },{
        height: "dsdsdsdsdsd",                 // 用户块高度
        accountAddress: "sdsdsdsdsdsd",         // 用户账号地址
        to: "sdsdsdjsldjsldsjd",                     // 交易的接受方账号地址
        from: "sdsdsdsdsdsdsdsd",
        fromHash: "sdsjdlsdjsldjsld",               // 接受块所对应的发送块has
        prevHash: "sdssdsjdlsjdlsdjsld",               // 当前用户前一个用户块的hash  
        status: "2",                 // 区块状态。 0为UnKnown, 1为Open, 2为Closed
        balance: 3232323, // 当前账号这个代币的余额
        amount: 2392739273,                 // 接受或发送的代币数量
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
        data: "fsfsfsdfsdfsd",                   // 请求或响应的数据    
        snapshotTimestamp: "sdsdjslfjdlfjds",      // 发送交易时当前的snapshotBlockHash
        signature: "sdjsdjsdlfjdsfjsd",              // 这个交易的签名
        nounce: "sdsldsjdlsjlds",                 // 为了发送这个交易的PoW的nounce
        difficulty: "sdjsldjsldsjd",             // 为了发送这个交易的PoW的难度
        fAmount: "sdsdsdsdsdsdsd"   
      }]
    };
  });

  return router.middleware();
};
