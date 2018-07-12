const SnapshotBlock = require("../model/SnapshotBlock");
const parseBody = require("./parseBody");

let blockList = [];
for (let i=0; i<10; i++) {
  blockList.push(new SnapshotBlock());
}

module.exports = {
  "/block": {
    method: "get",
    body: parseBody(new SnapshotBlock())
  },
  "/blocklist": {
    body: parseBody({
      blockList,
      totalNumber: 100
    })
  }
};
