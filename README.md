# emrioutils [![npm version][version-img]][npm-package-url] [![license][license-img]][license-url]

[Site][site-url] |
[Changelog][changelog-url] |
[Github][github-url] |
[NPM][npm-package-url]

## Installing

Downloading from NPM

```shell
$ npm i emrioutils --save
```

Then, in JavaScript:

```js
const u = require('emrioutils')
```

or in Typescript/ES6

```ts
import u from 'emrioutils'
```

or

```ts
import u = require('emrioutils')
```

## Available functions

**\***: Untested function

### `arr`

- `flatten(arr, depth?)`: Array.flat implementation. Flatten the curve!
- `last(arr, shift?)`: Returns the length-shift element of the array

### `debug`

Creates a debugger instance

Set the `EMRIOUTILS_LOG_PREFIX` environment variable to give a prefix to all Debugger instances.

Set `EMRIOUTILS_LOG_PATH` to a valid folder in your system in order to dump logs to files.

Usage example:

```ts
const debug = u.debug('process', 'sub-process', 'sub-sub-process')
debug('Hello, world!')
debug.error("Houston, we have a problem!")
```

### `fs`

- `fileExists(filepath)`: Tests if a file exists
- `isDir(dirpath)`: Tests if a path exists and is a directory
- `voidDir(dirpath)`: Removes all of a directory's files, the directory should not contain sub directories
- `access`: Same as the fs method but promisified
- `appendFile`
- `mkdir`
- `readdir`
- `readFile`
- `rmdir`
- `stat`
- `unlink`
- `writeFile`

### `generators`

- `range(a, b?, c?)`: Implementation of Python's built-in `range` function. Can be used in `for...of` loops
- `enumerate(arr)`: Implementation of Python's built-in `enumerate` function. Can be used in `for...of` loops
- `zip(arr1, arr2, ...)`: Implementation of Python's built-in `zip` function. Can be used in `for...of` loops

### `math`

- `avg(arr)`: returns the average value in an array of numbers
- `equal(a, b, precision?)`: tests the quasi-equality between two numbers
- `round(x, n)`: rounds a number to the n-th decimal place
- `createLinearTransform(src1, src2, dst1, dst2)`: returns a function that transforms a number from one range to another number of another range and does so in a linear fashion
- `createLinearTransformND(src1, src2, dst1, dst2)`: same as the first but for multidimensional vectors using arrays of numbers

### `misc`

- `fitSize(size, customUnits?)`: returns the best size unit and the given value in that unit (rounded to 2 decimal places)
- `getSize(size, customUnits?)`: returns a string representing best a raw size value
- `defaultSizes.enStorage`: A list of units used for file storage representation in English (from bytes to exabytes)
- `defaultSizes.frStorage`: A list of units used for file storage representation in French (from octets to exaoctets)
- `defaultSizes.enBandwidth`: A list of units used for bandwidth size representation in English (from bits to exabits)
- `defaultSizes.frBandwidth`: A list of units used for bandwidth size representation in French (from bits to exabits)

### `obj`

- `ExtensibleFunction`: A class for making callable objects
- `makeShallowCopy(dest, src, replace?)`: Copy properties from source object to destination object
- `resolveObjectProperty(obj, path)`: Returns the value of a path in an object

### `rnd`

- `randfloat(a, b)`: Generates a pseudo-random number from a to b (included, excluded)
- `randhex(length)`: Generates a random hexadecimal string
- `randhex(a, b)`: Generates a random hexadecimal string of pseudo-random length
- `randint(a, b, includeB?)`: Generate a pseudo-random integer from a to b

### `str`

- `capitalizeFirstLetter(str)`: Returns the string with the first letter capitalized if possible
- `replaceText(src, table)`: Replaces tokens in the source string by values in the table. Tokens look like `{token}`
- `splice`: Array.splice for strings

### `time`

- **\*** `ddmmyyyy(separation?, date?)`: Returns a string that represent the date
- **\*** `ddmmyyyyhhmm(separation?, date?)`: Returns a string that represent the date
- **\*** `ddmmyyyyhhmmss(separation?, date?)`: Returns a string that represent the date
- `hr2ms(hrtime)`: Converts `process.hrtime()` data to milliseconds
- `sleep(delay)`: Returns a promise that will be resolved after `delay` ms

## Notes

This project is intended for a personal use only.
Future versions may include breaking changes if they fit my needs. Nonetheless feel free to use or fork the project.

Feel free to post some suggestions and/or questions in the [Issues Page][issues-url]

[npm-package-url]: https://www.npmjs.com/package/emrioutils
[license-url]: https://raw.githubusercontent.com/TheEmrio/emrioutils/master/LICENSE
[site-url]: https://emrio.fr/
[github-url]: https://github.com/TheEmrio/emrioutils
[changelog-url]: https://github.com/TheEmrio/emrioutils/blob/master/CHANGELOG.md
[issues-url]: https://github.com/TheEmrio/emrioutils/issues/

[version-img]: https://img.shields.io/npm/v/emrioutils.svg
[license-img]: https://img.shields.io/npm/l/emrioutils.svg
