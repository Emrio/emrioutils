import fs from 'fs'
import { promisify } from 'util'

const access = promisify(fs.access)
const appendFile = promisify(fs.appendFile)
const mkdir = promisify(fs.mkdir)
const readdir = promisify(fs.readdir)
const readFile = promisify(fs.readFile)
const stat = promisify(fs.stat)
const unlink = promisify(fs.unlink)
const writeFile = promisify(fs.writeFile)

export { access, appendFile, mkdir, readdir, readFile, stat, unlink, writeFile }
