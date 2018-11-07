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
    tPerSec: "Realtime transactions per second / Last-hour transactions per second",
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
    arrow: "Represents dependency relationship, next Tx points to last Tx on the same account chain, response Tx points to request Tx"
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

  // Version attached description
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
    tokenList: "Tokens",
    SBPList: "SBPs"
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
    sure: "Confirm",
    SBP: {
      placeholder: "Search node name or address"
    }
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
    prop: "blockType",
    name: "Type",
    width: 293
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
    width: "116"
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
    blockType: [{
      label: "all",
      value: null
    }, {
      label: "Transfer",
      value: 0
    }, {
      label: "Registration",
      value: 1
    }, {
      label: "Registration Update",
      value: 2
    }, {
      label: "Registration Cancellation",
      value: 3
    }, {
      label: "Rewards Claim",
      value: 4
    }, {
      label: "Vote",
      value: 5
    }, {
      label: "Undo Vote",
      value: 6
    }, {
      label: "Get TPS Quota",
      value: 7
    }, {
      label: "Withdrawal of staked tokens for TPS quota",
      value: 8
    }, {
      label: "Token Forging",
      value: 9
    }, {
      label: "Withdrawal of staked tokens for forging",
      value: 10
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
    quota: "TPS Quota",
    blockPercent: "Percentage",
    blockAward: "Awards"
  },
  SBP: {
    label: "Snapshot Block List"
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
    name: "Awards"
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
    blockType: {
      0: {
        name: "Transfer",
        title: ""
      },
      1: {
        name: "Registration",
        title: "Register to become a SBP candidate "
      },
      2: {
        name: "Registration Update",
        title: "Update SBP registration information"
      },
      3: {
        name: "Registration Cancellation",
        title: "Cancel to register SBP"
      },
      4: {
        name: "Rewards Claim",
        title: "Claim producer Rewardss"
      },
      5: {
        name: "Vote",
        title: "Vote for SBP"
      },
      6: {
        name: "Undo Vote",
        title: "Cancel the latest vote"
      },
      7: {
        name: "Get TPS Quota",
        title: "Staking VITE for TPS quota"
      },
      8: {
        name: "Withdrawal of staked tokens for TPS quota",
        title: ""
      },
      9: {
        name: "Token Forging",
        title: ""
      },
      10: {
        name: "Withdrawal of staked tokens for forging",
        title: ""
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
    title: "SBP List",
    total: "Total amount of SBP:"
  },
  nodeTitles: [{
    prop: "rank",
    name: "Rank",
    width: 60
  }, {
    prop: "nodeName",
    name: "Node name"
  }, {
    prop: "status",
    name: "Status"
  }, {
    prop: "voteNum",
    name: "Poll"
  }, {
    prop: "produceRatio",
    name: "Percentage"
  }, {
    prop: "expectNum",
    name: "Predicting Block",
    width: 150
  }, {
    prop: "factNum",
    name: "Generated Block",
    width: 150
  }, {
    prop: "missNum",
    name: "Missed"
  }, {
    prop: "producerAddress",
    name: "Address",
    width: 160
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
