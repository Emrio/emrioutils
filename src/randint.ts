export function randint (from: number, to: number, includeTo?: boolean): number
export function randint (length: number, includeTo?: boolean): number

/**
 * Returns a random integer between two values.
 * The upper bound is by default excluded
 * If only one value is provided, the range will be [0, arg] or [0, arg[ depending on the second optional "includeTo" parameter
 * This function is not cryptographically secure
 */
export function randint (fromOrLength: number, toOrIncludeTo?: number | boolean, includeTo?: boolean): number {


  if (typeof toOrIncludeTo === 'undefined' || typeof toOrIncludeTo === 'boolean') {
    return randint(0, fromOrLength, toOrIncludeTo)
  }

  return Math.floor(Math.random() * (toOrIncludeTo - fromOrLength + (includeTo ? 1 : 0))) + fromOrLength
}
