// Based on https://github.com/invertase/denque/blob/master/benchmark/two_million.js

import { Bench } from 'tinybench'
import Denque from 'denque'
import FIFO from 'fast-fifo'
import { Q } from '../dist/q-min'

const denque = new Denque()
const fifo = new FIFO()
const q = new Q()
const array = new Array()

let l = 2_000_000
while (--l) {
  denque.push(l)
  fifo.push(l)
  q.push(l)
  array.push(1)
}

function run(queue) {
  let a = queue.shift()
  let b = queue.shift()
  let c = queue.shift()

  queue.push(a)
  queue.push(b)
  queue.push(c)
}

const bench = new Bench()

bench
  .add('denque', () => run(denque))
  .add('fifo', () => run(fifo))
  .add('q', () => run(q))
  .add('array', () => run(array))

await bench.warmup()
await bench.run()

console.table(bench.table())
