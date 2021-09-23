import { Key } from './types'

/**
 * Create a record using a source array and a generator function consuming the
 * elements of the source array
 *
 * ```ts
 * const arr = [1, 2, 3]
 * const obj = u.initkv(arr, x => ['item' + x, x ** 2])
 * // { item1: 1, item2: 4, item3: 9 }
 * ```
 *
 * @param src       Array consummed by generator
 * @param generator Generator function, returns a key-value pair (array of two items)
 */
export function initkv <T, K extends Key, V> (src: T[], generator: (x: T, i: number) => [K, V]): Record<K, V> {
  const obj = {} as Record<K, V>

  for (let i = 0; i < src.length; i++) {
    const [k, v] = generator(src[i], i)

    obj[k] = v
  }

  return obj
}
