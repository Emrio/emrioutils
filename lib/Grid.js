const equalArrays = require('./equalArrays')
const errors = require('./private/errors')
const CONSTS = require('./constants')
const isInt = require('./isInt');
const isPlainObject = require('./isPlainObject');

module.exports = class Grid {

/* CONSTRUCTOR */

  /**  @method
   * @constructor constructor - The constructor of the Grid object
   * @see {@link https://github.com/TheEmrio/emrioutils/blob/master/docs/grid.md Emrioutils Docs :: Grid Object}
   *
   * @param  {Object|Array} [options]            Object of options or array of dimensions of the grid
   * @param  {Array}        [options.dimensions] The dimensions of the grid
   * @return {Grid}                              The Grid Object
   */
   constructor(options) {

    if(options !== undefined && isPlainObject(options)) {
      this.size = options.dimensions

    } else if(options !== undefined && Grid.correctCoords(options)) {

      this.size = options

    } else {
      this.size = [1]
    }

  }



/* GETTERS */




  /**  @method
   * get size - Gets the size of the grid
   *
   * @return {Array}  An array of numbers with the grid dimensions
   */
  get size() {
    return this._size
  }




  /**  @method
   * get dimension - Gets the dimension of the grid
   *
   * @return {Number}  The dimension
   */
  get dimension() {
    return this.size.length
  }




  /**  @method
   * get array - Grid object as an array
   *
   * @return {Array}  The arrayed grid
   */
  get array() {
    return this._array
  }



/* SETTERS */



  /**  @method
   * set size - Sets the size of the grid
   *
   * @param  {Array} sizes An array of numbers with the dimensions of the grid
   */
  set size(sizes) {

    if(Grid.correctCoords(sizes)) {
      this._size = sizes
      this.gen()
    } else errors.incorrect()

  }



/* METHODS */




  /**  @method
   * gen - Calls the Grid.generate() static function to generate a grid for the GridObject
   */
  gen() {
    this._array = Grid.generate(this.size)
  }




  /**  @method
   * set - Used to set a case's value
   *
   * @param  {Array} targetedCoords An array of number, the coordinates of the case
   * @param  {Any}   value          The value to set to
   */
  set(targetedCoords, value) {

    if(this.inRangeCoords(targetedCoords)) {

      // Sets the value to the case that matches the given coordinates
      this.forEach((_, coords, array) => {

        if(equalArrays(coords, targetedCoords)) {
          array[coords[coords.length-1]] = value
          return CONSTS.STOP // Stop execution of script
        }

      })
    }

  }



  /**  @method
   * get - Get the value of a specific case
   *
   * @param  {Array} targetedCoords An array of number, the coordinates of the case
   * @return {Any}                  The value of the case
   */
  get(targetedCoords) {

    if(this.inRangeCoords(targetedCoords)) {

      var value = undefined

      // Find the case that has matching coords with the targetedCoords
      this.forEach((val, coords) => {
        if(equalArrays(targetedCoords, coords)) {
          value = val
          return CONSTS.STOP // Stop execution of the script
        }
      })

      return value

    } else errors.incorrect() // The given coords are not in the range of the grid

  }




  /**  @method
   * inRangeCoords - Checks if the given coords are in the range of the grid
   *
   * @param  {Array}   coords The given coords to check
   * @return {Boolean}        Whenever or not the coords are in the range of the grid
   */
  inRangeCoords(coords) {

    // Check if the coords are correct
    if(!Grid.correctCoords(coords)) return false

    // Check if every value in the coords is < to the grid's dimension at the same level (not <= because coordinates starts from 0 when sizes starts at 1)
    for (var i = 0; i < coords.length; i++) {
      if(!(coords[i] < this.size[i])) return false
    }

    // Else return true
    return true

  }




  /**  @method
   * fill - Fills the grid with a value. You can specify that each case has a chance of having that value
   *
   * @param  {Any}    tofill The value to fill
   * @param  {Number} [prob] The probability of each case to have that value
   */
  fill(tofill, prob) {

    // If no probability of filling is specify, then the probability is 1 = 100% of the cases
    if(prob === undefined) prob = 1

    if(!(typeof(prob) === "number")) errors.incorrect() // The given probability of filling is not valid (must be number or blank)

    // For each case, fill it will the given tofill value
    // (Math.floor(Math.random() * 100)+1-prob*100 <= 0) is used to only fill x% of the cases (where x is prob*100)
    this.forEach((_, coords) => {
      this.set(coords, (Math.floor(Math.random() * 100)+1-prob*100 <= 0) ? tofill : this.get(coords))
    })

  }




  /**  @method
   * forEach - Executes a given script to every cases of the grid
   *
   * @param  {Function} f The function to execute
   */
  forEach(f) {
    var stop = false // Set to true when the script should be stoped

    // A recursive function, for each dimensions. WE NEED TO GO DEEPER !
    let recursive = (array, func, coords) => {

      for (var i = 0; i < array.length; i++) {

        if(stop) break

        var newCoords = coords.slice(0)
        newCoords.push(i)

        if(array[i] instanceof Array) recursive(array[i], func, newCoords) // If the current array holds arrays, it's another dimension, we repeat this function
        else // Else, we execute the function with the value, coordinates and subarray of the current case
          stop = func(array[i], newCoords, array) === CONSTS.STOP ? true : stop // If the script returns CONSTS.STOP, well, we stop everything !
      }
    }

    recursive(this.array, f, new Array) // Lunch the recursion

  }



/* STATIC METHODS */




  /**  @method
   * @static generate - Generates a grid with given size
   *
   * @param  {Array} dimensions An array of numbers with grid dimensions
   * @return {Array}            Array of array of array of.. array ? The generated n-dimensional grid
   */
  static generate(dimensions) {

    if(Grid.correctCoords(dimensions)) {

      // If we are given a multi-dim array to make
      if(dimensions.length > 1) {
        var array = [] // The array

        // Fill it with n-1 dimensions
        for (var i = 0; i < dimensions[0]; i++) array.push(Grid.generate(dimensions.slice(1)))
        return array

      // If it's just a 1d array, return it
      } else return new Array(dimensions[0])

    } else errors.incorrect() // The given dimensions are not correct

  }




  /**  @method
   * @static correctCoords - Checks if the given coordinates are in a correct form (an array of between 1 and 10 numbers)
   *
   * @param  {Array}   coords The coords to check
   * @return {Boolean}        Whenever or not the given coords are correct
   */
  static correctCoords(coords) {
    return coords instanceof Array && !coords.some(isNaN) && coords.length > 0 && coords.length <= 10 && coords.every(isInt) && coords.every((val) => { return val > 0 && val !== Infinity} )
  }


}
