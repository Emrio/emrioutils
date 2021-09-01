import { Key } from './types'

/**
 * Shortcut for Object.prototype.hasOwnProperty.call
 */
export function hop <T> (obj: T, prop: Key): boolean {
  return Object.prototype.hasOwnProperty.call(obj, prop)
}
