import { hop } from './hop'
import { Key } from './types'

/**
 * Makes a shallow copy of the one object's properties to another.
 * target and from objects won't have same reference but their properties, if they are objects, will have the same reference
 */
export function makeShallowCopy (target: Record<Key, unknown>, from: Record<Key, unknown>, replace = false): void {
  for (const prop in from) {
    if (replace || !hop(target, prop)) {
      target[prop] = from[prop]
    }
  }
}
