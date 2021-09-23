/**
 * Computes the sum of array elements
 */
export function sum (arr: number[]): number {
  return arr.reduce((a, c) => a + c, 0)
}
