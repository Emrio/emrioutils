/**
 * equal - Tests if two numbers are equal within an error margin
 */
export function equal (a: number, b: number, precision: number = 1e-9): boolean {
  return Math.abs(a - b) < precision
}
