/**
 * @file   Some objects and functions
 * @author Emrio || TheEmrio
 * @version 1.0.0
 */

const CONSTS = { STOP: Math.random(), VERSION: "1.0.0" }

// Exporting classes
module.exports.ModInterval = require("./lib/ModInterval")
module.exports.Grid = require("./lib/Grid")
module.exports.Stopwatch = require("./lib/Stopwatch")

// Exporting constants
for (var key in CONSTS) module.exports[key] = CONSTS[key]

// Exporting functions
module.exports.mean = require("./lib/mean")
module.exports.equalArrays = require("./lib/equalArrays")
