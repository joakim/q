export class Q<T = unknown> {
  private items: Array<T | undefined>
  private front: number
  private back: number

  constructor(items?: Array<T>) {
    this.reset(items)
  }

  /** Adds one item to the back of the queue (enqueue). */
  add(item: T) {
    this.items[this.back++] = item
  }

  /** Removes one item from the front of the queue (dequeue). */
  remove() {
    const item = this.items[this.front]
    this.items[this.front++] = undefined
    return item
  }

  /** Returns the item at the specified index without removing it. */
  peek(index: number) {
    return this.items[(index < 0 ? this.back : this.front) + index]
  }

  /** Number of items in the queue. */
  size() {
    return this.back === this.front ? 0 : this.back - this.front
  }

  /** Returns an array of all items in the queue. */
  toArray() {
    return this.items.slice(this.front)
  }

  /** Resets the queue, optionally to a specified array of items. */
  reset(items: Array<T> = []) {
    this.items = items
    this.front = 0
    this.back = items.length
  }
}
