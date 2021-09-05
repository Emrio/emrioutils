/**
 * Returns the time between now and an hrtime record with nanosecond precision and casted to millisecond
 */
export function hr2ms (hrtime: [number, number]): number {
  const delta = process.hrtime(hrtime)

  return Math.round(((delta[0] * 1e9 + delta[1]) / 1e6) * 1e3) / 1e3
}
