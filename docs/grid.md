# Grid Object

> Create easy-to-use multi dimensional arrays
From 1d to 10d!

Instanciate a new grid object

```js
var grid = new emrioutils.Grid()
```

You may also want to directly specify a dimension

```js
var grid = new emrioutils.Grid(3) // Will create a 3d grid
```

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

### `grid.array`

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

**Important:**
`Grid` doesn't support arrays yet. You may not set the value of a case to an array or the grid will go crazy. This will be fixed in future versions

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

### `grid.forEach(function)`

This method allows you to executes a function at every cases of a grid.
It is similar to the `array.forEach()` method.
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

## Static Methods

### `Grid.generate(dimensions)`

A static method which generate a multi dimensional array based on the given dimensions. `grid.gen()` calls this method to generate the grid
