import { enumerate } from '../generators'

export function partition <T, TT extends string> (arr: T[], partitioner: (x: T, i: number) => TT): { [k in TT]: T[] } {
  const partition = {} as { [k in TT]: T[] }

  for (const [i, el] of enumerate(arr)) {
    const v = partitioner(el, i)

    if (!partition[v]) {
      partition[v] = []
    }

    partition[v].push(el)
  }

  return partition
}
