# ModInterval Object

> A brother of `setInterval()`<br>
Allows you to change (almost) everything on the go!

Instanciate a new ModInterval object

```js
var modInterval = new emrioutils.ModInterval()
```

You can also specify some options :

```js
var modInterval = new emrioutils.ModInterval({
  tickspeed: 250, // The time between intervals, in milliseconds
  function: mySpecialFunction // The function to execute at every interval
})
```

## Attributes

### `modInterval.tickspeed`

* Get the current used tickspeed in milliseconds
* Is read-only. Use `modInterval.setTickspeed()` to set the tickspeed

### `modInterval.function`

* Get the current used funtion
* Is read-only. Use `modInterval.setFunction()` to set the function

## Methods

### `modInterval.start()`

Starts the interval with current function and tickspeed

```js
var modInterval = new emrioutils.ModInterval({
  tickspeed: 500,
  function: () => { console.log("hello!") }
})

modInterval.start() // This will print "hello!" every 500ms in the console
```

### `modInterval.clear()`

This will clear the interval much like the `clearInterval()` function

### `modInterval.reload()`

This will reload the restart the interval with the last tickspeed and function.
This method is used internally, you won't have to use it after setting a new tickspeed or function

### `modInterval.setTickspeed(tickspeed, <dontrestart>)`

Set the tickspeed to another value.

You may also specify if you don't want the interval to reload by passing `true` as a second parameter

Example:

```js
var modInterval = new emrioutils.ModInterval({
  tickspeed: 500,
  function: () => { console.log("1 + 1 = 2") }
})

modInterval.start() // This will print "1 + 1 = 2" every 500ms in the console

// Ok, I understood

modInterval.setTickspeed(2000) // Now, the function will be executed every 2000ms (2 seconds)
```

### `modInterval.setFunction(function, <dontrestart>)`

Much like `setTickspeed()`, this allows you to set another function in the interval.

You may also specify if you don't want the interval to reload by passing `true` as a second parameter

Example:

```js
var modInterval = new emrioutils.ModInterval({
  tickspeed: 1000,
  function: () => { console.log("hello there!") }
})

ModInterval.start() // This will print "hello there!" every second

// Now, let's set the function to print "goodbye now!"
ModInterval.setFunction(() => {
  console.log("goodbye now!")
})
```

### `modInterval.setAll(function, tickspeed, <dontrestart>)`

A combination of `setFunction()` and `setTickspeed()`. Allows you to set both a new function and a new tickspeed.

You may also specify if you don't want the interval to reload by passing `true` as a second parameter
