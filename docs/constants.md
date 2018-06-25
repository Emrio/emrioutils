# Constants

> These are some values used by emrioutils



## `STOP`

You may use this in the `forEach()` method from the [Grid Object](grid.md) to stop the execution of the method.

Example: (from [Grid Object](grid.md))

```js
// This will set the value of 1 to the first case that doesn't have the value 0
grid.forEach((value, coords) => {
  if(value !== 0) {
    grid.set(coords, 1)
    return emrioutils.STOP
  }
})
```

## `VERSION`

The current version of your emrioutils copy

Example:
```js
console.log("Currently using version " + emrioutils.VERSIOn + " of emrioutils.")
```
