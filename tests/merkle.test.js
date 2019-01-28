const assert = require('assert');
const expect = require('chai').expect;
const should = require('chai').should();
const Merkle = require('../lib/merkle');

describe('Merkle', () => {
  let merkle = null;

  beforeEach(() => {
    merkle = new Merkle();
  });

  describe('add', () => {
    it('adds a value', () => {
      merkle.add(1);
    });
  });
  describe('remove', () => {
    it('removes from an index', () => {
      merkle.add(1);
      merkle.remove(0);
      expect(merkle.size()).to.be.equal(1);
    });
  });
  describe('calculate root', () => {
    it('calculates the root', async () => {
      await merkle.add(1);
      await merkle.add(1);
      await merkle.add(1);
      await merkle.add(1);

      const root = await merkle.calculateRoot();
      expect(root.toString('hex').length).to.be.equal(64);
    });
    it('with no data', async () => {
      const root = await merkle.calculateRoot();

      expect(root.toString('hex').length).to.be.equal(64);
    });
  });
  describe('removeData', () => {
    it('scans and removes the first instance of the data', async () => {
      await merkle.add(0);
      await merkle.add(1);
      await merkle.add(2);
      await merkle.add(3);

      const three = merkle.removeData(3);
      expect(three).to.include.ordered.members([3]);
    });
    it('returns null if data is not found', async () => {
      const n = await merkle.removeData(true);
      expect(n).to.include.ordered.members([]);
    });
  });
});
