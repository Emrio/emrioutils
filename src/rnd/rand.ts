import { randint } from './randint'

/**
 * rand - Returns a random element from a set
 */
export function rand <T> (inputset: T[]): T {
  return inputset[randint(inputset.length)]
}
