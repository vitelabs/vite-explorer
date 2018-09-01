module.exports = {
  lang: "English",


  // components/Home
  profile: {
    title: "Profile",
    market: "Market value of Vite",
    tps: "System TPS",
    price: "Current price of Vite",
    totalTrans: "Transactions",
    latestHeight: "Latest block height",
    nearMonth: "Transactions(30d)",
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


  // components/Token
  accList: {
    title: "Total Accounts --, (Only shows -- data in recent)",
  },
  accTitles: [{
    prop: "orderNum",
    name: "排名",
    width: "70"
  }, {
    prop: "accountAddress",
    name: "Account Address",
  },{
    prop: "balance",
    name: "Account Balance",
  }, {
    prop: "percent",
    name: "Proportion",
  }],
  addedAccTitles: [{
    prop: "transNum",
    name: "Transaction Times"
  }],


  // Basic components part: components/
  footer: {
    official: "Official Website"
  },
  logo: {
    v: "Preview Version",
    current: "Current Version",
    content1: "Vite's block explorer is a website for searching integrated information about Vite. Now it supports searching by accounts, tokens, transactions and snapshot blocks and present information via lists.",
    content2: "For the record, statistics information is not available right now. If browser shows 'No Data', stay tuned and we will supply in further version iteration.",
    govite: {
      current: "go-vite Version",
      v: "0.0.1"
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
    more: "more"
  },


  // components/transList.vue
  transList: {
    title: "Total amount of transactions：",
    label: "Transactions"
  },
  transTitles: [{
    prop: "hash",
    name: "Hash",
    width: "160"
  }, {
    prop: "type",
    name: "Type",
  }, {
    prop: "status",
    name: "Status",
  }, {
    prop: "snapshotTimestamp",
    name: "First Snapshot",
    width: "160"
  }, {
    prop: "timestamp",
    name: "Timestamp",
    width: "100"
  }, {
    prop: "confirmTimes",
    name: "Confirmations",
    width: "115"
  }, {
    prop: "from",
    name: "From",
    width: "160"
  }, {
    prop: "to",
    name: "To",
    width: "160"
  }],
  addedTitle: [{
    prop: "tokenName",
    name: "Token",
    width: "70"
  }, {
    prop: "amount",
    name: "Amount",
    width: "75"
  }],


  // layouts/
  error: {
    reload: "Click to reload",
    home: "Back to Home",
    exception: "Error Exception Occurs",
  },


  // pages/account
  account: {
    title: "Account Detail",
    accHash: "Address",
    accType: "Account Hold Token Types",
    accToken: "Account Hold Tokens",
    token: "Token",
    bAmount: "Balance Amount",
    bValue: "Balance Value",
    tNum: "Number of Transactions",
    allToken: "All Token Valuation",
    filterInput: "Filter"
  },


  // pages/block
  block: {
    title: "Snapshot Block Detail",
  },
  blockDetailMap: {
    height: "Snapshot Block Height",
    age: "Snapshot Block Age",
    accountNum: "Number of Account",
    transactionCount: "Number of Transaction",
    hash: "Snapshot Block Hash",
    producer: "Snapshot Node",
    amount: "Forging Rewards"
  },


  // pages/blockList
  blkList: {
    title: {
      total: "Total Blocks：",
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

  }, {
    prop: "price",
    name: "Forging Rewards",
  }],


  // pages/searchError
  sError: {
    text: "No content found, Please input another word."
  },


  // pages/token
  token: {
    aLabel: "Accounts",
    tLabel: "Transactions",
  },
  tokenDetailMap: {
    accountNum: "所有者数量",
    totalSupply: "铸币总量",
    owner: "铸币地址",
    transactionNumber: "交易笔数",
    decimals: "小数位数",
    filterInput: "筛选"
  },


  // pages/tokenList
  tokenList: {
    title: "Tokens",
    total: "Token types：",
  },
  tokenTitles: [{
    prop: "icon",
    name: "Icon",
  }, {
    prop: "token",
    name: "Token",
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
    send: "OUT",
    receive: "IN",
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
    introduction: "Attachments"
  },


  // Head titles of all pages
  head: {
    home: "Vite Block Explorer",
    blockList: "Vite Blocks",
    transTitle: "Vite Transactions Information",
    sError: "Nothing Found",
    tTitle: "Token Detail",
    transDetail: "Transaction Detail",
  }
};
