/**
 * Rounds numbers with digits
 */
export function round (x: number, n = 0): number {
  return Math.round(x * (10 ** n)) / (10 ** n)
}
