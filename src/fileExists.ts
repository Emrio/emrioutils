import fs from 'fs'
import { access } from './fsPromisified'

/**
 * Tests if a file exists
 */
export async function fileExists (path: string): Promise<boolean> {
  try {
    await access(path, fs.constants.F_OK)

    return true
  } catch (e) {
    return false
  }
}
