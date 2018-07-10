module.exports = {
  lang: "中文",

  // components/Home
  profile: {
    title: "概况",
    market: "Vite流通市值",
    tps: "系统TPS",
    price: "Vite流通价格",
    totalTrans: "历史总交易量",
    latestHeight: "最新区块高度",
    nearMonth: "近30天交易量",
  },
  lineChart: {
    title: "交易曲线"
  },
  snapshotList: {
    title: "快照块列表",
    height: "快照块高度：",
    node: "出块节点：",
    pack: "打包",
    account: "账户",
    cost: "耗时",
    sec: "秒",
    secAgo: "秒前",
  },
  transactionList: {
    title: "交易列表",
    hash: "交易Hash",
    from: "转入",
    to: "转出",
  },

  // components/Token
  accList: {
    title: "总账户数----, (仅展示最近的----条数据)"
  },

  // Basic components part: components/
  footer: {
    official: "官网"
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
    placeholder: "支持搜索区块、交易、账户、代币"
  },
  utils: {
    more: "更多"
  },


  // components/transList.vue
  transList: {
    title: "总交易笔数----",
    label: "交易列表"
  },
  transTitles: [{
    prop: "hash",
    name: "交易Hash",
  }, {
    prop: "type",
    name: "交易类型",
  }, {
    prop: "status",
    name: "状态",
  }, {
    prop: "snapshotTimestamp",
    name: "首次快照块",
  }, {
    prop: "timestamp",
    name: "时间戳",
  }, {
    prop: "confirmTimes",
    name: "确认数",
  }, {
    prop: "from",
    name: "转出方",
  }, {
    prop: "to",
    name: "转入方",
  }],
  addedTitle: {
    prop: "tokenName",
    name: "代币"
  },


  // layouts/
  error: {
    reload: "点击重新加载",
    home: "点击返回首页",
    exception: "发生错误异常",
  },


  // pages/account
  account: {
    title: "账户详情"
  },


  // pages/blockList
  blkList: {
    title: "总区块量----, (仅展示最近的----条数据)"
  },
  blockTitles: [{
    prop: "height",
    name: "快照块高度",
  }, {
    prop: "years",
    name: "快照块年龄",

  }, {
    prop: "accountNum",
    name: "打包账户数",

  }, {
    prop: "producer",
    name: "出块节点",

  }, {
    prop: "hash",
    name: "快照块Hash",

  }, {
    prop: "amount",
    name: "锻造奖励",
  }],


  // pages/tokenList
  tokenList: {
    title: "代币列表",
    cut1: "总计有",
    cut2: "种代币",
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
  }],



  // Head titles of all pages
  head: {
    home: "首页",
    blockList: "所有区块",
    transTitle: "所有交易",
  }
};
