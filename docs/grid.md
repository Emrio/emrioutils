# Grid Object

> Create easy-to-use multi dimensional arrays
From 1d to 10d!

Instanciate a new grid object

Syntax:

```js
var grid = new emrioutils.Grid(options)
```

You can specify the dimensions of the grid directly

```js
var grid = new emrioutils.Grid({ dimensions: [5, 4, 4] })

var grid = new emrioutils.Grid([5, 4, 4])
```

These two methods would give the same result. Using an object is allowed for future options.

## Attributes

### `grid.size`

* Returns an array of numbers : the dimensions of the grid
* You can use this to set the dimension of the grid

Example:

```js
grid.size = [5, 4, 4] // The grid will now be a 5x4x4 3d grid

console.log(grid.size) // Will return the array [5, 4, 4]
```

**Important:**
Setting a new grid size will destroy all content hold

### `grid.dimension`

* Returns the dimension of the grid
* Can't be used to set the dimension of the grid (use `grid.size` instead)

Example:

```js
console.log(grid.dimension) // Will return 3
```

### _`grid.array`_

**Important:** This attribute no more exists from version 2.0.0 and is replaced by `grid.toArray()`

* Returns the grid in the form of an array
* Is read-only

Example:

```js
var array = grid.array
```

**Important:**
Using `grid.array` to get the value at coordinates is not recommended. You should use `grid.get()` instead. Futhermore, you cannot set values with `grid.array` (use `grid.set()`)

## Methods

### `grid.gen()`

Generates the grid with the provided dimensions. This will delete the old grid and all data will be lost.<br>
By default, every cases are `undefined`

**Important:**
This method is used when a new size is set. You won't have to use this method after setting the size of a grid

### `grid.fill(value, <probability>)`

This method will fill the whole grid with a certain value.
You can also specify a probability so that only x% of the cases will have this value

Examples:

```js
// Fills every case with the value "hello"
grid.fill("hello")

// 50% of the cases will have the value "hi!"
grid.fill("hi!", 0.5)
```

### `grid.set(coords, value)`

Allows you to set the value of a case in the grid.
The coordinates are an array of numbers

Example:

```js
grid.set([3, 2, 3], "hello there!")

var x = 0, y = 2, z = 2
grid.set([x, y, z], 42)

var coords = [2, 2, 1]
grid.set(coords, null)
```

**Note:**
`Grid` accepts arrays from version 2.0.0

### `grid.get(coords)`

This method will return the value at a certain position given an array of numbers.

Example:

```js
console.log(grid.get([3, 2, 3])) // Returns "hello, there!"

var x = 0, y = 2, z = 2
console.log(grid.get([x, y, z])) // Returns 42

var coords = [2, 2, 1]
console.log(grid.get(coords)) // Returns null
```

### `grid.inRangeCoords(coords)`

Returns `true` or `false` whenever or not the given coordinates can target a case in the grid.

**Note:**
The coordinates start at 0 when grid dimensions start at 1!

Example:

```js
var grid = new emrioutils.Grid([3, 4, 6])

console.log(grid.inRangeCoords([2, 1, 3])) // Returns true

console.log(grid.inRangeCoords([3, 1, 3])) // Returns false

console.log(grid.inRangeCoords([2, 1, -2])) // Returns false
```

**Important:**
`inRangeCoords()` is different than the static method `correctCoords()` : the first one checks if the given coords are *in the range* of a grid and the second if the given coords are valid

### `grid.forEach(function callback(value, coords, array))`

This method allows you to executes a function at every cases of a grid.
It is similar to the `Array.forEach()` method.
The callback will take three parameters : the value of the current case, the coordinates of that case and the current sub array.

You can also stop the `forEach` method by returning the value `emrioutils.STOP`

Example:

```js
// This will log every values of the grid
grid.forEach((value) => {
  console.log(value)
})

// This will set the value of 1 to every case that doesn't have the value 0
grid.forEach((value, coords) => {
  if(value !== 0) {
    grid.set(coords, 1)
  }
})

// This will set the value of 1 to the first case that doesn't have the value 0
grid.forEach((value, coords) => {
  if(value !== 0) {
    grid.set(coords, 1)
    return emrioutils.STOP
  }
})
```

### `grid.every(function callback(value, coords, array))`

Much like the `Array.every()` method, this will try the `testFunction` for every cases of the grid.
The test function can take as argument the current value, the current coordinates and the current subarray

Example:

```js
grid.fill(0) // Fills the grid with 0s

// A function that tests if a value is below a defined threshold
var isBelowThreshold = (value) => {
  let threshold = 10
  return value < threshold
}

console.log(grid.every(isNaN)) // Outputs false because no case is not a number
console.log(grid.every(isBelowThreshold)) // Outputs true because no case is over 10

grid.set([0, 0, 0], 12) // Sets a case's value to 12

console.log(grid.every(isBelowThreshold)) // Outputs false because one case doesn't fulfil the requirement of being below 10
```

### `grid.some(function callback(value, coords, array))`

Checks if at least one case passes a given test

Example:

```js
var grid = new emrioutils.Grid([5, 10])

grid.fill(0) // Filling the grid with 0s
console.log(grid.some(isNaN)) // Returns false : every cases are numbers

grid.set([2, 4], "hello!") // Filling one case with "hello!"
console.log(grid.some(isNaN)) // Returns true : at least one case is not a number
```

### `grid.slice()`

Returns a clone of the grid

**Note:**
Much like `Array.slice()`, this method won't pass by value objects and arrays

### `grid.find(function test(value, coords, array))`

Finds and returns the value of the first element that matches the given test function or undefined if no element satisfies the test

Example:

```js
var grid = new emrioutils.Grid([8, 7])

// Fills the grid with values from 1 to 10
grid.forEach((_, coords) => {
  grid.set(coords, Math.floor(Math.random()*10)+1)
})

console.log(grid.find(x => x > 5)) // Will output true or false depending on whenever or not the grid has a case with a value > 5
```

### `grid.findCoords(function test(value, coords, array))`

Finds and returns the coordinates of the first element that matches the given test function or -1 if no element satisfies the test

Example:

```js
var grid = new emrioutils.Grid([8, 7])

// Fills the grid with values from 1 to 10
grid.forEach((_, coords) => {
  grid.set(coords, Math.floor(Math.random()*10)+1)
})

console.log(grid.findCoords(x => x < 5)) // Will return the coordinates of the first case that have its value < 5 or -1 if none is found
```

### `grid.includes(value)`

Tests if the grid has a given value

Example:

```js
var grid = new emrioutils.Grid([2, 2])

grid.fill(0)
console.log(grid.includes("hello")) // Returns false

grid.set([1, 0], "hello")
console.log(grid.includes("hello")) // Returns true
```

### `grid.coordsOf(value)`

Returns the coordinates of the first case to hold a given value or -1 if none found

Example:

```js
var grid = new emrioutils.Grid([2, 2])

grid.fill(0)
console.log(grid.includes("hello")) // Returns -1

grid.set([1, 0], "hello")
console.log(grid.includes("hello")) // Returns the array [1, 0]
```

### `grid.map(function callback(value, coords, array))`

Creates a new grid with the result provided by a function

Example:

```js
var grid = new emrioutils.Grid([2, 2])

grid.fill(1) // Fills the grid with 1s
grid.fill(2, 0.5) // Fills half of the grid with 2s

var doubled = grid.map(x => x * 2) // This grid has doubled values
```

### `grid.join(<separator>)`

Returns a string of the values of all cases separated with a string or by `,`

Example:

```js
var grid = new emrioutils.Grid([2, 2])

grid.fill(1) // Fills the grid with 1s
grid.set([0, 1], 2)

console.log(grid.join())    // 1,2,1,1
console.log(grid.join("-")) // 1-2-1-1
console.log(grid.join(""))  // 1211
```

### `grid.flat()`

Returns an array that contains every values of the grid. This could be called "n-dimension to 1d"

Example:

```js
var array = grid.flat() // A 1d array with the values of the grid
```

### `grid.toArray()`

Returns the grid in the form of a multi-dimensional array

Example:

```js
var grid = new emrioutils.Grid([2, 4])

console.log(grid.toArray()) // Returns a multi-dim array
```


## Static Methods

### `Grid.generate(dimensions)`

A static method which generate a multi dimensional array based on the given dimensions. `grid.gen()` calls this method to generate the grid

### `Grid.correctCoords(coords)`

Checks if the given coordinates may be used as coordinates in a grid. This means that:
* The given coordinates are in the form of an array
* The items hold by the array are positive integers
* The array has between 1 and 10 items (1d to 10d)

Example:

```js
console.log(emrioutils.Grid.correctCoords(["hi", Infinity, Math.PI])) // returns false

console.log(emrioutils.Grid.correctCoords([2, 5, 1, 4])) // returns true
```
