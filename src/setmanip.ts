/**
 * Union of sets
 */
export function u <T> (...sets: Set<T>[]): Set<T> {
  const res = new Set<T>()

  if (!sets.length) {
    return res
  }

  for (const set of sets) {
    for (const x of set.values()) {
      res.add(x)
    }
  }

  return res
}

/**
 * Intersection of sets
 */
export function n <T> (...sets: Set<T>[]): Set<T> {
  if (!sets.length) {
    throw new Error('Cannot work on empty list of sets')
  }

  const res = new Set<T>()

  const otherSets = sets.slice(1)

  for (const x of Array.from(sets[0])) {
    if (otherSets.every(set => set.has(x))) {
      res.add(x)
    }
  }

  return res
}
