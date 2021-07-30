import { Key } from '../types'
import { iterkv } from '../generators/iterkv'

export function filterObj <K extends Key, V> (obj: Record<K, V>, filter: (k: K, v: V) => boolean): Record<K, V> {
  const res = {} as Record<K, V>

  for (const [k, v] of iterkv(obj)) {
    if (filter(k, v)) {
      res[k] = v
    }
  }

  return res
}
