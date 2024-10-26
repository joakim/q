// Based on https://github.com/invertase/denque/blob/master/benchmark/thousand.js

export function prep(queue, size: number) {
  for (let i = 0; i < size; i++) queue.push(i)
}

export function run(queue) {
  let a = queue.shift()
  let b = queue.shift()
  let c = queue.shift()

  queue.push(a)
  queue.push(b)
  queue.push(c)
}
