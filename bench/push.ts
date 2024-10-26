// Based on https://github.com/zrwusa/data-structure-typed/blob/main/test/performance/data-structures/queue/queue.test.ts

export function run(queue, size: number) {
  for (let i = 0; i < size; i++) queue.push(i)
}
