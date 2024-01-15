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

describe('add', () => {
  const q = new Q([1, 2, 3])

  it('should add an item to the back of the queue', () => {
    q.insert(4)
    expect(q.toArray()).toEqual([1, 2, 3, 4])
  })

  it('should accept no argument (undefined)', () => {
    // @ts-ignore
    q.insert()
    expect(q.toArray()).toEqual([1, 2, 3, 4, undefined])
  })
})

describe('remove', () => {
  const q = new Q([1, 2, 3])

  it('should remove an item from the front of the queue', () => {
    const item = q.remove()
    expect(item).toBe(1)
    expect(q.toArray()).toEqual([2, 3])
  })
})

describe('peek', () => {
  const q = new Q([1, 2, 3])

  it('should return correct items', () => {
    expect(q.peek(0)).toBe(1)
    expect(q.peek(1)).toBe(2)
    expect(q.peek(2)).toBe(3)
    expect(q.peek(-1)).toBe(3)
    expect(q.peek(-2)).toBe(2)
    expect(q.peek(-3)).toBe(1)
  })

  it('should return undefined for index out of bounds', () => {
    expect(q.peek(4)).toBe(undefined)
    expect(q.peek(-5)).toBe(undefined)
  })
})

describe('size', () => {
  const q = new Q([1, 2, 3])

  it('should return the correct size of the queue', () => {
    expect(q.size()).toBe(3)
    q.remove()
    q.remove()
    expect(q.size()).toBe(1)
    q.insert(4)
    q.insert(5)
    q.insert(6)
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
    q.insert(4)
    q.remove()
    q.remove()
    q.remove()
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
