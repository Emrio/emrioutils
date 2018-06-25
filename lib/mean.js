/**  @function
 * mean - Returns the average value of an array of numbers
 *
 * @param  {Array}  array The array of numbers
 * @return {Number}      The average value
 */
module.exports = (array) => {

  if(array instanceof Array && !array.some(isNaN)) {
    let sum = 0
    for (var i = 0; i < array.length; i++) {
      sum += array[i]
    }
  }
  return sum/array.length
}
