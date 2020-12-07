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

- **\*** `flatten(arr, depth?)`: Array.flat implementation. Flatten the curve!
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
- `voidDir(dirpath)`: Removes all of a directory's files, the directory should not contain sub directories
- `access`: Same as the fs method but promisified
- `appendFile`: Same as the fs method but promisified
- `readdir`: Same as the fs method but promisified
- `readFile`: Same as the fs method but promisified
- `unlink`: Same as the fs method but promisified

### `math`

- `avg(arr)`: returns the average value in an array of numbers
- `round(x, n)`: rounds a number to the n-th decimal place

### `misc`

- **\*** `fitFileSize(size, customUnits?)`: returns the best filesize unit and the given value in that unit (rounded to 2 decimal places)

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
