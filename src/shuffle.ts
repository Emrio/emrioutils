import { randint } from './randint'
import { randUniqueList } from './randUniqueList'

/**
 * Shuffle elements in an array
 */
export function shuffle <T> (arr: T[]): void {
  const indices = randUniqueList(() => randint(arr.length), arr.length)
  const values = indices.map(i => arr[i])

  for (let i = 0; i < arr.length; i++) {
    arr[i] = values[i]
  }
}
