/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * makeShallowCopy - Makes a shallow copy of the one object's properties to another.
 * target and from objects won't have same reference but their properties, if they are objects, will have the same reference
 *
 * @param  {Object}  target     Output object
 * @param  {Object}  from       Input object
 * @param  {Boolean} [replace]  Replace properties if they are already defined
 */
export function makeShallowCopy (target: any, from: any, replace = false): void {
  for (const prop in from) {
    if (replace || !Object.prototype.hasOwnProperty.call(target, prop)) target[prop] = from[prop]
  }
}
