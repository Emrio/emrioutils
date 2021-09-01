/**
 * Resolves a promise after a given period of time
 */
export async function sleep (ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}
