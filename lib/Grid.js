const equalArrays = require('./equalArrays')
const errors = require('./private/errors')
const CONSTS = require('./constants')
const isInt = require('./isInt')
const isPlainObject = require('./isPlainObject')
const AkwardArray = require('./private/AkwardArray')

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
    } else errors.incorrect("Grid.size's given coordinates are incorrect")

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
    } else errors.incorrect("Grid.set's given coordinates must be in array and in the range of the grid")

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

    } else errors.incorrect("Grid.get's given coordinates must be in array and in the range of the grid") // The given coords are not in the range of the grid

  }




  /**  @method
   * toArray - converts the grid to an array
   *
   * @return {Array}  The arrayed grid
   */
   toArray() {

     var finalArray = this._array.slice(0)

     let recursive = (array) => {

       // For every item in this array
       for (var i = 0; i < array.length; i++) {

         // If the item is an AkwardArray and the items inside are aswell, then we do a recursion with the item as the new array
         // If the item is an AkwardArray but the items inside are not, then we convert this AkArray into a regular array using AkwardArray.toArray() method
              if(array[i] instanceof AkwardArray && array[i][0] instanceof AkwardArray)     recursive(array[i])
         else if(array[i] instanceof AkwardArray && !(array[i][0] instanceof AkwardArray))  array[i] = array[i].toArray()

       }
     }

    recursive(finalArray) // Lunch the recursion

    return finalArray.toArray().slice(0)
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

    if(!(typeof(prob) === "number")) errors.incorrect("Probabilities should be numbers or undefined") // The given probability of filling is not valid (must be number or blank)

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

        if(array[i] instanceof AkwardArray) recursive(array[i], func, newCoords) // If the current array holds arrays, it's another dimension, we repeat this function
        else // Else, we execute the function with the value, coordinates and subarray of the current case
          stop = func(array[i], newCoords, array) === CONSTS.STOP ? true : stop // If the script returns CONSTS.STOP, well, we stop everything !
      }
    }

    recursive(this._array, f, new Array) // Lunch the recursion

  }




  /**  @method
   * every - Returns whenever or not every cases of a grid passes a test (like Array.every())
   *
   * @param  {Function} test The function that passes the test to the casses
   * @return {Boolean}       Whenever or not the test was successful on every case
   */
  every(test) {

    if(!(test instanceof Function)) errors.incorrect("Grid.every only accepts functions")

    var success = true

    this.forEach((value, coords, array) => {
      if(!test(value, coords, array)) {
        success = false
        return CONSTS.STOP
      }
    })

    return success

  }




  /**  @method
   * some - Returns whenever or not at least one case of a grid passes a test (like Array.some())
   *
   * @param  {Function} test The function that passes the test to the casses
   * @return {Boolean}       Whenever or not the test was successful on at least one case
   */
  some(test) {

    if(!(test instanceof Function)) errors.incorrect("Grid.some only accepts functions")

    var success = false

    this.forEach((value, coords, array) => {
      if(test(value, coords, array)) {
        success = true
        return CONSTS.STOP
      }
    })

    return success
  }




  /**  @method
   * find - Returns the value of the first element in the grid that satisfies the provided test function
   *
   * @param  {Function} test The test function
   * @return {Any}           The value of the first element that passes the test or undefined
   */
  find(test) {

    if(!(test instanceof Function)) errors.incorrect("Grid.find only accepts functions")

    var val = undefined

    this.forEach((value, coords, array) => {
      if(test(value, coords, array)) {
        val = value
        return CONSTS.STOP
      }
    })

    return val
  }




  /**  @method
   * findCoords - Returns the coords of the first element in the grid that satisfies the provided test function
   *
   * @param  {Function} test The test function
   * @return {Array}         The coords of the first element that passes the test or undefined
   */
  findCoords(test) {

    if(!(test instanceof Function)) errors.incorrect("Grid.findCoords only accepts functions")

    var foundCoords = -1

    this.forEach((value, coords, array) => {
      if(test(value, coords, array)) {
        foundCoords = coords
        return CONSTS.STOP
      }
    })

    return foundCoords
  }




  /**  @method
   * slice - Makes a shallow copy of the grid
   *
   * @return {Grid}  Returns a copy of the current grid object
   *
   * NOTE: Much like Array.slice(), this method won't copy objects by value but rather by reference
   */
  slice() {

    var grid = new Grid({dimensions: this.size})

    this.forEach((val, coords) => {
      grid.set(coords, val)
    })

    return grid

  }




  /**  @method
   * flat - Transforms a grid into a neat 1d array much like Array.flat()
   *
   * @return {Array}  The array of all the values of the grid
   */
  flat() {
    var array = new Array()

    this.forEach((value) => {
      array.push(value)
    })

    return array
  }




  /**  @method
   * includes - Tests if a value is included in the grid
   *
   * @param  {Any}     val The value
   * @return {Boolean}     Whenever or not the given value is included in the grid
   */
  includes(val) {

    if(arguments.length === 0) errors.incorrect("You should provide a value to check")

    var present = false

    this.forEach((value) => {
      if(value === val) {
        present = true
        return CONSTS.STOP
      }
    })

    return present
  }




  /**  @method
   * coordsOf - Gets the coordinates of the first element to hold a given value much like Array.indexOf()
   *
   * @param  {Any}   val The value
   * @return {Array}     The coordinates of the element holding the value or -1
   */
  coordsOf(val) {
    return this.findCoords(value => value === val)
  }




  /**  @method
   * map - Creates a new grid with the result provided by a function
   *
   * @param  {Function} func The function callback
   * @return {Grid}          The new grid with new values
   */
  map(func) {

    if(!(func instanceof Function)) errors.incorrect("Grid.map only accepts functions")

    var updatedGrid = this.slice()

    this.forEach((value, coords, array) => {
      updatedGrid.set(coords, func(value, coords, array))
    })

    return updatedGrid
  }




  /**  @method
   * join - Joins the values of the grid with a separator
   *
   * @param  {String} [separator] The separator between each value
   * @return {String}             The final joined string
   */
  join(separator) {

    if(arguments.length === 0) separator = ","

    var string = ""

    this.forEach((value) => {
      string += value + separator
    })

    if(separator.length > 0) string = string.substring(0, string.length-1)

    return string
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
        var array = new AkwardArray() // The array

        // Fill it with n-1 dimensions
        for (var i = 0; i < dimensions[0]; i++) array.push(Grid.generate(dimensions.slice(1)))
        return array

      // If it's just a 1d array, return it
      } else return new AkwardArray(dimensions[0]).fill(undefined)

    } else errors.incorrect("Grid.generate's given dimensions are incorrect") // The given dimensions are not correct

  }




  /**  @method
   * @static correctCoords - Checks if the given coordinates are in a correct form (an array of between 1 and 10 numbers)
   *
   * @param  {Array}   coords The coords to check
   * @return {Boolean}        Whenever or not the given coords are correct
   */
  static correctCoords(coords) {
    return coords instanceof Array && !coords.some(isNaN) && coords.length > 0 && coords.length <= 10 && coords.every(isInt) && coords.every((val) => { return val >= 0 && val !== Infinity} )
  }


}
