const Hashb = require('../hashb');

class Merkle {
  constructor() {
    this.data = [];
    this.hashb = new Hashb();
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
    while (this.data.length > 1) {
      this.data.push(await this.hashb.hashb(`${this.data.shift()}${this.data.shift()}`));
    }
    return this.data[0];
  }
}

module.exports = Merkle;
