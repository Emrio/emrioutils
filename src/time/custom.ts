/**
 * ddmmyyyy - Returns a custom string that represent the given date
 */
export function ddmmyyyy (separation: string = '-', date: Date = new Date()) {
  return date.getDate() + separation + (date.getMonth() + 1).toString().padStart(2, '0') + separation + date.getFullYear()
}

/**
 * ddmmyyyyhhmm - Returns a custom string that represent the given date
 */
export function ddmmyyyyhhmm (separation: string = '-', date: Date = new Date()) {
  return ddmmyyyy(separation, date) + separation + date.getHours().toString().padStart(2, '0') + separation + date.getMinutes().toString().padStart(2, '0')
}

/**
 * ddmmyyyyhhmmss - Returns a custom string that represent the given date
 */
export function ddmmyyyyhhmmss (separation: string = '-', date: Date = new Date()) {
  return ddmmyyyyhhmm(separation, date) + separation + date.getSeconds().toString().padStart(2, '0')
}
