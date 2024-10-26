export class Q {
  /** Creates a new queue, optionally with a specified array of items. */
  constructor(items) {
    this.reset(items);
  }
  /** Adds one item to the back/tail of the queue (enqueue). */
  push(item) {
    this.a.push(item);
  }
  /** Removes one item from the front/head of the queue (dequeue). */
  shift() {
    var item = this.a[this.h];
    this.a[this.h++] = void 0;
    if (this.h > 1e3 && 2 * this.h > this.a.length) {
      this.a = this.a.slice(this.h);
      this.h = 0;
    }
    return item;
  }
  /** Returns the item at the specified index without removing it (peek). */
  at(index) {
    if ((index < 0 ? -index - 1 : index) > this.a.length)
      return;
    return this.a[(index < 0 ? this.a.length : this.h) + index];
  }
  /** Number of items currently held in the queue. */
  size() {
    return this.a.length - this.h;
  }
  /** Whether the queue has any items. Useful in `while` loops. */
  hasItems() {
    return this.h != this.a.length;
  }
  /** Returns an array of all items in the queue. */
  toArray() {
    return this.a.slice(this.h);
  }
  /** Resets the queue, optionally to a specified array of items. */
  reset(items = []) {
    this.a = items;
    this.h = 0;
  }
}
