import { KVPairs, Key } from '../types/objects'

/**
 * iterkv - Iterate through key/value pairs of an object
 */
export function * iterkv <K extends Key, V> (obj: KVPairs<K, V>): Generator<[K, V]> {
  for (const key in obj) {
    yield [key, obj[key]]
  }
}
