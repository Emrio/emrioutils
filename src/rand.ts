import { randint } from './randint'

/**
 * Returns a random element from a set
 * This function is not cryptographically secure
 */
export function rand <T> (inputset: T[]): T {
  return inputset[randint(inputset.length)]
}
