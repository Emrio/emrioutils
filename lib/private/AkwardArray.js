module.exports = class AkwardArray extends Array {

  constructor(...opt) {
    if(arguments.length > 0) super(...opt)
    else super()

  }

  toArray() {
    return new Array(...this)
  }

}
