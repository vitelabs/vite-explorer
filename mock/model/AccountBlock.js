const Token = require("./Token");

class AccountBlock {
  constructor() {
    this.height = `accountBlockHeight${parseInt(Math.random()*2309283)}`;
    this.accountAddress = `accountBlockAccountAddress${parseInt(Math.random()*2309283)}`; 
    this.to = `accountBlockTo${parseInt(Math.random()*2309283)}`;
    this.from = `accountBlockFrom${parseInt(Math.random()*2309283)}`;
    this.fromHash = `accountBlockFromHash${parseInt(Math.random()*2309283)}`;
    this.prevHash = `accountBlockPrevHash${parseInt(Math.random()*2309283)}`;
    this.status = parseInt(Math.random() * 3);
    this.balance = `accountBlockBalance${parseInt(Math.random()*2309283)}`;
    this.amount = `accountBlockAmount${parseInt(Math.random()*2309283)}`;
    this.token = new Token();
    this.data = `accountBlockData${parseInt(Math.random()*2309283)}`;
    this.snapshotTimestamp = `accountBlockSnapshotTimestamp${parseInt(Math.random()*2309283)}`;
    this.signature = `accountBlockSignature${parseInt(Math.random()*2309283)}`;
    this.nounce = `accountBlockNounce${parseInt(Math.random()*2309283)}`;
    this.difficulty = parseInt(Math.random()*2309283);
    this.fAmount = `accountBlockFAmount${parseInt(Math.random()*2309283)}`;
  }
}

module.exports = AccountBlock;