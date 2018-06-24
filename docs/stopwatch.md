# Stopwatch Object

> A simple stopwatch to watch time passing...

**Note:** Everything is measured in milliseconds!

Instanciate a new stopwatch

```js
var stopwatch = new emrioutils.Stopwatch()
```

## Attributes

### `stopwatch.running`

* This returns a boolean if whenever or not the stopwatch is actually working
* Is read-only

Example:

```js
if(stopwatch.running) {
  console.log("My stopwatch is running!")
}
```

### `stopwatch.history`

* Stores the previous runs in an array
* Is read-only

```js
for (var i = 0; i < stopwatch.history.length; i++) {
  console.log("#" + (i+1) + " run : " + stopwatch.history[i] + "ms!")
}
// This will output something like this :
// "#1 run : 543ms!"
// "#2 run : 984ms!"
// "#3 run : 123ms!"
```

## Methods

### `stopwatch.start()`

This method will start the stopwatch. It can be stoped with `stopwatch.stop()`

### `stopwatch.stop()`

This method will stop the stopwatch. The time between `start()` and `stop()` will be pushed in `stopwatch.history`

### `stopwatch.elapsed()`

This will return the time of the last run stored in `stopwatch.history` if the stopwatch is paused or it will return the time passed from when the stopwatch started

Example:

```js
// Start the stopwatch
stopwatch.start()

/* Some time consuming script */

// Stop the stopwatch
stopwatch.stop()

// Log the time elapsed between the start() and stop()
console.log("This script took " + stopwatch.elapsed() + "ms to execute!")
```

Example 2:

```js
// Start the stopwatch
stopwatch.start()

for (var i = 0; i < 100; i++) {
  /* Some time consuming script */

  // Log the time passed from the start() method being called
  console.log(stopwatch.elapsed() + "ms elapsed from now!")
}

// Stop the stopwatch
stopwatch.stop()
```

### `stopwatch.lap()`

Much like the iPhone Stopwatch's Lap button, this will push the time passed from the start() method and start the stopwatch again.

Example:

```js
// Start the Stopwatch
stopwatch.start()

for (var i = 0; i < 100; i++) {
  /* Some time consuming script */

  // Lap
  stopwatch.lap
}

stopwatch.stop()

// Log the average time the script took to execute by using the emrioutils.mean() function
console.log("This process took in average " + emrioutils.mean(stopwatch.history) + "ms!")
```

### `stopwatch.historySum()`

This will return the sum of the times stored in the stopwatch's history

```js
console.log("The total time the process took is " + stopwatch.historySum() + "ms!")
```

### `stopwatch.clearHistory()`

This will clear the history of the stopwatch
