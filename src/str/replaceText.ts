/**
 * replaceText - Replaces '{foo}' in t by the value of the property foo of the object w.
 * By default only replaces first occurence
 */

type AllowedTypes = string | number | boolean

export function replaceText (t: string, w: { [k: string]: AllowedTypes }, replaceAllOccurences = false): string {
  for (const k in w) {
    t = t.replace(replaceAllOccurences ? new RegExp(`{${k}}`, 'g') : `{${k}}`, w[k].toString())
  }
  return t
}
