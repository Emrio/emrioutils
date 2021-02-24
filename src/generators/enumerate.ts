/**
 * enumerate - TS implementation of Python's built-in enumerate function
 */
export function * enumerate <T> (arr: T[]): Generator<[number, T]> {
  for (let i = 0; i < arr.length; i++) {
    yield [i, arr[i]]
  }
}
