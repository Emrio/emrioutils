/**
 * Split function which returns the end of the string as an element of the array if `limit` is set
 */
export function split (str: string, delimitor: string, limit: number): string[] {
  const parts = str.split(delimitor)
  if (parts.length <= limit) return parts
  return [...parts.slice(0, limit - 1), parts.slice(limit - 1).join(delimitor)]
}
