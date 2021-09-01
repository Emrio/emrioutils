import { swap } from './swap'

/**
 * Removes an element of an array at a given index in constant time
 * Order of elements is not conserved
 * Does not require array to be sorted
 */
export function rmfast <T> (arr: T[], i: number): void {
  swap(arr, i, arr.length - 1)

  arr.pop()
}
