import Bench from 'tinybench'
import Denque from 'denque'
import FIFO from 'fast-fifo'
import { Q } from '../src/q'

// Benchmarks
import * as growth from './growth'
import * as push from './push'
import * as push_shift from './push_shift'
import * as shift_push from './shift3_push3'

// Libraries
const libraries = [Denque, FIFO, Q, Array]

const benchmarks = {
  growth: {
    module: growth,
    size: 10_000,
    iter: 1_000,
  },
  push: {
    module: push,
    size: 1_000,
    iter: 1_000,
  },
  'push-shift': {
    module: push_shift,
    size: 1_000,
    iter: 1_000,
  },
  'shift-push': {
    module: shift_push,
    size: 1_000,
    iter: 1_000,
  },
}

const stringToNumber = (str?: string) => {
  // @ts-ignore
  if (typeof str === 'string') return Number(str.replaceAll('_', ''))
}
const numberToString = (num: number) =>
  parseInt(num.toString(), 10).toLocaleString()

const args = process.argv
  .slice(2)
  .reduce((args: Map<string, any>, arg: string) => {
    const [name, value] = arg.split('=')
    return args.set(name, value)
  }, new Map()) as Map<string, any>

const benches = Array.from(args, ([name, value]) => !value && name) as string[] //prettier-ignore
const libs = libraries //.filter()

for (const bench of benches) {
  const benchmark = benchmarks[bench]
  if (benchmark) await perform(benchmark)
}

async function perform(benchmark) {
  const size = (args.get('size') && stringToNumber(args.get('size'))) || benchmark.size // prettier-ignore
  const iter = (args.get('iter') && stringToNumber(args.get('iter'))) || benchmark.iter // prettier-ignore

  const bench = new Bench({ iterations: stringToNumber(iter) })

  // prettier-ignore
  const label = `${benchmark} (size: ${numberToString(size)}, iterations: ${numberToString(iter || bench.iterations)})`
  console.time(label)

  for (const Queue of libs) {
    // @ts-ignore
    const queue = new Queue()
    if (benchmark.prep) benchmark.prep(queue, size)
    // @ts-ignore
    bench.add(Queue.name, () => benchmark.module.run(queue, size))
  }

  await bench.warmup()
  await bench.run()
  console.timeEnd(label)

  console.table(
    bench.tasks.map((task) => {
      if (task.result) {
        if (task.result.error) throw task.result.error
        return {
          Library: task.name,
          'ops/sec': task.result.error ? 'NaN' : numberToString(task.result.hz),
          'Average Time (ns)': task.result.error
            ? 'NaN'
            : numberToString(task.result.mean * 1_000_000),
          Margin: task.result.error
            ? 'NaN'
            : `\xb1${task.result.rme.toFixed(2)}%`,
          Samples: task.result.error
            ? 'NaN'
            : numberToString(task.result.samples.length),
        }
      }
    })
  )
}
