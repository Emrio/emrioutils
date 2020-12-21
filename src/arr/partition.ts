export function partition <T, TT extends string> (arr: T[], partitioner: (x: T) => TT): { [k in TT]: T[] } {
  const partition = {} as { [k in TT]: T[] }

  for (const el of arr) {
    const v = partitioner(el)
    if (!partition[v]) {
      partition[v] = []
    }
    partition[v].push(el)
  }

  return partition
}
