const Account = require("../model/Account");
const parseBody = require("./parseBody");

module.exports = {
  "/": {
    method: "get",
    body: parseBody(new Account())
  }
};