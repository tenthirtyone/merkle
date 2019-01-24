const Hashb = require('../hashb');

/**
 * Holds linkedlist data
 *
 * @class Node
 */
class Node {
  constructor(data, hash) {
    this.data = data;
    this.hash = hash;
    this.next = null;
  }
}

/**
 * Slim version of a linkedlist
 *
 * @class LinkedList
 */
class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.hash = new Hashb();
    this.length = 0;
  }

  /**
   * Adds a node as at the tail
   *
   * @param {*} data The data to store
   * @returns {number} The new length
   * @memberof LinkedList
   */
  async add(data) {
    const node = new Node(data, await this.hash.hashb(data));

    if (!this.head) {
      this.head = node;
      this.tail = node;
    } else {
      this.tail.next = node;
      this.tail = node;
    }

    return this.length++;
  }
  /**
   * Removes all elements containing data
   *
   * @param {*} data The data to match
   * @returns {void}
   * @memberof LinkedList
   */
  remove(data) {
    let current = this.head;
    let prev = this.head;

    while(current) {
      if (current.data === data) {
        if (current === this.head) {
          this.head = this.head.next;
        }

        if (current === this.tail) {
          this.tail = prev;
        }

        prev.next = current.next;
        this.length--;
      } else {
        prev = current;
      }

      current = current.next;
    }
    return ;
  }
  /**
   * Returns the node from this.head and removes the head.
   *
   * @returns {*} head data
   * @memberof LinkedList
   */
  shift() {
    if (this.length > 0) {
      const node = this.head;
      this.head = this.head.next;
      this.length--;
      return node;
    }
    return null;
  }
  /**
   * Applies a function to every element in the linkedlist
   *
   * @param {*} fn function to map
   * @returns {void}
   * @memberof LinkedList
   */
  map(fn) {
    let current = this.head;

    while(current) {
      if (fn) {
        fn(current);
      }
      current = current.next;
    }

    return null;
  }
}

module.exports = LinkedList;
