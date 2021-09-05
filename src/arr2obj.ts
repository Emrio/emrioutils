import { enumerate } from './enumerate'
import { Key } from './types'

/**
 * Maps array elements to an object
 * Mapper function returns the key value
 */
export function arr2obj <T, K extends Key> (arr: T[], mapper: (x: T, i: number) => K): Record<K, T> {
  const obj = {} as Record<K, T>

  for (const [i, x] of enumerate(arr)) {
    obj[mapper(x, i)] = x
  }

  return obj
}

/**
 * Maps array elements to an object
 * Mapper function returns the key value and the value object
 */
export function arr2objmap <T, K extends Key, V> (arr: T[], mapper: (x: T, i: number) => [K, V]): Record<K, V> {
  const obj = {} as Record<K, V>

  for (const [i, x] of enumerate(arr)) {
    const [k, y] = mapper(x, i)

    obj[k] = y
  }

  return obj
}
