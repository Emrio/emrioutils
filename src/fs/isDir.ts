import { fileExists } from './fileExists'
import { stat } from './fsPromisified'

/**
 * isDir - Tests if a file is a directory
 */
export async function isDir (path: string): Promise<boolean> {
  if (!await fileExists(path)) {
    return false
  }

  const s = await stat(path)

  return s.isDirectory()
}
