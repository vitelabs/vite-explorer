const AccountBlock = require("../model/AccountBlock");
const parseBody = require("./parseBody");

let accountList = [];
for (let i=0; i<10; i++) {
  accountList.push(new AccountBlock());
}

module.exports = {
  "/block": {
    method: "get",
    body: parseBody(new AccountBlock())
  },
  "/blocklist": {
    body: parseBody({
      accountList
    })
  }
};