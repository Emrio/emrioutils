import * as _arr from './arr'
import { debug, Debugger } from './debug'
import * as _fs from './fs'
import * as _math from './math'
import * as _misc from './misc'
import * as _obj from './obj'
import * as _rnd from './rnd'
import * as _str from './str'
import * as _time from './time'

export * from './arr'
export * from './debug'
export * from './fs'
export * from './math'
export * from './misc'
export * from './obj'
export * from './rnd'
export * from './str'
export * from './time'

export const arr = _arr
export const fs = _fs
export const math = _math
export const misc = _misc
export const obj = _obj
export const rnd = _rnd
export const str = _str
export const time = _time

exports.default = {
  arr,
  ...arr,
  debug,
  Debugger,
  fs,
  ...fs,
  math,
  ...math,
  misc,
  ...misc,
  obj,
  ...obj,
  rnd,
  ...rnd,
  str,
  ...str,
  time,
  ...time
}
