import debugbase from 'debug'
import moment from 'moment'
import path from 'path'
import { appendFile } from '../fs'
import { ExtensibleFunction } from '../obj'

type LogLevel = 'warn' | 'log' | 'error'
const logLevelToText = { log: 'INFO', warn: 'WARN', error: 'ERR ' }

let writing = false
const queue: string[] = []

async function flushQueue () {
  if (writing || queue.length === 0 || !process.env.EMRIOUTILS_LOG_PATH) return
  writing = true
  const toadd = queue.join('')
  queue.length = 0
  try {
    await appendFile(path.join(process.env.EMRIOUTILS_LOG_PATH, moment().format('DD-MM-YYYY[.log]')), toadd)
  } catch (e) {
    console.warn("WARNING: Couldn't save logs to a file", e)
    return
  }
  writing = false
  flushQueue()
}

function createDebugger (p: string, level: LogLevel): debug.Debugger {
  const log = debugbase(p)
  log.log = (...lines) => {
    const tolog = lines.join(' ')
    const log = `${moment().format('DD-MM-YYYY-HH-mm-ss')}|${logLevelToText[level]}|${tolog}\n`
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

/**
 * debug - Creates a custom debugger class instance
 */
export function debug (...debugIdentifiers: string[]): Debugger {
  return new Debugger((process.env.EMRIOUTILS_LOG_PREFIX ? (process.env.EMRIOUTILS_LOG_PREFIX + ':') : '') + debugIdentifiers.join('/'))
}
