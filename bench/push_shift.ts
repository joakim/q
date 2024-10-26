// Based on https://github.com/mafintosh/fast-fifo/blob/master/bench.js
//      and https://github.com/zrwusa/data-structure-typed/blob/main/test/performance/data-structures/queue/queue.test.ts

export function run(queue, size: number) {
  for (let i = 0; i < size; i++) queue.push(i)
  for (let i = 0; i < size; i++) queue.shift()
}
