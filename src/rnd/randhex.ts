import crypto from 'crypto'
import { randint } from './randint'

export function randhex (from: number, to: number): string
export function randhex (length: number): string

/**
 * randhex - Returns a cryptographically secure hexadecimal string.
 * Can return fixed length strings or random lengthed strings
 */
export function randhex (fromOrLength: number, to?: number): string {
  const length = to == null ? fromOrLength : randint(fromOrLength, to, true)
  return crypto.randomBytes(length).toString('hex')
}
