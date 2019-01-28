const Hashb = require('../hashb');

class Merkle {
  constructor(config) {
    this.nodeId = config && config.nodeId || 'default';
    this.data = [];
    this.hashb = new Hashb();
    this.add(this.nodeId);
  }
  add(data) {
    return this.data.push(data);
  }
  remove(index) {
    return this.data.splice(index, 1);
  }
  removeData(data) {
    return this.remove(this.data.indexOf(data));
  }
  size() {
    return this.data.length;
  }
  async calculateRoot() {
    const data = this.data.slice();

    while (data.length > 1) {
      data.push(await this.hashb.hashb(`${data.shift()}${data.shift() || ''}`));
    }
    return this.hashb.hashb(data[0]);
  }
}

module.exports = Merkle;
