import { id } from './id'

type Cast <T, TT> = (a: T) => TT

/**
 * Returns the index of an element in a sorted array
 * Returns -1 if element does not exist in array
 *
 * Optionally takes a comparator function, more or less required if T is not
 * string or number. This comparator should test if first argument is strictly
 * greater than the second argument.
 */
export function binarySearchIndex <T, TT> (arr: T[], x: TT, key?: Cast<T, TT>): number {
  if (!key) {
    key = id as Cast<T, TT>
  }

  // [a, b[
  let a = 0
  let b = arr.length

  while (b !== a) {
    const s = b - a
    const c = a + (s - (s & 1)) / 2

    if (x === key(arr[c])) {
      return c
    }

    if (x > key(arr[c])) {
      a = c + 1
    } else {
      b = c
    }
  }

  return x === key(arr[a]) ? a : -1
}

/**
 * Tests if given value is present is a sorted array
 */
export function binarySearch <T, TT> (arr: T[], x: TT, key?: Cast<T, TT>): boolean {
  return binarySearchIndex(arr, x, key) !== -1
}
