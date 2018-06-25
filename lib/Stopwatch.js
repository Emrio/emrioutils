module.exports = class Stopwatch {

  /**  @method
   * @constructor constructor - The constructor of the Stopwatch Object
   * @see {@link https://github.com/TheEmrio/emrioutils/blob/master/docs/stopwatch.md Emrioutils Docs :: Stopwatch Object}
   *
   * @return  The Stopwatch object
   *
   * @example let stopwatch = new emrioutils.Stopwatch()
   */
  constructor() {
    this._timeOnStart = 0
    this._running = false
    this._log = []
  }


  /**  @method
   * start - Starts the stopwatch
   *
   * @example stopwatch.start()
   */
  start() {
    if(!this._running) {
      this._running = true
      this._timeOnStart = Date.now()
    }
  }


  /**  @method
   * stop - Stops the stopwatch. This also pushes the time passed to the time history
   *
   * @return {Object} The stopwatch object
   *
   * @example stopwatch.stop()
   */
  stop() {
    if(this._running) {
      this._running = false
      this._log.push(Date.now() - this._timeOnStart)
    }
    return this
  }


  /**  @method
   * elapsed - The time elapsed between the start() and stop() or the time elapsed since the start()
   *
   * @return {Number}  The elapsed time in milliseconds
   *
   * @example stopwatch.start()
   * @example // time passing...
   * @example stopwatch.stop()
   * @example stopwatch.elapsed() // The elapsed time between start() and stop()
   */
  elapsed() {
    if(!this._running && this._log.length > 0) {
      return this._log[this._log.length-1]
    } else if(this._running) {
      return Date.now() - this._timeOnStart
    }
  }


  /**  @method
   * clearHistory - Clears the time history
   *
   * @return {Object}  The Stopwatch object
   */
  clearHistory() {
    this._log = []
    return this
  }


  /**  @method
   * tour - Pushes the time elapsed since start and restarts the stopwatch
   *
   * @return {Object}  The Stopwatch object
   */
  tour() {
    if(this._running) {
      this.stop()
      this.start()
    }
    return this
  }


  /**  @method
   * historySum - The sum of all the times stored in the time history
   *
   * @return {number}  The total time in milliseconds
   */
  historySum() {
    let total = 0
    for (var i = 0; i < this._log.length; i++) {
      total += this._log[i]
    }
    return total
  }


  /**  @method
   * get history - Returns the time history
   *
   * @return {Array}  The time history
   */
  get history() {
    return this._log
  }

}
