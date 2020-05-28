# CHANGELOG

## **3.1.2**

- Added `u.arr.flatten()`
- Added `u.time.ddmmyyyy()`
- Added `u.time.ddmmyyyyhhmm()`
- Added `u.time.ddmmyyyyhhmmss()`

- Removed `moment` from dependencies
- ES6 syntax `import u from 'emrioutils'` is now supported. `import u = require('emrioutils')` is still available

## **3.1.1**

- Added `u.str.capitalizeFirstLetter()`

## **3.1.0**

- **BREAKING:** Removed `Debugger.warn`

## **3.0.2**

- Using `Object.prototype.hasOwnProperty` instead of `<obj>.hasOwnProperty`

## **3.0.1**

- Code formatting

## **3.0.0**

- Added `u.arr.last()`
- Added `u.debug()`
- Added `u.fs.access()`
- Added `u.fs.appendFile()`
- Added `u.fs.fileExists()`
- Added `u.fs.readdir()`
- Added `u.fs.readFile()`
- Added `u.fs.unlink()`
- Added `u.fs.voidDir()`
- Added `u.math.avg()` (replaces `mean()`)
- Added `u.math.round()` (replaces `round()`)
- Added `u.obj.ExtensibleFunction`
- Added `u.obj.makeShallowCopy()`
- Added `u.obj.resolveObjectProperty()`
- Added `u.rnd.randfloat()`
- Added `u.rnd.randhex()`
- Added `u.rnd.randint()`
- Added `u.str.replaceText()`
- Added `u.str.splice()`
- Added `u.time.hr2ms()`
- Added `u.time.sleep()`
- Removed v2 classes
- Removed v2 functions

## **2.1.0**

### New
+ Added `round` function

## **2.0.0**

### Bug fixes
+ Fixed a bug where `Grid.correctCoords()` would return `false` for coordinates having 0s

### Changes
+ `Grid.generate()` now fills grid with `undefined` instead of empty values
+ Errors can now output more info about what's going wrong
+ `Grid` Object now accepts arrays

### New
+ In `Grid` Object
    + Added `toArray()`
    + Added `every()`
    + Added `some()`
    + Added `slice()`
    + Added `find()`
    + Added `findCoords()`
    + Added `flat()`
    + Added `includes()`
    + Added `coordsOf()`
    + Added `map()`
    + Added `join()`

### Removed
+ In `Grid` Object
    + Removed `array` property



## **1.1.1**

### Bug fixes
+ Fixed a bug where `Grid.correctCoords()` wouldn't block negative values
+ Fixed a bug where `Grid.constructor()` wouldn't allow directly inputing the dimensions array (even if code to do so was present)



## **1.1.0**

### New
+ Added `insInt()` function
+ Added `isPlainObject()` function
+ In `Grid` Object
    + Added `correctCoords()`
    + Added `inRangeCoords()`

### Changes
+ Errors now use `Error` class

### Bug fixes
+ Fixed a bug where `Grid.generate()` would generate passed-by-reference sub-arrays

### Removed
+ Removed `AkwardArray` Object (not in use)



## **1.0.0**

### New
+ Added `Grid` Object
    + Added `generate()`
    + Added `gen()`
    + Added `set()`
    + Added `get()`
    + Added `forEach()`
    + Added `fill()`
    + Added `array`, `dimension`, `size`
+ Added `Stopwatch` Object
    + Added `start()`
    + Added `stop()`
    + Added `elapsed()`
    + Added `clearHistory()`
    + Added `tour()`
    + Added `historySum()`
    + Added `history`
+ Added `ModInterval` Object
    + Added `start()`
    + Added `clear()`
    + Added `reload()`
    + Added `setTickspeed()`, `setFunction()` and `setAll()`
+ Added `AkwardArray` Object (not in use)
+ Added `mean()` function
+ Added `equalArrays()` function

[docs-url]: https://github.com/TheEmrio/emrioutils/blob/master/docs/README.md
