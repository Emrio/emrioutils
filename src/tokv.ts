import { Key } from './types'

/**
 * Create a record from a list of key-value pairs
 *
 * ```ts
 * const obj = u.tokv([['hello', 42], ['world', null], [Symbol(), {}]])
 * // { hello: 42, world: null, [Symbol()]: {} }
 * ```
 *
 * @param elems Array of key-value pairs (array of two items)
 */
export function tokv <K extends Key, V> (elems: [K, V][]): Record<K, V> {
  const obj = {} as Record<K, V>

  for (const [k, v] of elems) {
    obj[k] = v
  }

  return obj
}
