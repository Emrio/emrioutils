/**
 * nafm - Creates an array of n items with a custom filler
 * Shortcut for new Array(n).fill(undefined).map(fillerFunction)
 */
export function nafum <T> (n: number, filler: (i: number) => T): T[] {
  return new Array(n).fill(undefined as unknown as string).map((_, i) => filler(i))
}
