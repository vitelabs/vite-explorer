module.exports = {
  lang: "English",


  // components/Home
  profile: {
    title: "Profile",
    market: "Market value of Vite",
    tps: "System TPS",
    price: "Current price of Vite",
    totalTrans: "Total History Transaction",
    latestHeight: "Latest block height",
    nearMonth: " 30 day Transaction History",
  },
  lineChart: {
    title: "Transaction Curve"
  },
  snapshotList: {
    title: "Snapshot List",
    height: "Height",
    node: "Generation node",
    pack: "Packed ",
    account: " account(s)",
    cost: "Cost ",
    sec: " sec(s)",
    secAgo: " sec ago",
  },
  transactionList: {
    title: "Transaction List",
    hash: "Transaction Hash",
    from: "From",
    to: "To",
  },


  // components/Token
  accList: {
    title: "Total Accounts----, (Only shows ---- data in recent)",
  },
  accTitles: [{
    prop: "accountAddress",
    name: "Account Address",
  }, {
    prop: "balance",
    name: "Account Balance",
  }, {
    prop: "percent",
    name: "Proportion",
  }, {
    prop: "transNum",
    name: "Transaction Times",
  }],


  // Basic components part: components/
  footer: {
    official: "Official Website"
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
    noData: "no data"
  },


  // components/transList.vue
  transList: {
    title: "Total amount of transactions ",
    label: "Transaction List"
  },
  transTitles: [{
    prop: "hash",
    name: "TxHash"
  }, {
    prop: "type",
    name: "TxType"
  }, {
    prop: "status",
    name: "Status"
  }, {
    prop: "snapshotTimestamp",
    name: "First Snapshot"
  }, {
    prop: "timestamp",
    name: "Timestamp"
  }, {
    prop: "confirmTimes",
    name: "Confirmations"
  }, {
    prop: "from",
    name: "From"
  }, {
    prop: "to",
    name: "To"
  }],
  addedTitle: [{
    prop: "tokenName",
    name: "Token"
  }, {
    prop: "amount",
    name: "Amount"
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
    accHash: "Account Hash",
    accType: "Account Hold Token Types",
    accToken: "Account Hold Tokens",
    token: "Token",
    bAmount: "Balance Amount",
    bValue: "Balance Value",
    tNum: "Number of Transactions",
    allToken: "All Token Valuation",
  },


  // pages/block
  block: {
    title: "Snapshot Block Detail",
  },
  blockDetailMap: {
    height: "Snapshot Block Height",
    age: "Snapshot Block Age",
    timestamp: "Snapshot Block Time",
    accountNum: "Number of Account",
    hash: "Snapshot Block Hash",
    producer: "Packing Node",
    amount: "Forging Rewards"
  },


  // pages/blockList
  blkList: {
    title: {
      total: "Total Blocks ",
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
    name: "Packing Accounts",

  }, {
    prop: "producer",
    name: "Generation Node",

  }, {
    prop: "hash",
    name: "Snapshot Hash",

  }, {
    prop: "amount",
    name: "Forging Rewards",
  }],


  // pages/searchError
  sError: {
    text: "No content found, Please switch another word."
  },


  // pages/token
  token: {
    aLabel: "Account List",
    tLabel: "Transaction List",
  },
  tokenDetailMap: {
    circulationLines: "Circulation Limit",
    owner: "Owner Address",
    price: "Price",
    addressNumber: "Number of Address",
    transactionNumber: "Number of Transactions"
  },


  // pages/tokenList
  tokenList: {
    title: "Token List",
    cut1: "",
    cut2: " Tokens in total",
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
  }],


  // pages/transaction
  transaction: {
    send: "Send",
    receive: "Receive",
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
    home: "Vite BlockChain Explorer",
    blockList: "Vite Blocks",
    transTitle: "Vite Transactions Information",
    sError: "Nothing Found",
    tTitle: "Token Detail",
    transDetail: "Transaction Detail",
  }
};
