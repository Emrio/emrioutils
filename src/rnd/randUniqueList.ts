/**
 * Create a list of random values grabbed from a random function
 * All values are unique
 *
 * Draws values from the random function until any of desired array length or
 * maximum withdraws amount is reached
 *
 * For random functions that take parameters, please bind first
 */
export function randUniqueList <T> (rand: () => T, n: number, maxWithdraws: number = Infinity): T[] {
  const vals = new Set<T>()
  let tries = 0

  while (vals.size !== n && ++tries < maxWithdraws) {
    vals.add(rand())
  }

  return Array.from(vals)
}
