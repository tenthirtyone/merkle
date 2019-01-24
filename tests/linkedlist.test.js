const assert = require('assert');
const expect = require('chai').expect;
const should = require('chai').should();
const LinkedList = require('../lib/linkedlist/index.js');

describe('LinkedList', () => {
  let ll = null;

  beforeEach(() => {
    ll = new LinkedList();
  });

  it('should exist', () => {
    expect(ll).to.exist;
  });
  it('has a head property that is null', () => {
    expect(ll).to.have.own.property('head');
    expect(ll.head).to.be.equal(null);
  });
  it('has a tail property', () => {
    expect(ll).to.have.own.property('tail');
    expect(ll.tail).to.be.equal(null);
  });
  it('has a length property', () => {
    expect(ll.length).to.be.equal(0);
  });
  it('has an add function', () => {
    ll.add.should.be.a('function');
  });
  it('has a remove function', () => {
    ll.remove.should.be.a('function');
  });
  it('has a map function', () => {
    ll.remove.should.be.a('function');
  });

  describe('.add tests', () => {
    describe('Adding a single node', () => {
      beforeEach(async () => {
        await ll.add(true);
      });
      it('The head is the tail', () => {
        expect(ll.head).to.be.equal(ll.tail);
      });
      it('Increases the length by 1', () => {
        expect(ll.length).to.be.equal(1);
      });
    });
    describe('Adding multiple nodes', () => {
      beforeEach(async () => {
        await ll.add(true);
        await ll.add(true);
        await ll.add(true);
      });
      it('The head is not the tail', () => {
        expect(ll.head).to.not.be.equal(ll.tail);
      });
      it('The length is 3', () => {
        expect(ll.length).to.be.equal(3);
      });
    });
  });

  describe('.remove tests', () => {
    describe('Removing a node', () => {
      beforeEach(async () => {
        await ll.add(0);
        await ll.add(1);
        await ll.add(2);
      });
      it('The length decreases by 1', () => {
        const oldLength = ll.length;
        ll.remove(0);
        expect(ll.length).to.be.equal(oldLength - 1);
      });
      it('Removes the head', () => {
        ll.remove(0);
        expect(ll.head.data).to.be.equal(1);
      });
      it('Removes the tail', () => {
        ll.remove(2);
        expect(ll.tail.data).to.be.equal(1);
      });
      it('Removes the middle node', () => {
        ll.remove(1);
        expect(ll.head.data).to.be.equal(0);
        expect(ll.tail.data).to.be.equal(2);
      });
      it('Remove data does not exist', () => {
        ll.remove(false);
        expect(ll.length).to.be.equal(3);
      });
    });
  });

  describe('.shift tests', () => {
    beforeEach(async () => {
      await ll.add(0);
      await ll.add(1);
    });
    it('Returns the head value and deletes the element', () => {
      const node = ll.shift();
      expect(node.data).to.be.equal(0);
      expect(ll.length).to.be.equal(1);
    });
    it('Returns null if length === 0', () => {
      ll.shift();
      ll.shift();
      const node = ll.shift();
      expect(node).to.be.equal(null);
    });
  });

  describe('.map tests', () => {
    beforeEach(async () => {
      await ll.add(0);
      await ll.add(1);
      await ll.add(2);
      await ll.add(3);
      await ll.add(4);
    });
    it('Sets all data to true', () => {
      ll.map((node) => {
        node.data = true;
      });
      expect(ll.head.data).to.be.equal(true);
    });
    it('Does not crash when called without a function', () => {
      ll.map();
    });
  });
});
