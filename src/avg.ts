import { sum } from './sum'

/**
 * Gives the mean value of a list of numbers
 */
export function avg (values: number[], weights?: number[]): number {
  if (!weights) {
    return sum(values) / values.length
  }

  if (weights.length !== values.length) {
    throw new Error('Weights array length must be equal to values array length')
  }

  const total = sum(weights)

  return avg(values.map((v, i) => v * weights[i])) / total
}
