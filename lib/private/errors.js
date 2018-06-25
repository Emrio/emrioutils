// Throws a WIP error
module.exports.wip = () => {
  throw new Error("This module is not implemented in this version!")
}

// Throws an unknown error
module.exports.unexpected = () => {
  throw new Error("An unexpected error occured.")
}

// Throws an incorrect error
module.exports.incorrect = () => {
  throw new Error("The provided arguments are incorrect.")
}
