import { Key, KVPairs } from '../types/objects'

export function mapKey <K extends Key, T, TT, TTT> (obj: KVPairs<K, T>, f: (x: T, k: K, o: KVPairs<K, T>) => TT, thisArg: TTT | undefined = undefined): KVPairs<K, TT> {
  const finalobj = {} as KVPairs<K, TT>

  for (const key in obj) {
    finalobj[key] = f.call(thisArg, obj[key], key, obj)
  }

  return finalobj
}
