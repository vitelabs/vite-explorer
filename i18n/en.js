module.exports = {
  lang: "English",


  // components/Home
  profile: {
    title: "Profile",
    market: "Market value of vite",
    tps: "System TPS",
    price: "Current price of vite",
    totalTrans: "Transactions",
    latestHeight: "Latest block height",
    nearMonth: "Transactions(30d)",
    update3: "Update per 3 seconds",
    tPerSec: "Transactions per second",
    blockTime: "Average time cost of latest 5000 snapshot blocks",

  },
  lineChart: {
    title: "Transaction Curve"
  },
  snapshotList: {
    title: "Snapshots",
    height: "Height",
    node: "Node",
    pack: "",
    account: " account(s)",
    cost: "Cost ",
    sec: " sec(s)",
    secAgo: " sec ago",
  },
  transactionList: {
    title: "Transactions",
    hash: "TX#",
    from: "From",
    to: "To",
  },
  dag: {
    send: "Request Transaction",
    receive: "Response Transaction",
    arrow: "Represents dependency relationship, next TX points to last TX on the same account chain, receive TX points to send TX"
  },


  // components/Token
  accList: {
    title: "Total Accounts --, (Only shows -- data in recent)",
  },
  accTitles: [{
    prop: "orderNum",
    name: "Rank",
    width: "75"
  }, {
    prop: "accountAddress",
    name: "Address",
  },{
    prop: "balance",
    name: "Quantity",
  }, {
    prop: "balancePercent",
    name: "Percentage",
  }],
  addedAccTitles: [{
    prop: "countNum",
    name: "Transaction Times"
  }],


  // Basic components part: components/
  footer: {
    official: "Official Website"
  },
  logo: {
    v: "Preview Version",
    current: "Current Version",
    content1: "Vite's block explorer is a website for searching integrated information about Vite. Now it supports searching by accounts, tokens, transactions and snapshot blocks and presenting information via lists.",
    content2: "Preview Version V2 provides statistics information, transactions filter and sort, and diagram of accounts who hold some kind of token.",
    govite: {
      current: "go-vite Version",
      v: "0.0.2"
    }
  },
  nav: {
    index: "Home",
    transactionList: "Transactions",
    blockList: "Snapshots",
    tokenList: "Tokens"
  },
  pageTable: {
    pre: "Prev",
    next: "Next",
    num: "No.",
  },
  search: {
    btn: "Search",
    placeholder: "Search by Block / Transaction / Account / Token"
  },
  utils: {
    noData: "No Data",
    more: "More",
    noResult: "No Result"
  },
  filter: {
    filterName: "Filter",
    placeholder: "Enter account address",
    from: "From",
    to: "To",
    sure: "Confirm"
  },

  // components/transList.vue
  transList: {
    title: "Total amount of transactions：",
    label: "Transactions",
    time: "Latest Updating at:"
  },
  transTitles: [{
    prop: "hash",
    name: "Hash",
    width: "130"
  }, {
    prop: "type",
    width: "81"
  }, {
    prop: "txType",
    name: "Type"
  }, {
    prop: "status",
    name: "Status",
    width: "85"
  }, {
    prop: "snapshotTimestamp",
    name: "First Snapshot",
    width: "130"
  }, {
    prop: "timestamp",
    name: "Timestamp",
    width: "120"
  }, {
    prop: "confirmTimes",
    name: "Confirmations",
  }, {
    prop: "from",
    name: "From",
    width: "160"
  }, {
    prop: "to",
    name: "To",
    width: "160"
  }, {
    prop: "amount",
    name: "Amount",
    width: "98"
  }],
  addedTitle: [{
    prop: "tokenName",
    name: "Token",
    width: "70"
  }],
  filterObj: {
    txType: [{
      label: "all",
      value: null
    }, {
      label: "注册合约",
      value: 0
    }, {
      label: "提取奖励",
      value: 1
    }, {
      label: "投票合约",
      value: 2
    }, {
      label: "抵押合约",
      value: 3
    }, {
      label: "转账",
      value: 4
    }],
    status: [{
      label: "all",
      value: null
    }, {
      label: "open",
      value: 1
    }, {
      label: "closed",
      value: 2
    }]
  },


  // layouts/
  error: {
    reload: "Click to reload",
    home: "Back to Home",
    exception: "Error Exception Occurs",
  },


  // pages/account
  account: {
    title: "Account Details",
    accHash: "Address",
    accType: "Types of Tokens Held by Account",
    accToken: "Tokens Held by Account",
    token: "Token",
    bAmount: "Balance Amount",
    bValue: "Balance Value",
    tNum: "Number of Transactions",
    allToken: "All Token Valuation",
    filterInput: "Filtered By",
    quota: "配额",
    blockPercent: "出块率",
    blockAward: "出块奖励"
  },
  SBP: {
    label: "打包快照块列表"
  },

  // pages/block
  block: {
    title: "Snapshot Block Details",
  },
  blockDetailMap: {
    height: "Snapshot Block Height",
    age: "Snapshot Block Age",
    accountNum: "Number of Account",
    transactionCount: "Number of Transaction",
    hash: "Snapshot Block Hash",
    producer: "Snapshot Node",
  },


  // pages/blockList
  blkList: {
    title: {
      total: "Total Blocks:",
      // recentTotalFirst: "，（Only shows ",
      // recentTotalEnd: " data in recent）"
    }
  },
  blockTitles: [{
    prop: "height",
    name: "Snapshot Height",
  }, {
    prop: "age",
    name: "Snapshot Age",
  }, {
    prop: "accountNum",
    name: "Snapshot Accounts",

  }, {
    prop: "producer",
    name: "Snapshot Node",

  }, {
    prop: "hash",
    name: "Hash",
  }],
  addedBlockTitles: [{
    prop: "award",
    name: "出块奖励"
  }],

  // pages/searchError
  sError: {
    text: "No content found, please try another input."
  },

  // pages/token
  token: {
    aLabel: "Accounts",
    tLabel: "Transactions",
    charts: "Token Holders Chart",
  },
  tokenDetailMap: {
    accountNum: "Number of Holders",
    totalSupply: "Forging Totals",
    owner: "Forging Address",
    transactionNumber: "Transactions",
    decimals: "Decimals"
  },


  // pages/tokenList
  tokenList: {
    title: "Tokens",
    total: "Token types:",
  },
  tokenTitles: [{
    prop: "icon",
    name: "Icon",
    width: 100
  }, {
    prop: "token",
    name: "Token",
    width: 300
  }, {
    prop: "price",
    name: "Price",
  }, {
    prop: "upDown",
    name: "Up & Down",
  }, {
    prop: "transPrice",
    name: "Transaction Amount",
  }, {
    prop: "famc",
    name: "Circulation Market Value",
    width: "190"
  }],

  // pages/transaction
  transaction: {
    send: "request",
    receive: "response",
    txType: {
      0: {
        name: "注册合约",
        title: "注册成为快照块出块节点候选节点"
      },
      1: {
        name: "提取奖励",
        title: "提取出块奖励"
      },
      2: {
        name: "投票合约",
        title: "投票选出快照块出块节点"
      },
      3: {
        name: "抵押合约",
        title: "抵押VITE获取配额"
      },
      4: {
        name: "转账"
      }
    }
  },
  transactionDetailMap: {
    hash: "Transaction Hash",
    type: "Transaction Type",
    status: "Transaction Status",
    confirmTimes: "Confirmations",
    snapshotBlockHash: "First Snapshot Block",
    timestamp: "Timestamp",
    from: "From",
    to: "To",
    tokenName: "Token",
    amount: "Amount",
    data: "Attachments"
  },

  // pages/superNode
  superNode: {
    title: "超级节点列表",
    total: "快照块出块节点总数："
  },
  nodeTitles: [{
    prop: "orderNum",
    name: "排名"
  }, {
    prop: "nodeName",
    name: "节点名"
  }, {
    prop: "status",
    name: "状态"
  }, {
    prop: "poll",
    name: "票数"
  }, {
    prop: "percent",
    name: "出块率"
  }, {
    prop: "shouldNum",
    name: "应出块数量"
  }, {
    prop: "hasNum",
    name: "已出块数量"
  }, {
    prop: "missed",
    name: "Missed"
  }, {
    prop: "address",
    name: "出块地址"
  }, {
    prop: "place",
    name: "地点"
  }],

  // pages/tokenAccount
  tokenAccount:{
    title: "Chart of Holders",
    c1: "Holders",
    c2: "Select Please",
    info: "{tokenName} top {value} holders",
    info2: "Top {value} holders contain {percent} (from a total of {totalNum} holders) of {tokenName} in total",
    c8: "Total Supply:",
    c0: "Holders in Total:",
    dropDownList: [{
      value: 3,
      label: "Top 3"
    }, {
      value: 5,
      label: "Top 5"
    }, {
      value: 10,
      label: "Top 10"
    }, {
      value: 50,
      label: "Top 50"
    }, {
      value: 100,
      label: "Top 100"
    }, {
      value: 250,
      label: "Top 250"
    }, {
      value: 500,
      label: "Top 500"
    }],

  },

  pie: "Holding Amount:",

  // Head titles of all pages
  head: {
    home: "Vite Block Explorer",
    blockList: "Vite Blocks",
    transTitle: "Vite Transactions Information",
    sError: "Nothing Found",
    tTitle: "Token Details",
    transDetail: "Transaction Details",
  },

  // Compatibility
  alert: "We are so sorry that your browser doesn't support our website. Please try to use other browsers or upgrade to latest version.",
  attention: "Attention",

  // Time format
  timeFormat:{
    relativeTime: {
      past: "%s ago",
      s: "%ds",
      m: "1m",
      mm: "%dm",
      h: "1h",
      hh: "%dh",
      d: "1d",
      dd: "%dd",
      M: "1M",
      MM: "%dM",
      y: "1Y",
      yy: "%dY"
    },
  },
};
