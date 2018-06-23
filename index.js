/**
 * @file   Some objects and functions
 * @author Emrio || TheEmrio
 * @version 1.0
 */

const CONSTS = { STOP: Math.random(), VERSION: "1.0" }


/**  @function
 * equalArrays - Tests if two arrays are equal by value and by length
 *
 * @param  {Array} array1 The first array
 * @param  {Array} array2 The second array
 * @return {Boolean}      Whenever or not the arrays are equal
 */
var equalArrays = (array1, array2) => {
  if(array1.length !== array2.length) return false
  for (var i = 0; i < array1.length; i++) {
    if(array1[i] !== array2[i]) return false
  }
  return true
}

var error = () => {
  throw "This module is not implemented in this version!"
}


module.exports.Stopwatch = class Stopwatch {

  /**  @method
   * constructor - The constructor of the Stopwatch Object
   *
   * @return  The Stopwatch object
   *
   * @example let stopwatch = new emrioutils.Stopwatch()
   */
  constructor() {
    this._timeOnStart = 0
    this._running = false
    this._log = []
  }


  /**  @method
   * start - Starts the stopwatch
   *
   * @example stopwatch.start()
   */
  start() {
    if(!this._running) {
      this._running = true
      this._timeOnStart = Date.now()
    }
  }


  /**  @method
   * stop - Stops the stopwatch. This also pushes the time passed to the time history
   *
   * @return {Object} The stopwatch object
   *
   * @example stopwatch.stop()
   */
  stop() {
    if(this._running) {
      this._running = false
      this._log.push(Date.now() - this._timeOnStart)
    }
    return this
  }


  /**  @method
   * elapsed - The time elapsed between the start() and stop() or the time elapsed since the start()
   *
   * @return {Number}  The elapsed time in milliseconds
   *
   * @example stopwatch.start()
   * @example // time passing...
   * @example stopwatch.stop()
   * @example stopwatch.elapsed() // The elapsed time between start() and stop()
   */
  elapsed() {
    if(!this._running && this._log.length > 0) {
      return this._log[this._log.length-1]
    } else if(this._running) {
      return Date.now() - this._timeOnStart
    }
  }


  /**  @method
   * clearHistory - Clears the time history
   *
   * @return {Object}  The Stopwatch object
   */
  clearHistory() {
    this._log = []
    return this
  }


  /**  @method
   * tour - Pushes the time elapsed since start and restarts the stopwatch
   *
   * @return {Object}  The Stopwatch object
   */
  tour() {
    if(this._running) {
      this.stop()
      this.start()
    }
    return this
  }


  /**  @method
   * historySum - The sum of all the times stored in the time history
   *
   * @return {number}  The total time in milliseconds
   */
  historySum() {
    let total = 0
    for (var i = 0; i < this._log.length; i++) {
      total += this._log[i]
    }
    return total
  }


  /**  @method
   * get history - Returns the time history
   *
   * @return {Array}  The time history
   */
  get history() {
    return this._log
  }

}



module.exports.ModInterval = class ModInterval {

  /**
   * @function constructor - The ModInterval object constructor
   *
   * @param  {Object}   options           The options for the ModInterval
   * @param  {Number}   options.tickspeed The tickspeed (the function will be run every x milliseconds)
   * @param  {Function} options.function  The function to run
   *
   * @return {Object}                     The modified interval object
   */
  constructor(options) {
    this.tick = options.tickspeed || 1000;
    this.f = options.function || function(){};
  }

  /**
   * @function start - Starts the interval
   */
  start() {
    this.interval = setInterval(this.f, this.tick);
  }

  /**
   * @function clear - Clears the interval
   */
  clear() {
    clearInterval(this.interval);
  }

  /**
   * @function reload - Reloads the interval (reloads function and tickspeed)
   */
  reload() {
    this.clear();
    this.start();
  }

  /**
   * @function setTickspeed - Sets a new tickspeed
   *
   * @param {Number} tickspeed   The new tickspeed
   * @param {Boolean} dontrestart Forces the interval to not reload
   */
  setTickspeed(tickspeed, dontrestart) {
    this.tick = tickspeed || this.tick || 1000;
    if(!dontrestart) this.reload();
  }

  /**
   * @function setFunction - Sets a new function
   *
   * @param {Function} func    The new function
   * @param {Boolean} dontrestart Forces the interval to not reload
   */
  setFunction(func, dontrestart) {
    this.f = func || this.f || {};
    if(!dontrestart) this.reload();
  }

  /**
   * @function setAll - Sets a new function and a tickspeed
   *
   * @param {Function} func        The new function
   * @param {Number}   tickspeed   The new tickspeed
   * @param {Boolean}  dontrestart Forces the interval to not reload
   */
  setAll(func, tickspeed, dontrestart) {
    this.setFunction(func, false);
    this.setTickspeed(tickspeed, false);
    if(!dontrestart) this.reload();
  }

}

module.exports.Grid = class Grid {

  /**  @method
   * constructor - The constructor of the Grid object
   *
   * @param  {string} [dim] The dimension of the grid
   * @return {object}       The Grid Object
   *
   * @example let myGrid = new Grid()           // Returns a 1d grid
   * @example let anotherGrid = new Grid("3d")  // Returns a 3d grid
   */
  constructor(dim) {

    // Initializing properties object
    this.props = {}


    // If a dimension is specified...
    if(typeof(parseInt(dim)) === "number" && dim % 1 === 0) {

      // Default size of the grid depending on dimesnion (1, 1x1, 1x1x1, ...)
      let sizes = []
      for (var i = 0; i < dim; i++) {
        sizes.push(1)
      }
      this.size = sizes

    } else this.size = [1] // If not, we set a 1d grid

    // Generate the grid!
    this.gen()

  }


  /**  @method
   * @static generate - Generates a grid with given size
   *
   * @param  {Array} size An array of numbers with grid dimensions
   * @return {Array}      Array of array of array of.. array ? The generate n-dimensional grid
   */
  static generate(size) {

    // Empty arrays of arrays (they are as a many arrays as they is dimensions, each of the length of the dimension's size)
    let arrays = []
    for (var i = 0; i < size.length; i++) arrays.push(new Array(size[i]))

    // Starting from last : for each array except last at n position, we fill the array with the n+1 array and so on until first array
    for (var current = size.length-2; current !== -1; current--) {
      for (var i = 0; i < arrays[current].length; i++) arrays[current][i] = arrays[current+1].slice(0)
    }

    // Returns first array, the complete one
    return arrays[0]

  }


  /**  @method
   * gen - Calls the Grid.generate() static function to generate a grid for the GridObject
   */
  gen() {
    this.props.grid = Grid.generate(this.size)
  }


  coordsOf(caseNumber) {

    // 5x5 = 25 cases
    // case 10 : floor(10 / 5) = 2
    // case 10 : 10 % 5 = 0
    console.warn("Not implemented yet");

  }


  /**  @method
   * caseOf - Gets the case number of a case with given coordinates
   *
   * @param  {Array}  coords An array of numbers : the coordinates of the targeted case
   * @return {Number}        The case number
   */
  caseOf(coords) {
    console.warn("Not implemented yet");
    // if(coords instanceof Array && !coords.some(isNaN) && coords.length === this.dimension) {
    //   let caseNumber = 1
    //   for (var i = 0; i < coords.length; i++) caseNumber *= coords[i]
    //   return caseNumber
    // }
  }


  /**  @method
   * set - Used to set a case's value
   *
   * @param  {Array} targetedCoords An array of number, the coordinates of the case
   * @param  {Any}   value          The value to set to
   */
  set(targetedCoords, value) {

    if(targetedCoords instanceof Array && !targetedCoords.some(isNaN) && targetedCoords.length === this.dimension) {

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
   * get - Gets the value of a given case
   *
   * @param  {Array} targetedCoords An array of numbers which are the coordinates of the case
   * @return {Any}                  The value of that case
   */
  get(targetedCoords) {

    let val = undefined
    if(targetedCoords instanceof Array && !targetedCoords.some(isNaN) && targetedCoords.length === this.dimension) {

      // For each case, test if the coords of each case is equal to the needed case's coordinates, if so, get its value
      this.forEach((value, coords) => {
        if(equalArrays(coords, targetedCoords)) {
          val = value
          return CONSTS.STOP // Stop execution of script
        }
      })
    }

    return val
  }


  /**  @method
   * forEach - Executes a given script to every cases of the grid
   *
   * @param  {Function} f The function to execute
   */
  forEach(f) {

    var stop = false // Whenever the script is stoped

    // A recursive function, for each dimesnion. WE NEED TO GO DEEPER !
    let recursive = (array, func, coords) => {

      for (var i = 0; i < array.length; i++) {

        if(stop) break

        var newCoords = coords.slice(0)
        newCoords.push(i)

        // If the current array holds arrays, it's another dimension, we repeat this function
        if( array[i] instanceof Array)  recursive(array[i], func, newCoords)

        // Else, we execute the function we the given value, coordinates and subarray the value is in
        else {
          stop = func(array[i], newCoords, array) === CONSTS.STOP ? true : stop
          // If the script returns CONSTS.STOP, well, we stop everything !
          if(stop) return this
        }
      }
    }

    recursive(this.array, f, new Array, this.props.grid) // Lunch the recursion

  }


  /**  @method
   * fill - Fills the grid with a value. You can specify that each case has a chance of having that value
   *
   * @param  {Any}    tofill The value to fill
   * @param  {Number} [prob] The probability of each case to have that value
   */
  fill(tofill, prob) {

    this.forEach((value, coords, array) => {
      if (!isNaN(prob)) {
        array[coords[coords.length-1]] = (Math.floor(Math.random() * 100)+1-prob*100 <= 0) ? tofill : array[coords[coords.length-1]]
      } else array[coords[coords.length-1]] = tofill
    })

  }


  /**  @method
   * get array - Grid object as an array
   *
   * @return {Array}  The arrayed grid
   */
  get array() {
    return this.props.grid
  }


  /**  @method
   * get dimension - Gets the dimension of the grid
   *
   * @return {Number}  The dimension
   *
   * @example myGrid.dimension    // Returns 2
   */
  get dimension() {
    return this.props.size.length
  }


  /**  @method
   * set size - Sets the size of the grid
   *
   * @param  {Array} dims An array of numbers with the dimensions of the grid
   *
   * @example myGrid.size = [5, 2]  // myGrid is now a 5x2 table
   */
  set size(dims) {
    if(dims instanceof Array && !dims.some(isNaN) && dims.length > 0 && dims.length <= 10) {
      for (var i = 0; i < dims.length; i++) dims[i] = parseInt(dims[i])
      this.props.size = dims
    } else this.props.size = this.size

    this.gen()
  }


  /**  @method
   * get size - Gets the size of the grid
   *
   * @return {Array}  An array of numbers with the grid dimensions
   *
   * @example myGrid.size     // Returns [5, 2]
   */
  get size() {
    return this.props.size
  }

}

// NOT IN USE
/*module.exports.AkwardArray = */class AkwardArray {
  constructor(array) {
    this.array = array || new Array()
  }
  get r() {
    return this._array
  }
  get array() {
    return this
  }
  set array(array) {
    if(array instanceof Array) {
      this._array = array
    } else throw "AkwardArray only accepts arrays!"
  }
}


// Exporting constants
for (var key in CONSTS) module.exports[key] = CONSTS[key]

// Exporting functions
module.exports.equalArrays = equalArrays
