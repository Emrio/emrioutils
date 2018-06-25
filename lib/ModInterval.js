module.exports = class ModInterval {

  /**  @method
   * @constructor constructor - The ModInterval object constructor
   * @see {@link https://github.com/TheEmrio/emrioutils/blob/master/docs/modinterval.md Emrioutils Docs :: ModInterval Object}
   *
   * @param  {Object}   options           The options for the ModInterval
   * @param  {Number}   options.tickspeed The tickspeed (the function will be run every x milliseconds)
   * @param  {Function} options.function  The function to run
   *
   * @return {Object}                     The modified interval object
   */
  constructor(options) {
    this.tick = options.tickspeed || 1000;
    this.f = options.function || function(){};
  }

  /**
   * @function start - Starts the interval
   */
  start() {
    this.interval = setInterval(this.f, this.tick);
  }

  /**
   * @function clear - Clears the interval
   */
  clear() {
    clearInterval(this.interval);
  }

  /**
   * @function reload - Reloads the interval (reloads function and tickspeed)
   */
  reload() {
    this.clear();
    this.start();
  }

  /**
   * @function setTickspeed - Sets a new tickspeed
   *
   * @param {Number} tickspeed   The new tickspeed
   * @param {Boolean} dontrestart Forces the interval to not reload
   */
  setTickspeed(tickspeed, dontrestart) {
    this.tick = tickspeed || this.tick || 1000;
    if(!dontrestart) this.reload();
  }

  /**
   * @function setFunction - Sets a new function
   *
   * @param {Function} func    The new function
   * @param {Boolean} dontrestart Forces the interval to not reload
   */
  setFunction(func, dontrestart) {
    this.f = func || this.f || {};
    if(!dontrestart) this.reload();
  }

  /**
   * @function setAll - Sets a new function and a tickspeed
   *
   * @param {Function} func        The new function
   * @param {Number}   tickspeed   The new tickspeed
   * @param {Boolean}  dontrestart Forces the interval to not reload
   */
  setAll(func, tickspeed, dontrestart) {
    this.setFunction(func, false);
    this.setTickspeed(tickspeed, false);
    if(!dontrestart) this.reload();
  }

}
