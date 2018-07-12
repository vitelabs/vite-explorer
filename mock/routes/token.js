const Token = require("../model/Token");
const parseBody = require("./parseBody");

let tokenList = [];
for (let i=0; i<10; i++) {
  tokenList.push(new Token());
}

module.exports = {
  "/detail": {
    method: "get",
    body: parseBody({ tokenList: [new Token()] })
  },
  "/list": {
    body: parseBody({
      tokenList
    })
  }
};