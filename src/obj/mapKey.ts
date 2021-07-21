import { Key } from '../types/objects'

export function mapKey <K extends Key, T, TT, TTT> (obj: Record<K, T>, f: (x: T, k: K, o: Record<K, T>) => TT, thisArg: TTT | undefined = undefined): Record<K, TT> {
  const finalobj = {} as Record<K, TT>

  for (const key in obj) {
    finalobj[key] = f.call(thisArg, obj[key], key, obj)
  }

  return finalobj
}
