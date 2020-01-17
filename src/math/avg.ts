/**
 * avg - Gives the mean value of a list of numbers
 */
export function avg (values: number[]): number {
  return values.reduce((a, c) => a + c, 0) / values.length
}
