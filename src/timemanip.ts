/**
 * Get the year in a date
 */
export function year (date: Date = new Date()): number {
  return date.getFullYear()
}

/**
 * Get the year in a date (from '0000' to '9999')
 * Only works correctly with dates from year 0 to year 9999
 */
export function yearPad (date: Date = new Date()): string {
  return year(date).toString().padStart(2, '0')
}

/**
 * Get the month in a date (from 1 to 12)
 */
export function month (date: Date = new Date()): number {
  return date.getMonth() + 1
}

/**
 * Get the month in a date (from '01' to '12')
 */
export function monthPad (date: Date = new Date()): string {
  return month(date).toString().padStart(2, '0')
}

/**
 * Get the day in a date (from 1 to 31*)
 */
export function day (date: Date = new Date()): number {
  return date.getDate()
}

/**
 * Get the day in a date (from '01' to '31'*)
 */
export function dayPad (date: Date = new Date()): string {
  return day(date).toString().padStart(2, '0')
}

/**
 * Get the hour in a date (from 0 to 23)
 */
export function hour (date: Date = new Date()): number {
  return date.getHours()
}

/**
 * Get the hour in a date (from '00' to '23')
 */
export function hourPad (date: Date = new Date()): string {
  return hour(date).toString().padStart(2, '0')
}

/**
 * Get the minute in a date (from 0 to 59)
 */
export function minute (date: Date = new Date()): number {
  return date.getMinutes()
}

/**
 * Get the minute in a date (from '00' to '59')
 */
export function minutePad (date: Date = new Date()): string {
  return minute(date).toString().padStart(2, '0')
}

/**
 * Get the second in a date (from 0 to 59)
 */
export function second (date: Date = new Date()): number {
  return date.getSeconds()
}

/**
 * Get the second in a date (from '00' to '59')
 */
export function secondPad (date: Date = new Date()): string {
  return second(date).toString().padStart(2, '0')
}

/**
 * Returns a custom string that represent the given date
 */
export function ddmmyyyy (separation = '-', date: Date = new Date()): string {
  return [dayPad(date), monthPad(date), yearPad(date)].join(separation)
}

/**
 * Returns a custom string that represent the given date
 */
export function yyyymmdd (separation = '-', date: Date = new Date()): string {
  return [yearPad(date), monthPad(date), dayPad(date)].join(separation)
}

/**
 * Returns a custom string that represent the given date
 */
export function hhmm (separation = '-', date: Date = new Date()): string {
  return [hourPad(date), minutePad(date)].join(separation)
}

/**
 * Returns a custom string that represent the given date
 */
export function hhmmss (separation = '-', date: Date = new Date()): string {
  return [hhmm(separation, date), secondPad(date)].join(separation)
}

/**
 * Returns a custom string that represent the given date
 */
export function ddmmyyyyhhmm (separation = '-', date: Date = new Date()): string {
  return ddmmyyyy(separation, date) + separation + hhmm(separation, date)
}

/**
 * Returns a custom string that represent the given date
 */
export function yyyymmddhhmm (separation = '-', date: Date = new Date()): string {
  return yyyymmdd(separation, date) + separation + hhmm(separation, date)
}

/**
 * Returns a custom string that represent the given date
 */
export function ddmmyyyyhhmmss (separation = '-', date: Date = new Date()): string {
  return ddmmyyyy(separation, date) + separation + hhmmss(separation, date)
}

/**
 * Returns a custom string that represent the given date
 */
export function yyyymmddhhmmss (separation = '-', date: Date = new Date()): string {
  return yyyymmdd(separation, date) + separation + hhmmss(separation, date)
}
