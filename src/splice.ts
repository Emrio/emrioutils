/**
 * Array.splice but for String
 */
export function splice (str: string, index: number, rem: number, str2: string): string {
  return str.slice(0, index) + str2 + str.slice(index + Math.abs(rem))
}
