/**  @function
 * equalArrays - Tests if two arrays are equal by value and by length
 * @see {@link https://github.com/TheEmrio/emrioutils/blob/master/docs/functions.md#equalarraysarray1-array2 Emrioutils Docs :: Functions - equalArrays}
 *
 * @param  {Array} array1 The first array
 * @param  {Array} array2 The second array
 * @return {Boolean}      Whenever or not the arrays are equal
 */
module.exports = (array1, array2) => {
  if(array1.length !== array2.length) return false
  for (var i = 0; i < array1.length; i++) {
    if(array1[i] !== array2[i]) return false
  }
  return true
}
