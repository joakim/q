# Q

![npm minified](https://img.shields.io/bundlephobia/min/@joakimstai/q)
![npm minzipped](https://img.shields.io/bundlephobia/minzip/@joakimstai/q)
![Dependencies](https://img.shields.io/badge/dependencies-none-green)
![License](https://img.shields.io/badge/license-public_domain-green)
![Maintenance](https://img.shields.io/badge/maintained-yes-green)

A tiny, simple and fast [FIFO](https://en.wikipedia.org/wiki/FIFO_(computing_and_electronics)) [queue](https://en.wikipedia.org/wiki/Queue_(abstract_data_type)).

- Simple interface
- Up there with the fastest queue libraries
- 432 bytes minified (half that gzipped)
- TypeScript declarations
- Tests and benchmarks
- No dependencies
- Public domain


## Installation

Using your package manager of choice, install:

```sh
@joakimstai/q
```

## Usage

#### Importing

Import `Q` from `@joakimstai/q` using the appropriate method for your environment:

```js
import { Q } from '@joakimstai/q'
```

```js
const { Q } = require('@joakimstai/q')
```

#### Create a queue

```js
let queue = new Q()
```

You can also specify an array of items up front:

```js
queue = new Q([1, 2, 3])
```

#### Add an item to the back/tail of the queue (enqueue)

```js
queue.push(4)
```

#### Remove one item from the front/head of the queue (dequeue)

```js
queue.shift() // 1
```

Returns `undefined` if the queue is empty.

#### Read any item in the queue by its index (peek)

```js
queue.at(0)  // 2 (front)
queue.at(1)  // 3
queue.at(-1) // 4 (back)
```

Returns `undefined` for out-of-bounds indexes.

#### Get the size of the queue

```js
queue.size() // 3
```

#### Check whether the queue has any items

Useful for iterating through the queue in a `while` loop.

```js
while (queue.hasItems()) … // true
```

#### Reset the queue

```js
queue.reset()
```

Optionally, specify an array of items to reset to:

```js
queue.reset([1, 2, 3])
```

#### Get all the items in the queue as an array

```js
queue.toArray() // [1, 2, 3]
```

That's it.


## Performance

Below are the results of benchmarks adapted from [`denque`](https://github.com/invertase/denque/), [`fast-fifo`](https://github.com/mafintosh/fast-fifo) and [`data-structure-typed`](https://github.com/zrwusa/data-structure-typed/blob/main/test/performance/data-structures/queue/queue.test.ts). They were executed on JavaScriptCore with [`bun`](https://bun.sh/) using [`tinybench`](https://github.com/tinylibs/tinybench/) on a 2018 Mac Mini (3 GHz 6-Core Intel Core i5).

According to these benchmarks, `Q` is up there with the highly optimized [`denque`](https://github.com/invertase/denque/) and [`fast-fifo`](https://github.com/mafintosh/fast-fifo) libraries, and much faster than using `Array` as a makeshift queue. Pretty decent for 432 bytes!

I admit to not knowing much about the dark arts of benchmarking, so I can't vouch for the accuracy of these results or offer an analysis. Take it for what it is. YMMV, grain of salt and all that.

```
$ bun run ./bench growth
[2.42s] [object Object] (size: 10,000, iterations: 1,000)
┌───┬──────────┬─────────┬───────────────────┬────────┬─────────┐
│   │ Library  │ ops/sec │ Average Time (ns) │ Margin │ Samples │
├───┼──────────┼─────────┼───────────────────┼────────┼─────────┤
│ 0 │ Denque   │ 2,503   │ 399,424           │ ±0.92% │ 1,252   │ <- Denque fastest
│ 1 │ FastFIFO │ 2,406   │ 415,525           │ ±2.45% │ 1,204   │
│ 2 │ Q        │ 2,204   │ 453,532           │ ±1.75% │ 1,103   │
│ 3 │ Array    │ 769     │ 1,299,899         │ ±2.52% │ 385     │
└───┴──────────┴─────────┴───────────────────┴────────┴─────────┘

$ bun run ./bench push
[2.59s] [object Object] (size: 1,000, iterations: 1,000)
┌───┬──────────┬─────────┬───────────────────┬──────────┬─────────┐
│   │ Library  │ ops/sec │ Average Time (ns) │ Margin   │ Samples │
├───┼──────────┼─────────┼───────────────────┼──────────┼─────────┤
│ 0 │ Denque   │ 31,137  │ 32,115            │ ±116.17% │ 15,569  │
│ 1 │ FastFIFO │ 51,459  │ 19,432            │ ±54.75%  │ 26,608  │
│ 2 │ Q        │ 53,017  │ 18,861            │ ±88.73%  │ 26,509  │ <- Q fastest
│ 3 │ Array    │ 35,761  │ 27,963            │ ±105.16% │ 17,881  │
└───┴──────────┴─────────┴───────────────────┴──────────┴─────────┘

$ bun run ./bench push-shift
[2.44s] [object Object] (size: 1,000, iterations: 1,000)
┌───┬──────────┬─────────┬───────────────────┬────────┬─────────┐
│   │ Library  │ ops/sec │ Average Time (ns) │ Margin │ Samples │
├───┼──────────┼─────────┼───────────────────┼────────┼─────────┤
│ 0 │ Denque   │ 61,955  │ 16,140            │ ±0.35% │ 30,978  │ <- Denque fastest
│ 1 │ FastFIFO │ 48,961  │ 20,424            │ ±0.40% │ 24,481  │
│ 2 │ Q        │ 41,098  │ 24,331            │ ±1.19% │ 20,550  │
│ 3 │ Array    │ 14,648  │ 68,266            │ ±2.15% │ 7,325   │
└───┴──────────┴─────────┴───────────────────┴────────┴─────────┘

$ bun run ./bench shift-push
[10.43s] [object Object] (size: 1,000, iterations: 1,000)
┌───┬──────────┬────────────┬───────────────────┬────────┬───────────┐
│   │ Library  │ ops/sec    │ Average Time (ns) │ Margin │ Samples   │
├───┼──────────┼────────────┼───────────────────┼────────┼───────────┤
│ 0 │ Denque   │ 11,487,654 │ 87                │ ±0.28% │ 5,743,828 │ <- Denque fastest
│ 1 │ FastFIFO │ 10,000,355 │ 99                │ ±0.85% │ 5,000,178 │
│ 2 │ Q        │ 10,553,278 │ 94                │ ±0.72% │ 5,276,640 │
│ 3 │ Array    │ 5,928,301  │ 168               │ ±0.26% │ 2,964,151 │
└───┴──────────┴────────────┴───────────────────┴────────┴───────────┘
```
