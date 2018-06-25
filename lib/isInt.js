/**  @function
 * isInt - Tests if a number is an integer
 * @see {@link https://github.com/TheEmrio/emrioutils/blob/master/docs/functions.md#isintnumber Emrioutils Docs :: Functions - isInt}
 *
 * @param  {Number} number The number to check
 * @return {Boolean}       Whenever or not the number is an integer
 *
 */
module.exports = (number) => {
  return !isNaN(number) && number % 1 === 0
}
