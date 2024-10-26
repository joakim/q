export class Q<T = unknown> {
  /** Internal **a**rray of queued items. */
  private a: T[]

  /** Internal **h**ead of the queue (as an offset on the internal array). */
  private h: number

  /** Creates a new queue, optionally with a specified array of items. */
  constructor(items?: T[]) {
    this.reset(items)
  }

  /** Adds one item to the back/tail of the queue (enqueue). */
  push(item: T) {
    this.a.push(item)
  }

  /** Removes one item from the front/head of the queue (dequeue). */
  shift() {
    var item = this.a[this.h]
    this.a[this.h++] = undefined

    // Above some threshold, if half the array has been shifted, remove the empty portion
    if (this.h > 1000 && 2 * this.h > this.a.length) {
      this.a = this.a.slice(this.h)
      this.h = 0
    }

    return item as number | undefined
  }

  /** Returns the item at the specified index without removing it (peek). */
  at(index: number) {
    // Prevents out-of-bounds index lookups, which could reduce performance from then on (V8).
    // To validate both positive and negative indices, it converts any negative indices to
    // positive minus 1 when checking, so that index > length (-3 becomes 2).
    if ((index < 0 ? -index - 1 : index) > this.a.length) return

    // Positive indices are added to head, negative indices subtracted from tail (this.a.length).
    return this.a[(index < 0 ? this.a.length : this.h) + index]
  }

  /** Number of items currently held in the queue. */
  size() {
    return this.a.length - this.h
  }

  /** Whether the queue has any items. Useful in `while` loops. */
  hasItems() {
    return this.h != this.a.length
  }

  /** Returns an array of all items in the queue. */
  toArray() {
    return this.a.slice(this.h)
  }

  /** Resets the queue, optionally to a specified array of items. */
  reset(items: T[] = []) {
    this.a = items
    this.h = 0
  }
}
