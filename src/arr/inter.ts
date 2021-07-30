/**
 * Returns the elements that are present in both arrays
 */
export function inter <T> (arr1: T[], arr2: T[]): T[] {
  // optimization, creating the set costs more per
  // element than iterating with the for loop
  if (arr1.length > arr2.length) {
    [arr2, arr1] = [arr1, arr2]
  }

  const set = new Set(arr1)
  const result = []

  for (const x of arr2) {
    if (set.has(x)) {
      result.push(x)
    }
  }

  return result
}
