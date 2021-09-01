import { Key } from './types'

export function mapKey <K extends Key, T, TT> (obj: Record<K, T>, f: (x: T, k: K, o: Record<K, T>) => TT): Record<K, TT> {
  const finalobj = {} as Record<K, TT>

  for (const key in obj) {
    finalobj[key] = f(obj[key], key, obj)
  }

  return finalobj
}
