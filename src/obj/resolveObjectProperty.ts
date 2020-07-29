/**
 * resolveObjectProperty - Returns the reference of an object sub property
 * Also creates sub properties if they do not exist
 *
 * @param  {Object}               object                    Input object
 * @param  {Array<String>|String} path                      Path to the propertys
 * @param  {Boolean}              [ensurePropertiesExist]   Creates properties if they do not exist
 * @return {Object}                                         Input object's proprty
 */
export function resolveObjectProperty (object: any, path: string[] | string, ensurePropertiesExist: boolean = false): any {
  if (typeof path === 'string') return resolveObjectProperty(object, path.split('.'))
  if (!Object.prototype.hasOwnProperty.call(object, path[0])) {
    if (ensurePropertiesExist) {
      object[path[0]] = {}
    } else {
      return undefined
    }
  }
  return path.length === 1 ? object[path[0]] : resolveObjectProperty(object[path[0]], path.slice(1), ensurePropertiesExist)
}
