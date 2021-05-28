const defaultComparator = <T> (a: T, b: T): boolean => a > b

/**
 * binarySearchIndex - Returns the index of an element in a sorted array
 * Returns -1 if element does not exist in array
 *
 * Optionally takes a comparator function, more or less required if T is not
 * string or number. This comparator should test if first argument is strictly
 * greater than the second argument.
 */
export function binarySearchIndex <T> (arr: T[], x: T, comp = defaultComparator): number {
  // [a, b[
  let a = 0
  let b = arr.length

  while (b !== a) {
    const s = b - a
    const c = a + (s - (s & 1)) / 2

    if (x === arr[c]) {
      return c
    }

    if (comp(x, arr[c])) {
      a = c + 1
    } else {
      b = c
    }
  }

  return x === arr[a] ? a : -1
}

export function binarySearch <T> (arr: T[], x: T, comp = defaultComparator): boolean {
  return binarySearchIndex(arr, x, comp) !== -1
}
