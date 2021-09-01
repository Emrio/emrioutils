import { round } from './round'

/**
 * Sizes for storage and bandwidth measurement in English and French
 */
export const defaultSizes = {
  enStorage: ['bytes', 'kB', 'MB', 'GB', 'TB', 'PB', 'EB'],
  enBandwidth: ['bits', 'kb', 'Mb', 'Gb', 'Tb', 'Pb', 'Eb'],
  frStorage: ['octets', 'ko', 'Mo', 'Go', 'To', 'Po', 'Eo'],
  frBandwidth: ['bits', 'kb', 'Mb', 'Gb', 'Tb', 'Pb', 'Eb']
}

/**
 * Returns the best size for a given raw size value
 */
export function fitSize (size: number, units: string[] = defaultSizes.enStorage): { value: number, unit: string } {
  let i = 0

  while (size >= Math.pow(1024, i + 1) && i + 1 < units.length) {
    i++
  }

  return { value: round(size / Math.pow(1024, i), 2), unit: units[i] }
}

/**
 * Get a string representing the size best
 */
export function getSize (size: number, units: string[] = defaultSizes.enStorage): string {
  const fit = fitSize(size, units)

  return fit.value + ' ' + fit.unit
}
