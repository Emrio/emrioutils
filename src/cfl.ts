/**
 * Capitalize the first character of a string
 */
export function cfl (str: string): string {
  return str.length ? (str[0].toUpperCase() + str.slice(1)) : str
}
