/**
 * randfloat - Returns a float number between two values
 */
export function randfloat (from: number, to: number): number {
  return Math.random() * (to - from) + from
}
