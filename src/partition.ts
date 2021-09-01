import { enumerate } from './enumerate'
import { Key } from './types'

/**
 * Split an array's elements
 */
export function partition <K extends Key, V> (arr: V[], partitioner: (x: V, i: number) => K): Record<K, V[]> {
  const partition = {} as Record<K, V[]>

  for (const [i, el] of enumerate(arr)) {
    const v = partitioner(el, i)

    if (!partition[v]) {
      partition[v] = []
    }

    partition[v].push(el)
  }

  return partition
}
