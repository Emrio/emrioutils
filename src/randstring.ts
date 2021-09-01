import { randint } from './randint'

/**
 * Returns a string composed of characters in a provided alphabet
 * Can return fixed length strings or random lengthed strings
 * This function is not cryptographically secure
 */
export function randstring (alphabet: string, length: number): string {
  let generated = ''

  for (let i = 0; i < length; i++) {
    generated += alphabet[randint(alphabet.length)]
  }

  return generated
}
