# emrioutils
A utility package for my projects<br>

[Site](https://emrio.fr/emrioutils)
[Docs](https://github.com/TheEmrio/emrioutils/)
[Twitter](https://twitter.com/TheEmrio)
[Github](https://github.com/TheEmrio/emrioutils)

Note: emrioutils is released under [MIT License](https://raw.githubusercontent.com/TheEmrio/emrioutils/master/LICENSE)


### Installing

Using NPM

```shell
$ npm i -S emrioutils
```

On Node.js

```js
const emrioutils = require('emrioutils')
```

### Usage examples

Using Grid object

```js
// Create grid
var my_grid = new emrioutils.Grid()

// Set the size of the grid
my_grid.size = [5, 4, 4] // Creates a 3d 5x4x4 grid

// Fill grid entirely
my_grid.fill("I'm a value!")
// Fill half of the grid (50%)
my_grid.fill("I'm a value!", 0.5)
```

Using Stopwatch object

```js
// Create a stopwatch
var stopwatch = new emrioutils.Stopwatch()

// Start the stopwatch
stopwatch.start()

/* Insert code here */

// Stoping the stopwatch
stopwatch.stop()

console.log(stopwatch.elapsed() + "ms elapsed!")
```

### You can see more code samples on the [docs](https://github.com/TheEmrio/emrioutils/)
