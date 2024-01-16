import { describe, it, expect } from 'vitest'
import { Q } from '../dist/q-min'

describe('constructor', () => {
  it('should default to an empty queue', () => {
    const queue = new Q()
    expect(queue.toArray()).toEqual([])
  })

  it('should allow setting of items', () => {
    const queue = new Q([1, 2, 3])
    expect(queue.toArray()).toEqual([1, 2, 3])
  })
})

describe('push', () => {
  const queue = new Q([1, 2, 3])

  it('should add an item to the back of the queue', () => {
    queue.push(4)
    expect(queue.toArray()).toEqual([1, 2, 3, 4])
  })

  it('should accept no argument (undefined)', () => {
    // @ts-ignore
    queue.push()
    expect(queue.toArray()).toEqual([1, 2, 3, 4, undefined])
  })
})

describe('shift', () => {
  const queue = new Q([1, 2, 3])

  it('should remove one item from the front of the queue', () => {
    const item = queue.shift()
    expect(item).toBe(1)
    expect(queue.toArray()).toEqual([2, 3])
  })
})

describe('at', () => {
  const queue = new Q([1, 2, 3])

  it('should return correct items', () => {
    expect(queue.at(0)).toBe(1)
    expect(queue.at(1)).toBe(2)
    expect(queue.at(2)).toBe(3)
    expect(queue.at(-1)).toBe(3)
    expect(queue.at(-2)).toBe(2)
    expect(queue.at(-3)).toBe(1)
  })

  it('should return undefined for index out of bounds', () => {
    expect(queue.at(4)).toBe(undefined)
    expect(queue.at(-5)).toBe(undefined)
  })

  it('should return undefined for missing argument', () => {
    // @ts-ignore
    expect(queue.at()).toBeUndefined()
  })
})

describe('size', () => {
  const queue = new Q([1, 2, 3])

  it('should return the correct size of the queue', () => {
    expect(queue.size()).toBe(3)
    queue.shift()
    queue.shift()
    expect(queue.size()).toBe(1)
    queue.push(4)
    queue.push(5)
    queue.push(6)
    expect(queue.size()).toBe(4)
    queue.reset()
    expect(queue.size()).toBe(0)
  })
})

describe('hasItems', () => {
  it('should return whether the queue has any items', () => {
    const queue = new Q([1, 2, 3])
    expect(queue.hasItems()).toBe(true)
    queue.reset()
    expect(queue.hasItems()).toBe(false)
  })
})

describe('toArray', () => {
  const queue = new Q([1, 2, 3])

  it('should return an array', () => {
    expect(queue.toArray()).toEqual([1, 2, 3])
  })

  it('should return only remaining items', () => {
    queue.push(4)
    queue.shift()
    queue.shift()
    queue.shift()
    expect(queue.toArray()).toEqual([4])
  })
})

describe('reset', () => {
  const queue = new Q([1, 2, 3])

  it('should clear the queue', () => {
    queue.reset()
    expect(queue.toArray()).toEqual([])
  })

  it('should reset the queue to the provided array', () => {
    queue.reset([1, 2, 3])
    expect(queue.toArray()).toEqual([1, 2, 3])
  })
})
