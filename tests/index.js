/* global describe it */
const assert = require('assert')
const u = require('..')

describe('arr', () => {
  describe('#last()', () => {
    it('should return last item', () => {
      assert.strictEqual(u.arr.last([1, 2, 3]), 3)
    })
    it('should return before last item', () => {
      assert.strictEqual(u.arr.last([1, 2, 3], 1), 2)
    })
  })
})

describe('debug', () => {
  const debug = u.debug('hello', 'world', 'oh')
  it('should have a namespace', () => {
    assert.strictEqual(debug.namespace, 'hello/world/oh')
  })
  it('should be a function', () => {
    assert(debug instanceof Function)
  })
  describe('#error', () => {
    it('should have error and warn functions', () => {
      assert(debug.error instanceof Function)
    })
    it('should use same namespace', () => {
      assert.strictEqual(debug.namespace, debug.error.namespace)
    })
  })
})

describe('fs', () => {
  describe('#fileExists()', () => {
    it('should return false is file does not exist', async () => {
      assert.strictEqual(await u.fs.fileExists('./yoyoyoyoyoyoyoy'), false)
    })
  })
})

describe('math', () => {
  describe('#avg()', () => {
    it('should give the average of integers', () => {
      assert.strictEqual(u.math.avg([1, 2, 3, 10]), 4)
    })
    it('should give the average of numbers', () => {
      assert.strictEqual(u.math.avg([1.1, Math.PI, -3, 0]), (1.1 + Math.PI - 3) / 4)
    })
  })
  describe('#round()', () => {
    it('should round to unit', () => {
      assert.strictEqual(u.math.round(123.4567), 123)
    })
    it('should round up to given decimal', () => {
      assert.strictEqual(u.math.round(123.4567, 2), 123.46)
    })
    it('should round down to given decimal', () => {
      assert.strictEqual(u.math.round(123.4517, 2), 123.45)
    })
  })
})

describe('rnd', () => {
  describe('#randfloat()', () => {
    it('should give a random positive float within range', () => {
      for (var i = 0; i < 10000; i++) {
        assert.strictEqual(u.rnd.randfloat(1, 4) > 1, true)
        assert.strictEqual(u.rnd.randfloat(1, 4) < 4, true)
      }
    })
    it('should give a random float within range', () => {
      for (var i = 0; i < 10000; i++) {
        assert.strictEqual(u.rnd.randfloat(-4, 4) > -4, true)
        assert.strictEqual(u.rnd.randfloat(-4, 4) < 4, true)
      }
    })
  })
  describe('#randhex()', () => {
    it('should give a fixed length hex', () => {
      assert.strictEqual(u.rnd.randhex(16).length, 16 * 2)
    })
    it('should give a random length hex', () => {
      assert.strictEqual(u.rnd.randhex(16, 20).length >= 16 * 2, true)
      assert.strictEqual(u.rnd.randhex(16, 20).length <= 20 * 2, true)
    })
  })
  describe('#randint()', () => {
    it('should give a random positive integer', () => {
      for (var i = 0; i < 10000; i++) {
        assert.strictEqual(u.rnd.randint(0, 40) >= 0, true)
        assert.strictEqual(u.rnd.randint(0, 40) < 40, true)
        assert.strictEqual(u.rnd.randint(0, 40) !== 40, true)
      }
    })
    it('should give a random integer', () => {
      for (var i = 0; i < 10000; i++) {
        assert.strictEqual(u.rnd.randint(-40, 40) >= -40, true)
        assert.strictEqual(u.rnd.randint(-40, 40) < 40, true)
        assert.strictEqual(u.rnd.randint(-40, 40) !== 40, true)
      }
    })
    it('should hit superior limit', () => {
      const arr = []
      for (var i = 0; i < 10000; i++) {
        arr.push(u.rnd.randint(0, 40, true))
      }
      assert.strictEqual(arr.some(e => e === 40), true)
    })
  })
})

describe('str', () => {
  describe('#replaceText()', () => {
    it('should replace first occurences', () => {
      assert.strictEqual(u.str.replaceText('hello {var1} {var2} {varxxx} {yo}', { var1: 'world', var2: 'how are', varxxx: 'you?' }), 'hello world how are you? {yo}')
    })
    it('should replace all occurences', () => {
      assert.strictEqual(u.str.replaceText('hello {var1} {var1} {varxxx} {var1}', { var1: 'world' }, true), 'hello world world {varxxx} world')
    })
  })
  describe('#splice()', () => {
    it('should insert text', () => {
      assert.strictEqual(u.str.splice('hello world!', 6, 0, 'my '), 'hello my world!')
    })
    it('should insert text and remove some', () => {
      assert.strictEqual(u.str.splice('hello world!', 6, 5, 'universe'), 'hello universe!')
    })
  })
})

describe('time', () => {
  describe('#hr2ms()', () => {
    it('should give near instantaneous time', () => {
      const t = u.time.hr2ms(process.hrtime())
      assert.strictEqual(t > 0 && t < 0.1, true)
    })
  })
  describe('#sleep()', async () => {
    const t1 = Date.now()
    await u.time.sleep(200)
    const t2 = Date.now()
    it('should be greater than 200 ms', () => {
      assert.strictEqual(t2 - t1 >= 200, true)
    })
    it('should be less than 210 ms', () => {
      assert.strictEqual(t2 - t1 <= 210, true)
    })
  })
})
