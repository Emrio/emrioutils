type AllowedTypes = string | number | boolean

/**
 * In given text, replaces '{foo}' by the value of the property foo of the translation object.
 * By default only replaces first occurence
 */
export function replaceText (t: string, w: { [k: string]: AllowedTypes }, replaceAllOccurences = false): string {
  for (const k in w) {
    t = t.replace(replaceAllOccurences ? new RegExp(`{${k}}`, 'g') : `{${k}}`, w[k].toString())
  }

  return t
}
