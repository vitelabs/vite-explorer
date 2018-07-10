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
    height: "Snapshot Block Height: ",
    node: "Block generation node: ",
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
    more: "more"
  },


  // components/transList.vue
  transList: {
    title: "Total amount of transactions----",
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
    title: "Account Detail"
  },


  // pages/blockList
  blkList: {
    title: "Total Blocks----, (Only shows ---- data in recent)"
  },
  blockTitles: [{
    prop: "height",
    name: "Snapshot Height",
  }, {
    prop: "years",
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


  // Head titles of all pages
  head: {
    home: "Home",
    blockList: "All Blocks",
    transTitle: "All Transactions",
  }
};
