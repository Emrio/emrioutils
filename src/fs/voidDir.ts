import path from 'path'
import { readdir, unlink, stat, rmdir } from './fsPromisified'

/**
 * voidDir - Removes all files in a directory
 * May do so recursively
 * May also remove sub directories
 */
export async function voidDir (dirpath: string, recursive: boolean = false, deleteSubDirectories: boolean = false): Promise<void> {
  const files = await readdir(dirpath)

  const paths = files.map(file => path.join(dirpath, file))

  for (const filepath of paths) {
    const fileStats = await stat(filepath)

    if (recursive && fileStats.isDirectory()) {
      await voidDir(filepath, recursive)
    }

    if (deleteSubDirectories && fileStats.isDirectory()) {
      await rmdir(filepath, { recursive: true })
    }

    if (!fileStats.isDirectory()) {
      await unlink(filepath)
    }
  }
}
