import { NestedArray } from './types'

/**
 * Array.flat
 */
export function flatten <T> (arr: NestedArray<T>, maxDepth = Infinity): T[] {
  if (maxDepth <= 0) {
    return arr as T[]
  }

  let flat: T[] = []

  for (const elmt of arr) {
    if (Array.isArray(elmt)) {
      flat = flat.concat(flatten(elmt, maxDepth - 1))
    } else {
      flat.push(elmt)
    }
  }

  return flat
}
