/**
 * zip - TS implementation of Python's built-in zip function
 */
export function * zip <T> (...arrs: T[][]): Generator<T[]> {
  const l1 = arrs[0].length
  if (arrs.some(arr => arr.length !== l1)) {
    throw new Error('All arrays must be of same length')
  }

  for (let i = 0; i < l1; i++) {
    yield arrs.map(arr => arr[i])
  }
}
