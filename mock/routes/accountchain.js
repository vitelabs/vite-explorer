const AccountBlock = require("../model/AccountBlock");
const parseBody = require("./parseBody");

let blockList = [];
for (let i=0; i<10; i++) {
  blockList.push(new AccountBlock());
}

module.exports = {
  "/block": {
    method: "get",
    body: parseBody(new AccountBlock())
  },
  "/blocklist": {
    body: parseBody({
      blockList,
      totalNumber: 100
    })
  }
};