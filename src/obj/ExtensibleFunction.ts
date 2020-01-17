/**
 * Extensible Function class
 */
export class ExtensibleFunction extends Function {
  constructor (f: Function) {
    super()
    return Object.setPrototypeOf(f, new.target.prototype)
  }
}
