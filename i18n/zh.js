module.exports = {
  lang: "CH",

  // components/Home
  profile: {
    title: "概况",
    market: "vite流通市值",
    tps: "系统TPS",
    price: "vite流通价格",
    totalTrans: "历史总交易量",
    latestHeight: "最新区块高度",
    nearMonth: "近30天交易量",
    update3: "每3秒更新一次",
    tPerSec: "每秒交易次数",
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
    account: "账户",
    cost: "耗时",
    sec: "秒",
    secAgo: "秒前",
  },
  transactionList: {
    title: "交易列表",
    hash: "交易 Hash",
    from: "转出",
    to: "转入",
  },

  // components/Token
  accList: {
    title: "总账户数 --, (仅展示最近的 --条数据)"
  },
  accTitles: [{
    prop: "orderNum",
    name: "排名",
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
  logo: {
    v: "预览版",
    current: "当前版本",
    content1: "Vite区块浏览器是查询Vite综合信息的网站，目前支持账户、代币、交易、快照块的查询，基础信息的列表展示。",
    content2: "预览版V2新增统计信息展示，交易筛选、排序功能，提供持有某种Token的账户图表。",
    govite: {
      current: "go-vite 版本",
      v: "0.0.2"
    }
  },
  nav: {
    index: "首页",
    transactionList: "交易列表",
    blockList: "快照块列表",
    tokenList: "Token列表"
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
    noResult: "暂无数据"
  },
  filter: {
    filterName: "筛选",
    placeholder: "输入账户地址",
    from: "转出方",
    to: "转入方",
    sure: "确定"
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
    prop: "type",
    name: "交易类型",
    width: "120"
  }, {
    prop: "status",
    name: "状态",
    width: "100"
  }, {
    prop: "snapshotTimestamp",
    name: "首次快照块",
    width: "130"
  }, {
    prop: "timestamp",
    name: "时间戳",
  }, {
    prop: "confirmTimes",
    name: "确认数",
    width: "100"
  }, {
    prop: "from",
    name: "转出方",
    width: "160"
  }, {
    prop: "to",
    name: "转入方",
    width: "160"
  }, {
    prop: "amount",
    name: "数量",
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
      label: "接收",
      value: 1
    }, {
      label: "发送",
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
    reload: "点击重新加载",
    home: "点击返回首页",
    exception: "发生错误异常",
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
    filterInput: "筛选"
  },


  // pages/block
  block: {
    title: "快照块详情",
  },
  blockDetailMap: {
    height: "快照块高度",
    age: "快照块年龄",
    accountNum: "快照账户数",
    transactionCount: "快照交易数",
    hash: "快照块Hash",
    producer: "快照节点",
    amount: "锻造奖励"
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
    prop: "accountNum",
    name: "快照账户数",

  }, {
    prop: "producer",
    name: "快照节点",

  }, {
    prop: "hash",
    name: "Hash",

  }, {
    prop: "price",
    name: "锻造奖励",
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
  }, {
    prop: "token",
    name: "代币",
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
    send: "发送",
    receive: "接收",
  },
  transactionDetailMap: {
    hash: "交易Hash",
    type: "交易类型",
    status: "交易状态",
    confirmTimes: "确认数",
    snapshotBlockHash: "首次快照块",
    timestamp: "时间戳",
    from: "转出方地址",
    to: "转入方地址",
    tokenName: "Token",
    amount: "数额",
    introduction: "附带的文本资料"
  },

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

  pie: "持有量：",

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
