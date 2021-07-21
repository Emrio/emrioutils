/**
 * round - Rounds numbers with decimal points
 */
export function round (x: number, n = 0): number {
  return Math.round(x * (10 ** n)) / (10 ** n)
}
