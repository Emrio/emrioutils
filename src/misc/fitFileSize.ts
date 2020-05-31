import { round } from '../math'

/**
 * fitFileSize - Returns the best file size for a given size in bytes
 */
export function fitFileSize (size: number, units: string[] = ['bytes', 'kB', 'MB', 'GB', 'TB', 'PB', 'EB']): { value: number, unit: string } {
  let i = 0
  while (size >= Math.pow(1024, i + 1) && i + 1 < units.length) {
    i++
  }
  return { value: round(size / Math.pow(1024, i), 2), unit: units[i] }
}
