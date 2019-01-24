const Merkle = require('../merkle');

class Block {
  constructor(options) {
    this.version = options.version || 0;
    this.prevHeader = options.prevHeader || null;
    this.merkleRoot = null;
    this.timestamp = null;
    this.merkle = new Merkle();
  }
  add(data) {
    this.merkle.add(data);
  }
}

module.exports = Block;
