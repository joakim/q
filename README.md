# Q

![Size](https://img.shields.io/badge/size-398_B-blue)
![Dependencies](https://img.shields.io/badge/dependencies-none-green)
![License](https://img.shields.io/badge/license-public_domain-green)
![Maintenance](https://img.shields.io/badge/maintained-yes-green)

A tiny and simple [FIFO](https://en.wikipedia.org/wiki/FIFO_(computing_and_electronics)) [queue](https://en.wikipedia.org/wiki/Queue_(abstract_data_type)) with [decent](#performance) performance.

- Simple interface
- 398 bytes minified (214 bytes gzipped)
- Documentation and TypeScript declarations
- Tests and benchmarks
- No dependencies
- Public domain


## Installation

Use your package manager of choice:

```sh
npm install @joakimstai/q
```

```sh
pnpm add @joakimstai/q
```

The library targets ES2020.

## Usage

#### Importing

Import `Q` using the appropriate method for your environment:

```js
import { Q } from '@joakimstai/q'
```

```js
const { Q } = require('@joakimstai/q')
```

#### Create a queue

```js
const queue = new Q()
```

Optionally, specify items up front:

```js
const queue = new Q([1, 2, 3])
```

#### Add an item to back/tail of the queue (enqueue)

```js
queue.push(4)
```

#### Remove one item from front/head of the queue (dequeue)

```js
queue.shift() // 1
```

#### Read any item in the queue by its index (peek)

```js
queue.at(0)  // 2 (front)
queue.at(1)  // 3
queue.at(-1) // 4 (back)
```

#### Check the size of the queue

```js
queue.size() // 3
```

#### Check whether the queue has any items

```js
while (queue.hasItems()) { … // true
```

#### Get all queued items as an array

```js
queue.toArray() // [2, 3, 4]
```

#### Reset the queue

```js
queue.reset()
```

Optionally, specify items to reset to:

```js
queue.reset([1, 2, 3])
```

That's it.


## Performance

`Q` is about twice as fast as using `Array` as a makeshift queue. It can't match the highly optimized [`denque`](https://github.com/invertase/denque/) and [`fast-fifo`](https://github.com/mafintosh/fast-fifo), but when size is a priority, it should be more than performant enough for most use cases. Not bad for ~200 bytes gzipped.

Below are results of benchmarks adapted from those of [`denque`](https://github.com/invertase/denque/) and [`fast-fifo`](https://github.com/mafintosh/fast-fifo), executed on JavaScriptCore with [`tinybench`](https://github.com/tinylibs/tinybench/) and [`bun run`](https://bun.sh/docs/cli/run).

Benchmarking is not my expertise, so I can't give an explanation or analysis of the results. Take it for what it is. YMMV, grain of salt and all that.

#### [bench/fifo.ts](bench/fifo.ts)

```
┌───┬───────────────────┬─────────┬────────────────────┬─────────┬─────────┐
│   │ Task Name         │ ops/sec │ Average Time (ns)  │ Margin  │ Samples │
├───┼───────────────────┼─────────┼────────────────────┼─────────┼─────────┤
│ 0 │ bulk:denque       │ 53,872  │ 18562.28950999995  │ ±0.08%  │ 100000  │
│ 1 │ bulk:fifo         │ 52,032  │ 19218.634540000847 │ ±0.09%  │ 100000  │
│ 2 │ bulk:q            │ 35,813  │ 27922.10162999754  │ ±58.10% │ 100000  │
│ 3 │ bulk:array        │ 16,020  │ 62418.668570000336 │ ±0.24%  │ 100000  │
│ 4 │ individual:denque │ 56,777  │ 17612.619739996448 │ ±0.09%  │ 100000  │
│ 5 │ individual:fifo   │ 53,141  │ 18817.852309992722 │ ±0.10%  │ 100000  │
│ 6 │ individual:q      │ 30,699  │ 32574.258620005203 │ ±95.94% │ 100000  │
│ 7 │ individual:array  │ 19,597  │ 51027.722609998156 │ ±0.52%  │ 100000  │
└───┴───────────────────┴─────────┴────────────────────┴─────────┴─────────┘
```

#### [bench/two-million.ts](bench/two-million.ts)

```
┌───┬───────────┬────────────┬────────────────────┬─────────┬─────────┐
│   │ Task Name │ ops/sec    │ Average Time (ns)  │ Margin  │ Samples │
├───┼───────────┼────────────┼────────────────────┼─────────┼─────────┤
│ 0 │ denque    │ 11,716,219 │ 85.35176464763387  │ ±0.16%  │ 5858110 │
│ 1 │ fifo      │ 10,629,709 │ 94.07594976726048  │ ±0.20%  │ 5314855 │
│ 2 │ q         │ 9,411,504  │ 106.25293486521234 │ ±37.35% │ 4705753 │
│ 3 │ array     │ 4,353,245  │ 229.71365367312185 │ ±7.13%  │ 2176623 │
└───┴───────────┴────────────┴────────────────────┴─────────┴─────────┘
```
