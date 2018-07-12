const Account = require("../model/Account");
const parseBody = require("./parseBody");

module.exports = {
  "/detail": {
    method: "get",
    body: parseBody(new Account())
  }
};