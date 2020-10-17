import { randint } from './randint'

/**
 * randstring - Returns a string composed of characters in a provided alphabet
 * Can return fixed length strings or random lengthed strings
 */
export function randstring (alphabet: string, length: number): string {
  let generated = ''
  for (let i = 0; i < length; i++) {
    generated += alphabet[randint(alphabet.length)]
  }
  return generated
}
