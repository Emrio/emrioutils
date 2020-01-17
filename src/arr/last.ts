/**
 * last - Returns the last element of an array.
 * Optionally accepts an offset
 */
export function last <T> (arr: T[], offset: number = 0): T {
  return arr[arr.length - 1 - offset]
}
