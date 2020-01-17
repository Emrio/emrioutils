import fs from 'fs'
import { promisify } from 'util'

const access = promisify(fs.access)
const appendFile = promisify(fs.appendFile)
const readdir = promisify(fs.readdir)
const readFile = promisify(fs.readFile)
const unlink = promisify(fs.unlink)

export { access, appendFile, readdir, readFile, unlink }
