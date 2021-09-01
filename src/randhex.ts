import crypto from 'crypto'

export function randhex (from: number, to: number): string
export function randhex (length: number): string

/**
 * Returns a cryptographically secure hexadecimal string.
 * Can return fixed length strings or random lengthed strings
 */
export function randhex (fromOrLength: number, to?: number): string {
  const length = to == null ? fromOrLength : crypto.randomInt(fromOrLength, to)

  return crypto.randomBytes(length).toString('hex')
}
