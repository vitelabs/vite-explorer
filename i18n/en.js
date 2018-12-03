module.exports = {
  lang: "English",


  // components/Home
  profile: {
    title: "Profile",
    market: "Market cap of VITE",
    tps: "System TPS",
    price: "Current price of VITE",
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
    account: " transaction(s)",
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
    arrow: "Represents dependency relationship. A Tx links to its previous Tx on the same account chain, and request Tx is referenced by response Tx"
  },


  // components/Token
  accList: {
    title: "Total Accounts --, (Only shows -- data in recent)",
  },
  accTitles: [{
    prop: "orderNum",
    name: "#",
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
    name: "Transactions"
  }],


  // Basic components part: components/
  footer: {
    official: "Official Website"
  },

  // Version attached description
  logo: {
    v: "Version 1.1.0",
    current: "Current Version",
    content1: "Vite's block explorer is a website for searching comprehensive information about Vite. Now, it supports searching by transactions, snapshot blocks, tokens, SBPs, accounts and presenting related information such as voting status and node details; it also provides statistics information, transactions filter and sorting.",
    content2: "Version 1.1.0 introduces SBP detail page. This version also added new features such as rewards enquiry and download voting details",
    govite: {
      current: "go-vite Version",
      v: "1.0.0"
    }
  },

  nav: {
    index: "Home",
    transactionList: "Transactions",
    blockList: "Snapshots",
    tokenList: "Tokens",
    SBPList: "SBPs",
    mining: {
      name: "Mining",
      childs: {
        SBPList: "SBPs",
        voteReward: "Voting Rewards",
        registerSBP: "SBP Registration"
      }
    },
    vitenet: "Use other products"
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
    noResult: "No Result",
    noEmpty: "搜索条件不能为空"
  },
  filter: {
    filterName: "Filter",
    placeholder: "Enter account address",
    from: "From",
    to: "To",
    sure: "Confirm",
    SBP: {
      placeholder: "Search node name or address",
      cycle: {
        name: "查看出块情况",
        one: "最近1个周期",
        three: "最近3个周期",
        seven: "最近7个周期",
        history: "历史"
      }
    }
  },

  // components/transList.vue
  transList: {
    title: "Total transactions：",
    label: "Transactions",
    time: "Latest Updated at:"
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
    width: 192
  }, {
    prop: "status",
    name: "Status",
    width: "85"
  }, {
    prop: "snapshotTimestamp",
    name: "Snapshotted by",
    width: "130"
  }, {
    prop: "timestamp",
    name: "Age",
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
    name: "Quantity",
    width: "130"
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
      label: "request",
      value: -1
    }, {
      label: "response",
      value: 1
    }],
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
      label: "Retrieval of Rewards",
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
      label: "Withdraw Stake for Quota",
      value: 8
    }, {
      label: "Token Forging",
      value: 9
    }, {
      label: "Withdraw Stake for Forging",
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

  // pages/SBPDetail
  superNodeDetail: {
    title: "Node Details",
    key: {
      nodeName: "Node Name",
      registerTime: "Registration Time",
      registerAddress: "Registration Address",
      blockAddress: "Block Creation Address",
      blockCount: "Count",
      blockRatio: "Ratio"
    },
    externalKey: {
      totalBlockAward: "Block Creation Rewards",
      totalVoteAward: "Rewards of Votes",
      totalAward: "Rewards in Total",
      settledAward: "Issued Rewards",
    },
    download: "Download",
    startDate: "Start Date",
    endDate: "End Date",
    downloadDetail: "Download Voting Details",
    verify: "The Start cycle you input is earlier than the registration cycle, please try again",
    registerCycle: "Registration Cycle",
    cycleTime: "Cycle time comparison chart",
    alertMsg: "A cycle cannot over 30 days",
    cycleTitles: [{
      prop: "cycle",
      name: "Cycle"
    }, {
      prop: "beginRound",
      name: "Start Round"
    }, {
      prop: "endRound",
      name: "End Round"
    }, {
      prop: "beginTime",
      name: "Start Time of Cycle",
      width: 200
    }, {
      prop: "endTime",
      name: "End Time of Cycle",
      width: 200
    }]
  },

  // components/SBPAwardList
  SBPAwardList: {
    label: "Rewards",
    titles: [{
      prop: "cycle",
      name: "Time",
      width: 306
    }, {
      prop: "blockCount",
      name: "Block creation count"
    }, {
      prop: "blockAward",
      name: "Block creation rewards"
    }, {
      prop: "voteAward",
      name: "Rewards of votes"
    }, {
      prop: "totalAward",
      name: "Rewards in total"
    }]
  },

  // components/SBPProducerList
  SBPProducerList: {
    label: "出块地址列表",
    titles: [{
      prop: "date",
      name: "时间",
      width: 306
    }, {
      prop: "address",
      name: "出块地址"
    }]
  },

  // pages/account
  account: {
    title: "Account Details",
    accHash: "Address",
    accType: "Tokens",
    accToken: "",
    token: "Token",
    bAmount: "Balance",
    bValue: "Value",
    tNum: "Number of Transactions",
    allToken: "Total Value",
    filterInput: "Filtered By",
    quota: "TPS Quota",
    blockPercent: "Percentage",
    blockAward: "Rewards",
    balanceOnroad: "在途金额"
  },
  accountAddrMap: {
    0: "",
    1: "出块地址",
    2: "出块地址",
    3: "全节点奖池",  
    10: "注册SBP合约",
    11: "投票合约",
    12: "获取配额合约",
    14: "铸币合约"
  },
  SBP: {
    label: "Snapshot Block List"
  },
  onroad: {
    label: "在途交易列表",
    tips: "最近50笔在途交易金额"
  },

  // pages/block
  block: {
    title: "Snapshot Block Details",
  },
  blockDetailMap: {
    height: "Snapshot Block Height",
    hash: "Snapshot Block Hash",
    age: "Snapshot Block Age",
    accountNum: "快照账户数",
    transactionCount: "快照交易数",
    superNodeName: "出块节点",
    producer: "出块地址"
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
    name: "Height",
  }, {
    prop: "age",
    name: "Age",
  }, {
    prop: "accountNum",
    name: "Accounts Snapshotted",

  }, {
    prop: "producer",
    name: "SBP Address",

  }, {
    prop: "hash",
    name: "Hash",
  }],
  addedBlockTitles: [{
    prop: "award",
    name: "Rewards"
  }],

  // pages/searchError
  sError: {
    text: "No content found, please try another input."
  },

  // pages/token
  token: {
    aLabel: "Holders",
    tLabel: "Transactions",
    charts: "Token Holders Chart",
  },
  tokenDetailMap: {
    accountNum: "Holders",
    totalSupply: "Total Supply",
    owner: "Issuer",
    transactionNumber: "Transactions",
    decimals: "Decimals"
  },


  // pages/tokenList
  tokenList: {
    title: "Tokens",
    total: "Total Tokens: "
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
    name: "%Change",
  }, {
    prop: "transPrice",
    name: "Volume(24h)",
  }, {
    prop: "famc",
    name: "Market Cap",
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
        title: "Register SBP"
      },
      2: {
        name: "Registration Update",
        title: "Update SBP registration"
      },
      3: {
        name: "Registration Cancellation",
        title: "Cancel SBP Registration"
      },
      4: {
        name: "Retrieve Rewards",
        title: "Retrieval of Rewards"
      },
      5: {
        name: "Vote",
        title: "Vote for SBP"
      },
      6: {
        name: "Undo Vote",
        title: "Revoke latest vote"
      },
      7: {
        name: "Get TPS Quota",
        title: "Staking VITE for TPS quota"
      },
      8: {
        name: "Withdraw Stake for Quota",
        title: ""
      },
      9: {
        name: "Token Forging",
        title: ""
      },
      10: {
        name: "Withdraw Stake for Forging",
        title: ""
      }
    }
  },
  transactionDetailMap: {
    hash: "Transaction Hash",
    fromHash: "Request Transaction Hash",
    toHash: "Response Transaction Hash",
    type: "Transaction Type",
    status: "Transaction Status",
    confirmTimes: "Confirmations",
    snapshotBlockHash: "Firstly Snapshotted by",
    timestamp: "Age",
    from: "From",
    to: "To",
    tokenName: "Token",
    amount: "Quantity",
    data: "Input Data"
  },

  // pages/superNode
  superNode: {
    title: "SBP List",
    total: "Total Nodes:"
  },
  nodeTitles: [{
    prop: "rank",
    name: "#",
    width: 60
  }, {
    prop: "nodeName",
    name: "Name",
    width: 120
  }, {
    prop: "status",
    name: "SBP Status",
    width: 120
  }, {
    prop: "voteNum",
    name: "Votes",
    width: 90
  }, {
    prop: "produceRatio",
    name: "Ratio"
  }, {
    prop: "expectNum",
    name: "Target",
    width: 90
  }, {
    prop: "factNum",
    name: "Hit",
  }, {
    prop: "missNum",
    name: "Missed",
    width: 95
  }, {
    prop: "producerAddress",
    name: "Address",
    width: 160
  }, {
    prop: "curVoteAward",
    name: "Today's Candidate Additional Rewards",
    width: 120
  }, {
    prop: "curSuperNodeAward",
    name: "Today's Block Creation Rewards",
    width: 120
  }],

  // pages/tokenAccount
  tokenAccount:{
    title: "Chart of Holders",
    c1: "Holders",
    c2: "Select Please",
    info: "{tokenName} Top {value} Holders",
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
  responseHash: "Waiting for response transaction",

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
