export class Q {
  /** Creates a new queue, optionally with a specified array of items. */
  constructor(items) {
    this.reset(items);
  }
  /** Adds an item to the tail of the queue (enqueue). */
  push(item) {
    this.list[this.tail++] = item;
  }
  /** Removes one item from the head of the queue (dequeue). */
  shift() {
    const item = this.list[this.head];
    this.list[this.head++] = void 0;
    return item;
  }
  /** Returns the item at the specified index without removing it (peek). */
  at(index) {
    return this.list[(index < 0 ? this.tail : this.head) + index];
  }
  /** Number of items currently held in the queue. */
  size() {
    return this.tail == this.head ? 0 : this.tail - this.head;
  }
  /** Whether the queue has any items. */
  hasItems() {
    return this.tail != this.head;
  }
  /** Returns an array of all items in the queue. */
  toArray() {
    return this.list.slice(this.head);
  }
  /** Resets the queue, optionally to a specified array of items. */
  reset(items = []) {
    this.list = items;
    this.head = 0;
    this.tail = items.length;
  }
}
