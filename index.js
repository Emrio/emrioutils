/**
 * @file   Some objects and functions
 * @author Emrio || TheEmrio
 * @version 2.1.0
 * @see {@link https://github.com/TheEmrio/emrioutils/tree/master/docs Emrioutils Docs}
 */

// Exporting classes
module.exports.ModInterval = require("./lib/ModInterval")
module.exports.Grid = require("./lib/Grid")
module.exports.Stopwatch = require("./lib/Stopwatch")

// Exporting constants
for (var key in require('./lib/constants')) module.exports[key] = require('./lib/constants')[key]

// Exporting functions
module.exports.mean = require("./lib/mean")
module.exports.equalArrays = require("./lib/equalArrays")
module.exports.isInt = require("./lib/isInt")
module.exports.isPlainObject = require("./lib/isPlainObject")
module.exports.round = require("./lib/round")
