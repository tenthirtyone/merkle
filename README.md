# merkle

## Introduction

> Array implementation of a Merkle tree

This covers every Hyperledger use case in < 30 lines of ES6. It is the most minimal blockchain implementation possible.

## Code Samples

The entire Merkle class:
```
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

module.exports = Merkle;```

## Installation

> npm install

> npm run test

```
  48 passing (27ms)

------------|----------|----------|----------|----------|-------------------|
File        |  % Stmts | % Branch |  % Funcs |  % Lines | Uncovered Line #s |
------------|----------|----------|----------|----------|-------------------|
All files   |      100 |      100 |      100 |      100 |                   |
 hashb      |      100 |      100 |      100 |      100 |                   |
  index.js  |      100 |      100 |      100 |      100 |                   |
 linkedlist |      100 |      100 |      100 |      100 |                   |
  index.js  |      100 |      100 |      100 |      100 |                   |
 merkle     |      100 |      100 |      100 |      100 |                   |
  index.js  |      100 |      100 |      100 |      100 |                   |
------------|----------|----------|----------|----------|-------------------|

```