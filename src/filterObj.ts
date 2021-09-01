import { Key } from './types'
import { iterkv } from './iterkv'

/**
 * Takes a record and creates a new record by filtering its keys
 */
export function filterObj <K extends Key, V> (obj: Record<K, V>, filter: (k: K, v: V) => boolean): Record<K, V> {
  const res = {} as Record<K, V>

  for (const [k, v] of iterkv(obj)) {
    if (filter(k, v)) {
      res[k] = v
    }
  }

  return res
}
