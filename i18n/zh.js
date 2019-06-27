module.exports = {
  lang: "CH",

  // components/Home
  profile: {
    title: "概况",
    market: "VITE流通市值",
    tps: "系统TPS",
    price: "VITE流通价格",
    totalTrans: "历史总交易量",
    latestHeight: "最新区块高度",
    nearMonth: "近30天交易量",
    update3: "每3秒更新一次",
    tPerSec: "实时/最近一小时平均/最大TPS",
    blockTime: "最新5000个快照块平均出块时间",
  },
  lineChart: {
    title: "交易曲线"
  },
  snapshotList: {
    title: "快照块列表",
    height: "快照块高度",
    node: "快照节点",
    pack: "快照",
    account: "笔交易",
    cost: "耗时",
    sec: "秒",
    secAgo: "秒前",
  },
  transactionList: {
    title: "交易列表",
    hash: "交易 Hash",
    from: "发出",
    to: "接收",
  },
  dag: {
    send: "请求交易",
    receive: "响应交易",
    arrow: "代表依赖关系，下一个交易指向同一账户链上的上一个交易，响应交易指向请求交易"
  },

  // components/Token
  accList: {
    title: "总账户数 --, (仅展示最近的 --条数据)"
  },
  accTitles: [{
    prop: "orderNum",
    name: "#",
    width: "70"
  }, {
    prop: "accountAddress",
    name: "账户地址",
  },{
    prop: "balance",
    name: "持有数量",
  }, {
    prop: "balancePercent",
    name: "占总流通比例",
  }],
  addedAccTitles: [{
    prop: "countNum",
    name: "交易次数"
  }],

  // Basic components part: components/
  footer: {
    official: "官网"
  },

  // Version attached description
  logo: {
    v: "版本2.0.0",
    current: "当前版本",
    content1: "Vite区块浏览器是查询Vite综合信息的网站，目前支持交易、快照块、代币、SBP、账户的查询，投票情况、节点详情及相关信息展示;支持统计信息展示，交易的筛选、排序等功能。",
    content2: "2.0.0新增STATS页面，支持查看Vite网络、节点状况。",
    govite: {
      current: "go-vite 版本",
      v: "2.0.0"
    }
  },

  nav: {
    index: "首页",
    transactionList: "交易列表",
    blockList: "快照块列表",
    tokenList: "Token列表",
    SBPList: "SBP列表",
    FullNode: "STATS",
    mining: {
      name: "挖矿",
      childs: {
        SBPList: "SBP列表",
        voteReward: "投票奖励",
        registerSBP: "注册SBP"
      }
    },
    vitenet: "使用Vite其他产品"
  },
  pageTable: {
    pre: "上一页",
    next: "下一页",
    num: "序号",
  },
  search: {
    btn: "搜索",
    placeholder: "搜索快照块、交易、账户、代币"
  },
  utils: {
    noData: "暂无数据",
    more: "更多",
    noResult: "暂无数据",
    noEmpty: "搜索条件不能为空"
  },
  filter: {
    filterName: "筛选",
    placeholder: "输入账户地址",
    from: "发出方",
    to: "接收方",
    sure: "确定",
    SBP: {
      placeholder: "搜索节点名称或出块地址",
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
    title: "总交易笔数：",
    label: "交易列表",
    time: "最近更新时间："
  },
  transTitles: [{
    prop: "hash",
    name: "交易Hash",
    width: "130"
  }, {
    prop: "amount",
    name: "数量",
    width: "130"
  }, {
    prop: "from",
    name: "发出方",
    width: "160"
  }, {
    prop: "to",
    name: "接收方",
    width: "160"
  }, {
    prop: "type",
  }, {
    prop: "blockType",
    name: "交易类型",
    width: 72
  }, {
    prop: "status",
    name: "状态",
    // width: "100"
  }, {
    prop: "snapshotTimestamp",
    name: "首次快照块",
    width: "130"
  }, {
    prop: "timestamp",
    name: "时间戳",
    width: 80
  }, {
    prop: "confirmTimes",
    name: "确认数",
    width: 70
  }],
  addedTitle: [{
    prop: "tokenName",
    name: "代币",
    width: "70"
  }],
  filterObj: {
    type: [{
      label: "全部",
      value: null
    }, {
      label: "请求",
      value: -1
    }, {
      label: "响应",
      value: 1
    }],
    blockType: [{
      label: "全部",
      value: null
    }, {
      label: "转账",
      value: 0
    }, {
      label: "注册",
      value: 1
    }, {
      label: "更新注册",
      value: 2
    }, {
      label: "撤销注册",
      value: 3
    }, {
      label: "提取奖励",
      value: 4
    }, {
      label: "投票",
      value: 5
    }, {
      label: "撤销投票",
      value: 6
    }, {
      label: "获取配额",
      value: 7
    }, {
      label: "取回配额抵押",
      value: 8
    }, {
      label: "铸币",
      value: 9
    }, {
      label: "取回铸币抵押",
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
    reload: "点击重新加载",
    home: "点击返回首页",
    exception: "发生错误异常",
  },

  // pages/SBPDetail
  superNodeDetail: {
    title: "节点详情",
    key: {
      nodeName: "节点名称",
      registerTime: "注册时间",
      registerAddress: "注册地址",
      blockAddress: "出块地址",
      blockCount: "出块数",
      blockRatio: "出块率"
    },
    externalKey: {
      totalBlockAward: "出块奖励",
      totalVoteAward: "按票奖励",
      totalAward: "总奖励",
      unclaimedAward: "待提取奖励",
    },
    download: "下载",
    startDate: "开始日期",
    endDate: "结束日期",
    downloadDetail: "下载得票明细",
    verify: "您输入的起始周期早于注册时间所属周期，请重新输入",
    registerCycle: "所属周期",
    cycleTime: "周期时间对照表",
    alertMsg: "不能超过30天",
    cycleTitles: [{
      prop: "cycle",
      name: "周期"
    }, {
      prop: "beginRound",
      name: "开始轮数"
    }, {
      prop: "endRound",
      name: "结束轮数"
    }, {
      prop: "beginTime",
      name: "周期开始时间",
      width: 200
    }, {
      prop: "endTime",
      name: "周期结束时间",
      width: 200
    }]
  },

  // components/SBPAwardList
  SBPAwardList: {
    label: "奖励列表",
    titles: [{
      prop: "cycle",
      name: "时间",
      width: 400
    }, {
      prop: "blockCount",
      name: "出块数"
    }, {
      prop: "missedCount",
      name: "遗漏块数量"
    }, {
      prop: "blockAward",
      name: "出块奖励"
    }, {
      prop: "voteAward",
      name: "按票奖励"
    }, {
      prop: "totalAward",
      name: "总奖励"
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
    title: "账户详情",
    accHash: "地址",
    accType: "账户持有代币种类",
    accToken: "账户持有代币",
    token: "代币",
    bAmount: "余额数量",
    bValue: "余额价值",
    tNum: "交易次数",
    allToken: "所有代币估值",
    filterInput: "筛选",
    quota: "配额",
    blockPercent: "出块率",
    blockAward: "出块奖励",
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
    label: "打包快照块列表"
  },
  onroad: {
    label: "在途交易列表",
    tips: "最近50笔在途交易金额"
  },
  contract: {
    label: "合约",
    copy: "复制成功",
    abi: "合约 ABI",
    hexCode: "十六进制合约代码",
    contractCode: "合约代码",
    verified: "合约代码已验证",
    unverified: "合约代码未验证",

    name: "合约名称",
    seedcount: "Seed Count",
    gid: "Gid",
    confirmTime: "Confirm Time",
    quotaRatio: "Quota Ratio",
    version: "编译器版本",

    params: "合约参数",
    sourceCode: "源代码",
    
    confirm: "确定"
  },

  // pages/block
  block: {
    title: "快照块详情",
  },
  blockDetailMap: {
    height: "快照块高度",
    hash: "快照块Hash",
    age: "快照块年龄",
    accountNum: "快照账户数",
    transactionCount: "快照交易数",
    superNodeName: "出块节点",
    producer: "出块地址"
  },


  // pages/blockList
  blkList: {
    title: {
      total: "快照块总数：",
      // recentTotalFirst: "，（仅展示最近的 ",
      // recentTotalEnd: " 条数据）"
    }
  },
  blockTitles: [{
    prop: "height",
    name: "快照块高度",
  }, {
    prop: "age",
    name: "快照块年龄",
  }, {
    prop: "transactionCount",
    name: "快照交易数",
  }, {
    prop: "hash",
    name: "快照块Hash",
  }, {
    prop: "producer",
    name: "出块地址",
  }],
  addedBlockTitles: [{
    prop: "award",
    name: "出块奖励"
  }],


  // pages/searchError
  sError: {
    text: "竟然没有搜索到，换个输入试试"
  },


  // pages/token
  token: {
    aLabel: "账户列表",
    tLabel: "交易列表",
    charts: "持有账户图表",

  },
  tokenDetailMap: {
    accountNum: "所有者数量",
    totalSupply: "铸币总量",
    owner: "铸币地址",
    transactionNumber: "交易笔数",
    decimals: "小数位数"
  },


  // pages/tokenList
  tokenList: {
    title: "代币列表",
    total: "总代币种类：",
  },
  tokenTitles: [{
    prop: "icon",
    name: "图标",
    width: 100
  }, {
    prop: "token",
    name: "代币",
    width: 300
  }, {
    prop: "price",
    name: "价格",
  }, {
    prop: "upDown",
    name: "涨跌",
  }, {
    prop: "transPrice",
    name: "交易金额",
  }, {
    prop: "famc",
    name: "流通市值",
    width: "190"
  }],


  // pages/transaction
  transaction: {
    send: "请求",
    receive: "响应",
    blockType: {
      0: {
        name: "转账",
        title: ""
      },
      1: {
        name: "注册",
        title: "注册成为快照块出块节点候选节点"
      },
      2: {
        name: "更新注册",
        title: "更新SBP注册信息"
      },
      3: {
        name: "撤销注册",
        title: "撤销注册SBP"
      },
      4: {
        name: "提取奖励",
        title: "提取出块奖励"
      },
      5: {
        name: "投票",
        title: "投票选出快照块出块节点"
      },
      6: {
        name: "撤销投票",
        title: "撤销最近一次投票"
      },
      7: {
        name: "获取配额",
        title: "抵押VITE获取配额"
      },
      8: {
        name: "取回配额抵押",
        title: ""
      },
      9: {
        name: "铸币",
        title: ""
      },
      10: {
        name: "取回铸币抵押",
        title: ""
      }
    }
  },
  transactionDetailMap: {
    hash: "交易Hash",
    fromHash: "Request交易Hash",
    toHash: "Response交易Hash",
    type: "交易类型",
    status: "交易状态",
    confirmTimes: "确认数",
    snapshotBlockHash: "首次快照块",
    timestamp: "时间戳",
    from: "发出方地址",
    to: "接收方地址",
    tokenName: "Token",
    amount: "数额",
    data: "附带的文本资料"
  },

  // pages/superNode
  superNode: {
    title: "超级节点列表",
    total: "节点总数："
  },
  nodeTitles: [{
    prop: "rank",
    name: "#",
    width: 60
  }, {
    prop: "nodeName",
    name: "节点名",
    width: 120
  }, {
    prop: "status",
    name: "状态",
    width: 100
  }, {
    prop: "voteNum",
    name: "票数"
  }, {
    prop: "produceRatio",
    name: "出块率",
    width: 90
  }, {
    prop: "expectNum",
    name: "应出块数量",
    width: 115
  }, {
    prop: "factNum",
    name: "已出块数量",
    width: 115
  }, {
    prop: "missNum",
    name: "遗漏块数量",
    width: 115
  }, {
    prop: "producerAddress",
    name: "出块地址",
    width: 160
  }, {
    prop: "curVoteAward",
    name: "今日得票奖励",
    width: 130
  }, {
    prop: "curSuperNodeAward",
    name: "今日出块奖励",
    width: 130
  }],

  // pages/tokenAccount
  tokenAccount:{
    title: "持有账户图表",
    c1: "持有账户",
    c2: "请选择",
    info: "{tokenName} 的前 {value} 名持有账户",
    info2: "前 {value} 名持有账户共持有 {percent}（共 {totalNum} 个）的 {tokenName}",
    c8: "总供给量：",
    c0: "持有账户数量：",
    dropDownList: [{
      value: 3,
      label: "前 3"
    }, {
      value: 5,
      label: "前 5"
    }, {
      value: 10,
      label: "前 10"
    }, {
      value: 50,
      label: "前 50"
    }, {
      value: 100,
      label: "前 100"
    }, {
      value: 250,
      label: "前 250"
    }, {
      value: 500,
      label: "前 500"
    }],

  },

  // pages/fullNode
  fullNode: {
    title: "全节点",
    contentTitle: {
      block: "最新快照块",
      nodeOnline: "在线节点",
      pageDelay: "页面延迟",
      broadcast: "快照块广播延迟",
      nodePosition: "节点位置",
      onlinePercent: "全部节点平均在线率"
    },
    nodeTitles: [{
      prop: "radio",
      name: "",
      width: 40
    }, {
      prop: "nodeViewName",
      name: "节点名",
      popover: true,
      width: 120
    }, {
      prop: "nodeSysInfo",
      name: "节点版本"
    }, {
      prop: "nodeDelayTimeView",
      name: "节点延迟",
    }, {
      prop: "peersNum",
      name: "邻居数",
    }, {
      prop: "latestBlockHeight",
      name: "最新块",
    }, {
      prop: "latestBlockTimeView",
      name: "最新块时间",
      popover: true
    }, {
      prop: "broadcastTimeView",
      name: "广播延迟",
      popover: true
    }, {
      prop: "broadcastTimeList",
      name: "",
      width: 260
    }, {
      prop: "avgBroadcastTimeView",
      name: "平均广播延迟",
      popover: true
    }, {
      prop: "onlinePercentView",
      name: "在线率",
    }],
    popover: {
      network: "网络",
      protocol: "协议",
      position: "位置",
      newestTime: "收到最新块的时间",
      broadcastTime: "收到最新块所需时间",
      avgBroadcastTime: "收到最近40个块所需时间平均",
      nodeOnline: "现在有{onlineNode}个节点在线，历史最多在线节点数{historyNode}个",
      percent: "广播比例",
      sumPercent: "累积比例",
      nodeName: "节点名称"
    },
    filter: {
      placeholder: "搜索节点名"
    }
  },

  pie: "持有量：",
  responseHash: "正在等待response",

  // Head titles of all pages
  head: {
    home: "Vite区块浏览器",
    blockList: "Vite区块",
    transTitle: "Vite交易信息",
    sError: "搜索无结果",
    tTitle: "代币详情",
    transDetail: "交易详情",
  },

  // Compatibility
  alert: "很抱歉目前不支持您正在使用的浏览器，请尝试其它浏览器或升级最新版本",
  attention: "提示",

  // time format
  timeFormat:{
    relativeTime: {
      past: "%s前",
      s: "%d秒",
      m: "1分钟",
      mm: "%d分钟",
      h: "1小时",
      hh: "%d小时",
      d: "1天",
      dd: "%d天",
      M: "1月",
      MM: "%d月",
      y: "1年",
      yy: "%d年"
    },
  },
};
