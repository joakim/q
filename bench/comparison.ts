// Based on https://github.com/invertase/denque/blob/master/benchmark/two_million.js

import { Bench } from 'tinybench'
import Denque from 'denque'
import FIFO from 'fast-fifo'
import { Q } from '../src/q.ts'

const denque = new Denque()
const fifo = new FIFO()
const queue = new Q()

const bench = new Bench()

let l = 2_000_000

while (--l) {
  denque.push(l)
  fifo.push(l)
  queue.insert(l)
}

bench
  .add('denque', () => {
    let a = denque.shift()
    let b = denque.shift()
    let c = denque.shift()

    denque.push(a)
    denque.push(b)
    denque.push(c)
  })
  .add('fast-fifo', () => {
    let a = fifo.shift()
    let b = fifo.shift()
    let c = fifo.shift()

    fifo.push(a)
    fifo.push(b)
    fifo.push(c)
  })
  .add('queue', () => {
    let a = queue.remove()
    let b = queue.remove()
    let c = queue.remove()

    queue.insert(a)
    queue.insert(b)
    queue.insert(c)
  })

await bench.run()

console.table(bench.table())
