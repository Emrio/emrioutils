/**  @function
 * isPlainObject - Tests if a given input is a plain object (is not an array nor null)
 * @see {@link https://github.com/TheEmrio/emrioutils/blob/master/docs/functions.md#isplainobjectobj Emrioutils Docs :: Functions - isPlainObject}
 *
 * @param  {Object} obj The input to check
 * @return {Boolean}    Whenever or not the input is a plain object (it looks like {} rather than [] or null)
 *
 */
module.exports = (obj) => {
  return obj !== null && !Array.isArray(obj) && typeof(obj) === "object"
}
