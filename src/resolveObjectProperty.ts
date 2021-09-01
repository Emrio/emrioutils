/* eslint-disable @typescript-eslint/no-explicit-any */
import { hop } from './hop'

/**
 * resolveObjectProperty - Returns the reference of an object sub property
 * Also creates sub properties if they do not exist
 */
export function resolveObjectProperty (object: any, path: string[] | string, ensurePropertiesExist = false): any {
  if (typeof path === 'string') {
    return resolveObjectProperty(object, path.split('.'))
  }

  if (!hop(object, path[0])) {
    if (!ensurePropertiesExist) {
      return undefined
    }

    object[path[0]] = {}
  }

  if (path.length === 1) {
    return object[path[0]]
  }

  return resolveObjectProperty(object[path[0]], path.slice(1), ensurePropertiesExist)
}
