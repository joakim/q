# Q

A simple, tiny and performant [FIFO](https://en.wikipedia.org/wiki/FIFO_(computing_and_electronics)) [queue](https://en.wikipedia.org/wiki/Queue_(abstract_data_type)).

- Simple API
- 366 bytes minified (202 bytes gzipped)
- TypeScript declarations
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

#### Add item to back of queue (enqueue)

```js
queue.add(4)
```

#### Remove item from front of queue (dequeue)

```js
queue.remove() // 1
```

#### Peek an item in the queue by its index

```js
queue.peek(0) // 2 (front)
queue.peek(1) // 3
queue.peek(-1) // 4 (back)
```

#### Check the size of the queue

```js
queue.size() // 3
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

If you need anything else, have a look at [denque](https://github.com/invertase/denque/).
