# Functions

> A exhaustive list of the functions implemented by emrioutils

### `equalArrays(array1, array2)`

This allows you to check if two arrays are stricly equal in terms of length and values

Example:

```js
var array1 = [1, 3, "hello"]
var array2 = ["hi!", undefined, 42]
var array3 = [1, 3, "hello"]
var array4 = [1, 2, 3, 4, 5]

console.log(emrioutils.equalArrays(array1, array2)) // Returns false

console.log(emrioutils.equalArrays(array1, array3)) // Returns true

console.log(emrioutils.equalArrays(array1, array4)) // Returns false
```

### `mean(array)`

This function will return the average value of a array of values

Example:

```js
var marks = [9, 7, 8.5, 10, 6] // My marks (/10)

console.log("Your average mark is " + emrioutils.mean(marks) + "/10") // This will output "Your average mark is 8.1/10"
```

### `isInt(number)`

Checks if a given input is an integer

Example:

```js
console.log(emrioutils.isInt(42)) // Returns true

console.log(emrioutils.isInt(3.1415)) // Returns false

console.log(emrioutils.isInt(Infinity)) // Returns false
```

### `isPlainObject(obj)`

Checks if a given input is a plain object (is not an array nor null : just a simple object with `{}`)

Example:

```js
var my_obj = { prop: "hi!", prop2: "bye!" }
var my_arr = [1, 42, ":-)", undefined]


console.log(emrioutils.isPlainObject(my_obj)) // Returns true

console.log(emrioutils.isPlainObject(my_arr)) // Returns false

console.log(emrioutils.isPlainObject(null)) // Returns false

console.log(emrioutils.isPlainObject("hello!")) // Returns false
```
