/**
 * Removes all duplicates elements in an array
 */
export function unique <T> (arr: T[]): T[] {
  return Array.from(new Set(arr))
}
