/**
 * randfloat - Returns an integer between two values.
 * The upper bound is by default excluded
 */
export function randint (from: number, to: number, includeTo: boolean = false): number {
  return Math.floor(Math.random() * (to - from + (includeTo ? 1 : 0))) + from
}
