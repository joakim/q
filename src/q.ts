export class Q<T = unknown> {
  private list: Array<T | undefined>
  private head: number
  private tail: number

  /** Creates a new queue, optionally with a specified array of items. */
  constructor(items?: Array<T>) {
    this.reset(items)
  }

  /** Adds an item to the tail of the queue (enqueue). */
  insert(item: T) {
    this.list[this.tail++] = item
  }

  /** Removes one item from the head of the queue (dequeue). */
  remove() {
    const item = this.list[this.head]
    this.list[this.head++] = undefined
    return item
  }

  /** Returns the item at the specified index without removing it. */
  peek(index: number) {
    return this.list[(index < 0 ? this.tail : this.head) + index]
  }

  /** Number of items in the queue. */
  size() {
    return this.tail === this.head ? 0 : this.tail - this.head
  }

  /** Returns an array of all items in the queue. */
  toArray() {
    return this.list.slice(this.head)
  }

  /** Resets the queue, optionally to a specified array of items. */
  reset(items: Array<T> = []) {
    this.list = items
    this.head = 0
    this.tail = items.length
  }
}
