const assert = require('assert');
const expect = require('chai').expect;
const should = require('chai').should();
const Hashb = require('../lib/hashb');
const { Readable } = require('stream');
const fs = require('fs');

describe('Hashb', () => {
  let hashb = null;
  const filepath = './package.json';
  const hashStr = 'The Times 03/Jan/2009 Chancellor on brink of second bailout for banks';
  const hashArr = [
    'string1',
    'string2',
    'string3'
  ];
  const answer = 'a6d72baa3db900b03e70df880e503e9164013b4d9a470853edc115776323a098';
  const arrAnswer = 'c8fa773cd54e7a7eb7ca08577d0bd23e6ce3a73e61df176213d9ec90f06cb45f';

  beforeEach(() => {
    hashb = new Hashb();
  });

  it('should exist', () => {
    expect(hashb).to.exist;
  });
  it('has an options', () => {
    expect(hashb).to.have.own.property('options');
  });
  it('has an options', () => {
    expect(hashb).to.have.own.property('encoding');
  });
  it('has an options', () => {
    expect(hashb).to.have.own.property('algorithm');
  });
  it('has an update function', () => {
    hashb.update.should.be.a('function');
  });
  it('has an fromString function', () => {
    hashb.fromString.should.be.a('function');
  });
  it('has an stream function', () => {
    hashb.stream.should.be.a('function');
  });
  it('has an fromStream function', () => {
    hashb.fromStream.should.be.a('function');
  });
  it('has an fromFile function', () => {
    hashb.fromFile.should.be.a('function');
  });
  it('has an fromFileSync function', () => {
    hashb.fromFileSync.should.be.a('function');
  });
  describe('options', () => {

  });
  describe('fromString', () => {
    it(`hashes ${hashStr}`, () => {
      const hash = hashb.fromString(hashStr).toString('hex');
      expect(hash).to.be.equal(answer);
    });
    it('hashes an array of strings', () => {
      const hash = hashb.fromString(hashArr).toString('hex');
      expect(hash).to.be.equal(arrAnswer);
    });
  });
  describe('stream', () => {
    it('returns a hash', () => {
      const hash = hashb.stream();
      hash.update(hashStr);
      const h = hash.digest('hex');
      expect(h).to.be.equal(answer);
    });
  });
  describe('fromStream', () => {
    it('hashes a Readable Stream', async () => {
      const stream = new Readable({
        read() {}
      });

      stream.push(Buffer.from(hashStr, 'utf8'));
      stream.push(null);

      const hash = await hashb.fromStream(stream);
      expect(hash).to.be.equal(answer);
    });
    it('throws without a stream', async () => {
      try {
        await hashb.fromStream(null);
      } catch (e) {
        expect(e.message).to.be.equal('fromStream expects a stream');
      }
    });
  });
  describe('fromFile', () => {
    it('hashes a file async', async() => {
      const hash = await hashb.fromFile(filepath);
      expect(hash.length).to.be.equal(64);
    });
    it('hashes a file sync', () => {
      const hash = hashb.fromFileSync(filepath);
      expect(hash.toString('hex').length).to.be.equal(64);
    });
  });
  describe('hashb', () => {
    it('handles nothing', async () => {
      try {
        const hash = await hashb.hashb();
      } catch (e) {
        expect(e.message).to.be.equal('data can be an string, string[], number, boolean, buffer, stream or file path not undefined');
      }
    });
    it('handles null', async () => {
      try {
        const hash = await hashb.hashb(null);
      } catch (e) {
        expect(e.message).to.be.equal('data can be an string, string[], number, boolean, buffer, stream or file path not object');
      }
    });
    it('hashes a string', async () => {
      const hash = await hashb.hashb(hashStr);
      expect(hash.toString('hex')).to.be.equal(answer);
    });
    it('hashes a file', async () => {
      const hash = await hashb.hashb(filepath);
      expect(hash.length).to.be.equal(64);
    });
    it('hashes an array of strings', async() => {
      const hash = await hashb.hashb(hashArr);
      expect(hash.toString('hex')).to.be.equal(arrAnswer);
    });
    it('hashes a stream', async () => {
      const stream = new Readable({
        read() { }
      });

      stream.push(Buffer.from(hashStr, 'utf8'));
      stream.push(null);

      const hash = await hashb.hashb(stream);
      expect(hash).to.be.equal(answer);
    });
    it('hashes a Buffer', async () => {
      const data = Buffer.from(hashStr);
      const hash = await hashb.hashb(data);
      expect(hash.toString('hex')).to.be.equal(answer);
    });
    it('throws if null', async () => {
      try {
        await hashb.hashb(null);
      } catch(e) {
        expect(e.message).to.be.equal('data can be an string, string[], number, boolean, buffer, stream or file path not object');
      }
    });
  });
});
