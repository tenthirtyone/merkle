const fs = require('fs');
const crypto = require('crypto');

/**
 * Wrapper for crypto
 *
 * @class hashb
 */
class Hashb {
  constructor(options) {
    this.options = options || {};

    this.encoding = this.options.encoding || 'hex';
    this.algorithm = this.options.algorithm || 'sha256';
    }
  /**
   * Convenience method
   *
   * @param {*} data Data to hash
   * @returns {Promise|error} Buffer
   * @memberof hashb
   */
  async hashb(data) {
    if (typeof data === 'number') {
      return this.fromString(data.toString(10));
    }
    if (fs.existsSync(data)) {
      return this.fromFile(data);
    }
    if (typeof data === 'string') {
      return this.fromString(data);
    }
    if (typeof data === 'boolean') {
      return this.fromString(data.toString(2));
    }
    if (Array.isArray(data)) {
      return this.fromString(data);
    }
    if (Buffer.isBuffer(data)) {
      return this.fromString(data);
    }
    if (data !== null &&
      typeof data === 'object' &&
      typeof data.pipe === 'function') {
        return this.fromStream(data);
    }

    throw new Error(`data can be an string, string[], number, boolean, buffer, stream or file path not ${typeof data}`);
  }
  update(data) {
    const encoding = typeof data === 'string' ? 'utf8' : undefined;

    Array.isArray(data) ?
      data.forEach(d => this.hash.update(d, encoding))
      :
      this.hash.update(data, encoding);
  }
  fromString(data) {
    this.hash = crypto.createHash(this.algorithm);
    this.update(data);
    return this.hash.digest(this.algorithm);
  }
  stream() {
    return crypto.createHash(this.algorithm).setEncoding(this.encoding);
  }
  fromStream(stream) {
    return stream !== null &&
    typeof stream === 'object' &&
    typeof stream.pipe === 'function' ?
      new Promise((resolve, reject) => {
        stream
          .on('error', reject)
          .pipe(this.stream())
          .on('error', reject)
          .on('finish', function() {
            resolve(this.read());
          });
      })
      :
      Promise.reject(new TypeError('fromStream expects a stream'));
  }
  fromFile(path) {
    return this.fromStream(fs.createReadStream(path));
  }
  fromFileSync(path) {
    return this.fromString(fs.readFileSync(path));
  }
}

module.exports = Hashb;
