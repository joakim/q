// Based on https://github.com/mafintosh/fast-fifo/blob/master/bench.js

import { Bench } from 'tinybench'
import Denque from 'denque'
import FIFO from 'fast-fifo'
import { Q } from '../dist/q-min'

const denque = new Denque()
const fifo = new FIFO()
const q = new Q()
const array = new Array()

const bench = new Bench({ iterations: 100_000 })

const runs = 1024

function bulk(q) {
  for (let i = 0; i < runs; i++) {
    q.push(i)
  }
  for (let i = 0; i < runs; i++) {
    q.shift()
  }
}

function individual(q) {
  for (let i = 0; i < runs; i++) {
    q.push(i)
    q.shift()
  }
}

bench
  .add('bulk:denque', () => bulk(denque))
  .add('bulk:fifo', () => bulk(fifo))
  .add('bulk:q', () => bulk(q))
  .add('bulk:array', () => bulk(array))
  .add('individual:denque', () => individual(denque))
  .add('individual:fifo', () => individual(fifo))
  .add('individual:q', () => individual(q))
  .add('individual:array', () => individual(array))

await bench.warmup()
await bench.run()

console.table(bench.table())
