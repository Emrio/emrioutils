import { hop } from './hop'
import { iterkv } from './iterkv'
import { Key } from './types'

export type CollisionResolver <K, V> = (k: K, a: V, b: V) => V

/**
 * Takes a list of records and pours their key-value pairs into
 * another provided record.
 * Takes a function for collision resolution when two objects have the same key
 */
export function pourkv <K extends Key, V> (onCollision: CollisionResolver<K, V>, dst: Record<K, V>, ...src: Record<K, V>[]): void {
  for (const source of src) {
    for (const [k, v] of iterkv(source)) {
      if (hop(dst, k)) {
        dst[k] = onCollision(k, dst[k], v)
      } else {
        dst[k] = v
      }
    }
  }
}

/**
 * Takes a list of records and merges them into another new record
 * Collision are handled with the provided function
 */
export function mergekv <K extends Key, V> (onCollision: CollisionResolver<K, V>, ...src: Record<K, V>[]): Record<K, V> {
  const dst = {} as Record<K, V>

  pourkv(onCollision, dst, ...src)

  return dst
}
