// Throws a WIP error
module.exports.wip = () => {
  throw "This module is not implemented in this version!"
}

// Throws a unknown error
module.exports.unexpected = () => {
  throw "An unexpected error occured"
}
