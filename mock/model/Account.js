const Token = require("./Token");

class Account {
  constructor(tokenListNum = 6) {
    this.accountAddress = `accountAddress${parseInt(Math.random()*1000)}`;
    this.blockHeight = parseInt(Math.random()*10000);

    let tokenList = [];
    for(let i=0; i<tokenListNum; i++) {
      tokenList.push({
        token: new Token(),
        balance: parseInt(Math.random()*10000)
      });
    }
    this.tokenList = tokenList;
  }
}

module.exports = Account;
