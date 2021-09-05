/* eslint-disable @typescript-eslint/no-explicit-any */
import { hop } from './hop'
import { Key } from './types'

export type ValueOf <T> = T extends (Record<Key, infer U>) ? U : never

/**
 * resolveObjectProperty - Returns the reference of an object sub property
 * Also creates sub properties if they do not exist
 *
 * User should make sure paths exist or could exist on the object, else the
 * function would throw somewhere.
 */
export function resolveObjectProperty <R extends Record<Key, unknown>, T extends unknown> (obj: R, path: string[] | string, ensurePropertiesExist = false): T {
  if (typeof path === 'string') {
    return resolveObjectProperty(obj, path.split('.'))
  }

  if (!hop(obj, path[0])) {
    if (!ensurePropertiesExist) {
      return undefined as T
    }

    Object.defineProperty(obj, path[0], { value: {} })
  }

  if (path.length === 1) {
    return obj[path[0]] as T
  }

  return resolveObjectProperty(obj[path[0]] as R, path.slice(1), ensurePropertiesExist)
}
