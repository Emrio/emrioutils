/**  @function
 * round - Returns a value rounded to a certain precision
 * @see {@link https://github.com/TheEmrio/emrioutils/blob/master/docs/functions.md#roundnumberprecision Emrioutils Docs :: Functions - round}
 *
 * @param  {Number} n  The number to round
 * @param  {Number} p  The precision
 * @return {Number}    The rounded number
 */
module.exports = (n, p) => {
  return Math.round(n * Math.pow(10, p ? p : 0)) / Math.pow(10, p ? p : 0)
}
