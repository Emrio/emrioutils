/**
 * hasOwnProperty - Shortcut for Object.prototype.hasOwnProperty.call
 */
export function hasOwnProperty <T> (obj: T, prop: string): boolean {
  return Object.prototype.hasOwnProperty.call(obj, prop)
}
