class Token {
  constructor() {
    this.name = `tokenName${parseInt(Math.random()*10000)}`;
    this.id = `tokenId${parseInt(Math.random()*109090)}`;
    this.symbol = `tokenSymbol${parseInt(Math.random()*109090)}`;
    this.owner = `tokenOwner${parseInt(Math.random()*238209382)}`;
    this.decimals = parseInt(Math.random()*6);
    this.totalSupply = parseInt(Math.random()*690989);
    this.transactionNumber = parseInt(Math.random()*690989);
  }
}

module.exports = Token;