class SnapshotBlock {
  constructor(){
    this.hash = `snapshotBlockHahs${parseInt(Math.random()*38403483)}`;
    this.prevHash = `snapshotBlockPrevHash${parseInt(Math.random()*38403483)}`;
    this.height = `snapshotBlockHeight${parseInt(Math.random()*82038230)}`;
    this.producer = `snapshotBlockProducer${parseInt(Math.random()*238230923)}`;
    this.snapshot = {
      "x": "ewewe",
      "y": "ewewe",
      "t": "ewewe",
      "xe": "ewewe",
      "xw": "ewewe",
      "xws": "ewewe"
    };
    this.signature = `snapshotBlockSignature${parseInt(Math.random()*238230923)}`;
    this.amount = `snapshotBlockAmount${parseInt(Math.random()*238230923)}`;
  }
}

module.exports = SnapshotBlock;