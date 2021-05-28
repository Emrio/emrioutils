/**
 * swap - Swap two elements in an array
 */
export function swap <T> (arr: T[], i: number, j: number): void {
  if (i < 0 || i >= arr.length || j < 0 || j >= arr.length) {
    return
  }

  const c = arr[i]
  arr[i] = arr[j]
  arr[j] = c
}
