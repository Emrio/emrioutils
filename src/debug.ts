import debugbase from 'debug'
import path from 'path'
import { appendFile } from './fsPromisified'
import { ExtensibleFunction } from './ExtensibleFunction'
import { yyyymmdd, yyyymmddhhmmss } from './timemanip'

type LogLevel = 'warn' | 'log' | 'error'
const logLevelToText = { log: 'INFO', warn: 'WARN', error: 'ERR ' }

let writing = false
const queue: string[] = []

async function flushQueue (): Promise<void> {
  if (writing || queue.length === 0 || !process.env.EMRIOUTILS_LOG_PATH) return
  writing = true
  const toadd = queue.join('')
  queue.length = 0
  try {
    await appendFile(path.join(process.env.EMRIOUTILS_LOG_PATH, yyyymmdd() + '.log'), toadd)
  } catch (e) {
    console.warn("WARNING: Couldn't save logs to a file", e)
    return
  }
  writing = false
  flushQueue()
}

function createDebugger (p: string, level: LogLevel): debug.Debugger {
  const log = debugbase(p)
  log.log = (...lines): void => {
    const tolog = lines.join(' ')
    const log = `${yyyymmddhhmmss()}|${logLevelToText[level]}|${tolog}\n`
    console[level](...lines)
    queue.push(log)
    flushQueue()
  }
  return log
}

/**
 * Creates a debugger instance
 */
export class Debugger extends ExtensibleFunction {
  public error: debug.Debugger // Prints data as error

  constructor (debuggerIdentifier: string) {
    super(createDebugger(debuggerIdentifier, 'log'))

    this.error = createDebugger(debuggerIdentifier, 'error')
  }
}

const debugInstances = new Map<string, Debugger>()

/**
 * Creates or retrieves a custom debugger class instance
 */
export function debug (...debugIdentifiers: string[]): Debugger {
  const prefix = process.env.EMRIOUTILS_LOG_PREFIX
  const name = (prefix ? prefix + ':' : '') + debugIdentifiers.join('/')

  if (debugInstances.has(name)) {
    return debugInstances.get(name) as Debugger
  }

  const d = new Debugger(name)
  debugInstances.set(name, d)

  return d
}
