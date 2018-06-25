const equalArrays = require('./equalArrays')
const errors = require('./private/errors')

module.exports = class Grid {

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
    errors.wip()

  }


  /**  @method
   * caseOf - Gets the case number of a case with given coordinates
   *
   * @param  {Array}  coords An array of numbers : the coordinates of the targeted case
   * @return {Number}        The case number
   */
  caseOf(coords) {
    errors.wip()
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

        console.log(coords);

        //console.log(coords);
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

//    console.log(this.props.size);

    var stop = false // Whenever the script is stoped

    // A recursive function, for each dimesnion. WE NEED TO GO DEEPER !
    let recursive = (array, func, coords) => {

//      console.log(this.props.size);

      for (var i = 0; i < array.length; i++) {

        if(stop) break

        var newCoords = coords.slice(0)
        newCoords.push(i)
//        console.log(this.props.size + " ==== dimension");
        // If the current array holds arrays, it's another dimension, we repeat this function
        if( array[i] instanceof Array /*newCoords.length !== this.size.length*/)  recursive(array[i], func, newCoords)

        // Else, we execute the function we the given value, coordinates and subarray the value is in
        else {
/*
          console.log(newCoords);

          console.log(array[i]);
*/
          stop = func(array[i], newCoords, array) === CONSTS.STOP ? true : stop
          // If the script returns CONSTS.STOP, well, we stop everything !
        }
      }
    }

    recursive(this.array, f, new Array) // Lunch the recursion

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
