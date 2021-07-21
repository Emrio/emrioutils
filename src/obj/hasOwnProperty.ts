import { Key } from '../types/objects'

/**
 * hasOwnProperty - Shortcut for Object.prototype.hasOwnProperty.call
 */
export function hasOwnProperty <T> (obj: T, prop: Key): boolean {
  return Object.prototype.hasOwnProperty.call(obj, prop)
}
