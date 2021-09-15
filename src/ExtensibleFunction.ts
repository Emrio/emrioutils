export interface ExtensibleFunction <F extends (...args: any) => any> {
  new (f: F): ExtensibleFunction<F>
  (...args: Parameters<F>): ReturnType<F>
}

/**
 * Extensible Function class
 */
export class ExtensibleFunction <F extends (...args: any) => any> extends Function {
  constructor (f: F) {
    super()

    return Object.setPrototypeOf(f, new.target.prototype)
  }
}
