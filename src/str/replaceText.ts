/**
 * replaceText - Replaces '{foo}' in t by the value of the property foo of the object w.
 * By default only replaces first occurence
 */
export function replaceText (t: string, w: { [k: string]: string }, replaceAllOccurences: boolean = false): string {
  for (const k in w) {
    t = t.replace(replaceAllOccurences ? new RegExp(`{${k}}`, 'g') : `{${k}}`, w[k])
  }
  return t
}
