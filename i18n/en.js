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
    blockTime: "Average time cost of latest 5000 snapshot block",

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
    content1: "Vite's block explorer is a website for searching integrated information about Vite. Now it supports searching by accounts, tokens, transactions and snapshot blocks and present information via lists.",
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
    more: "More"
  },
  filter: {
    filterName: "Filter",
    placeholder: "Enter account address",
    from: "from",
    to: "to",
    sure: "sure"
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
    name: "Type",
    width: "90"
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
    type: [{
      label: "all",
      value: null
    }, {
      label: "receive",
      value: 1
    }, {
      label: "send",
      value: -1
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
    title: "Account Detail",
    accHash: "Address",
    accType: "Types of Tokens Held by Account",
    accToken: "Tokens Held by Account",
    token: "Token",
    bAmount: "Balance Amount",
    bValue: "Balance Value",
    tNum: "Number of Transactions",
    allToken: "All Token Valuation",
    filterInput: "Filtered By"
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

  }, {
    prop: "price",
    name: "Forging Rewards",
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
    send: "send",
    receive: "receive",
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

  // pages/tokenAccount
  tokenAccount:{
    title: "Chart of Holders",
    c1: "Holders",
    c2: "Select Please",
    top: "Top",
    c4: "Holders",
    c5: "holders totally gain",
    c6: "Holders)",
    c7: "(From a total of ",
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
    tTitle: "Token Detail",
    transDetail: "Transaction Detail",
  }
};
