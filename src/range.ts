/**
 * TS implementation of Python's built-in range function
 */
export function range (to: number): Generator<number>
export function range (from: number, to: number, step: number): Generator<number>
export function * range (fromOrTo: number, to?: number, step = 1): Generator<number> {
  if (typeof to === 'undefined') {
    for (let i = 0; i < fromOrTo; i++) {
      yield i
    }
  } else {
    const from = fromOrTo

    if (step === 0) {
      throw new Error('range step cannot be zero')
    }

    if (from < to && step < 0) {
      throw new Error('range will never end, please use Infinity to create an infinite loop')
    }

    if (from > to && step > 0) {
      throw new Error('range will never end, please use Infinity to create an infinite loop')
    }

    for (let i = from; i < to; i += step) {
      yield i
    }
  }
}
