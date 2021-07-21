type T <TT> = (TT | T<TT>)[]

/**
 * flatten - Array.flat
 */
export function flatten <TT> (arr: T<TT>, maxDepth = Infinity): TT[] {
  if (maxDepth <= 0) return arr as TT[]
  let flat: TT[] = []
  for (const elmt of arr) {
    if (Array.isArray(elmt)) {
      flat = flat.concat(flatten(elmt, maxDepth - 1))
    } else {
      flat.push(elmt)
    }
  }
  return flat
}
