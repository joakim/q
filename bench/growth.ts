// Based on https://github.com/invertase/denque/blob/master/benchmark/growth.js

export function run(queue, size: number) {
  for (let i = 0; i < size; i++) queue.push(i)
  for (let i = 0; i < size / 2; i++) queue.shift()
  for (let i = 0; i < size; i++) queue.push(i)
  for (let i = 0; i < size + size / 2; i++) queue.shift()
}
