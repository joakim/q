# Q

![Size](https://img.shields.io/badge/size-342_B-blue)
![Dependencies](https://img.shields.io/badge/dependencies-none-green)
![License](https://img.shields.io/badge/license-public_domain-green)
![Maintenance](https://img.shields.io/badge/maintained-yes-green)

A tiny and simple [FIFO](https://en.wikipedia.org/wiki/FIFO_(computing_and_electronics)) [queue](https://en.wikipedia.org/wiki/Queue_(abstract_data_type)) with [decent](#performance) performance.

- Simple interface
- 342 bytes minified (204 bytes gzipped)
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

Optionally, specify an array of items up front:

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

Optionally, specify an array of items to reset to:

```js
queue.reset([1, 2, 3])
```

That's it.


## Performance

Below are the results of benchmarks adapted from [`denque`](https://github.com/invertase/denque/) and [`fast-fifo`](https://github.com/mafintosh/fast-fifo). They were executed on JavaScriptCore with [`bun run`](https://bun.sh/docs/cli/run), using [`tinybench`](https://github.com/tinylibs/tinybench/), on a 2018 Mac Mini (3 GHz 6-Core Intel Core i5).

According to these benchmarks, `Q` is about 2 × faster than using `Array` as a makeshift queue. It's not able to match the highly optimized [`denque`](https://github.com/invertase/denque/) and [`fast-fifo`](https://github.com/mafintosh/fast-fifo) libraries, but is an alternative when size is important, and it should be more than performant enough for most use cases. Pretty decent for 342 bytes.

The high margin of error on the results of `Q` is notable, though the results are relatively stable across runs. Benchmarking is not my strong suit, so I can't really offer an explanation or analysis. Take it for what it is. YMMV, grain of salt and all that.

#### [bench/fifo.ts](bench/fifo.ts)

```
┌───┬───────────────────┬─────────┬────────────────────┬─────────┬─────────┐
│   │ Task Name         │ ops/sec │ Average Time (ns)  │ Margin  │ Samples │
├───┼───────────────────┼─────────┼────────────────────┼─────────┼─────────┤
│ 0 │ bulk:denque       │ 56,922  │ 17567.660880000152 │ ±0.07%  │ 100000  │
│ 1 │ bulk:fifo         │ 53,502  │ 18690.82211000017  │ ±0.07%  │ 100000  │
│ 2 │ bulk:q            │ 34,965  │ 28599.61588000114  │ ±57.44% │ 100000  │
│ 3 │ bulk:array        │ 16,025  │ 62401.65270999802  │ ±0.24%  │ 100000  │
│ 4 │ individual:denque │ 57,640  │ 17348.849719997284 │ ±0.10%  │ 100000  │
│ 5 │ individual:fifo   │ 53,131  │ 18821.2484400024   │ ±0.08%  │ 100000  │
│ 6 │ individual:q      │ 30,898  │ 32364.489050003427 │ ±94.29% │ 100000  │
│ 7 │ individual:array  │ 20,632  │ 48467.935640011136 │ ±0.30%  │ 100000  │
└───┴───────────────────┴─────────┴────────────────────┴─────────┴─────────┘
```

#### [bench/two-million.ts](bench/two-million.ts)

```
┌───┬───────────┬────────────┬────────────────────┬─────────┬─────────┐
│   │ Task Name │ ops/sec    │ Average Time (ns)  │ Margin  │ Samples │
├───┼───────────┼────────────┼────────────────────┼─────────┼─────────┤
│ 0 │ denque    │ 11,782,944 │ 84.86842916873053  │ ±0.09%  │ 5891473 │
│ 1 │ fifo      │ 10,811,026 │ 92.49815410713445  │ ±0.12%  │ 5405514 │
│ 2 │ q         │ 9,667,354  │ 103.44091228259218 │ ±35.83% │ 4833678 │
│ 3 │ array     │ 4,366,517  │ 229.01543930422363 │ ±5.63%  │ 2183259 │
└───┴───────────┴────────────┴────────────────────┴─────────┴─────────┘
```
