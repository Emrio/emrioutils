/**
 * Returns a float number between two values
 * This function is not cryptographically secure
 */
export function randfloat (from: number, to: number): number {
  return Math.random() * (to - from) + from
}
