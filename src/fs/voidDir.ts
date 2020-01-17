import path from 'path'
import { readdir, unlink } from './fsPromisified'

/**
 * voidDir - Removes all files in a directory
 */
export async function voidDir (dirpath: string): Promise<void> {
  return readdir(dirpath)
    .then(files => files.map(file => unlink(path.join(dirpath, file))))
    .then(unlinks => Promise.all(unlinks))
    .then(() => Promise.resolve())
}
