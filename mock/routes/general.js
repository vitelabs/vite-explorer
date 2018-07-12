const parseBody = require("./parseBody");

module.exports = {
  "/detail": {
    method: "get",
    body: parseBody({
      ffmCap: "aaa",
      sysTps: "bbb",
      cirPrice: "ccc",
      txTotalTAmount: 12,
      chainHeight: 20,
      txMonAmount: 30
    })
  }
};