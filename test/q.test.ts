import { describe, it, expect } from 'vitest'
import { Q } from '../src/q'

describe('constructor', () => {
  it('should default to an empty queue', () => {
    const q = new Q()
    expect(q.toArray()).toEqual([])
  })

  it('should allow setting of items', () => {
    const q = new Q([1, 2, 3])
    expect(q.toArray()).toEqual([1, 2, 3])
  })
})

describe('push', () => {
  const q = new Q([1, 2, 3])

  it('should add an item to the back of the queue', () => {
    q.push(4)
    expect(q.toArray()).toEqual([1, 2, 3, 4])
  })

  it('should accept no argument (undefined)', () => {
    // @ts-ignore
    q.push()
    expect(q.toArray()).toEqual([1, 2, 3, 4, undefined])
  })
})

describe('shift', () => {
  const q = new Q([1, 2, 3])

  it('should remove one item from the front of the queue', () => {
    const item = q.shift()
    expect(item).toBe(1)
    expect(q.toArray()).toEqual([2, 3])
  })
})

describe('at', () => {
  const q = new Q([1, 2, 3])

  it('should return correct items', () => {
    expect(q.at(0)).toBe(1)
    expect(q.at(1)).toBe(2)
    expect(q.at(2)).toBe(3)
    expect(q.at(-1)).toBe(3)
    expect(q.at(-2)).toBe(2)
    expect(q.at(-3)).toBe(1)
  })

  it('should return undefined for index out of bounds', () => {
    expect(q.at(4)).toBe(undefined)
    expect(q.at(-5)).toBe(undefined)
  })
})

describe('size', () => {
  const q = new Q([1, 2, 3])

  it('should return the correct size of the queue', () => {
    expect(q.size()).toBe(3)
    q.shift()
    q.shift()
    expect(q.size()).toBe(1)
    q.push(4)
    q.push(5)
    q.push(6)
    expect(q.size()).toBe(4)
    q.reset()
    expect(q.size()).toBe(0)
  })
})

describe('toArray', () => {
  const q = new Q([1, 2, 3])

  it('should return an array', () => {
    expect(q.toArray()).toEqual([1, 2, 3])
  })

  it('should return only remaining items', () => {
    q.push(4)
    q.shift()
    q.shift()
    q.shift()
    expect(q.toArray()).toEqual([4])
  })
})

describe('reset', () => {
  const q = new Q([1, 2, 3])

  it('should clear the queue', () => {
    q.reset()
    expect(q.toArray()).toEqual([])
  })

  it('should reset the queue to the provided array', () => {
    q.reset([1, 2, 3])
    expect(q.toArray()).toEqual([1, 2, 3])
  })
})
