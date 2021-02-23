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

    it('should return true is file does exist', async () => {
      await u.fs.writeFile('./file1', 'helloworld')

      assert.strictEqual(await u.fs.fileExists('./file1'), true)

      await u.fs.unlink('./file1')
    })
  })

  describe('#isDir()', () => {
    it('should return false is file does not exist', async () => {
      assert.strictEqual(await u.fs.isDir('./yoyoyoyoyoyoyoy'), false)
    })

    it('should return false is path is not a directory', async () => {
      await u.fs.writeFile('./file2', 'helloworld')

      assert.strictEqual(await u.fs.isDir('./file2'), false)

      await u.fs.unlink('./file2')
    })

    it('should return false is file is not a directory', async () => {
      await u.fs.mkdir('./dir2')

      assert.strictEqual(await u.fs.isDir('./dir2'), true)

      await u.fs.rmdir('./dir2')
    })
  })

  describe('#voidDir()', async () => {
    it('should void a directory but not delete the directory itself', async () => {
      await u.fs.mkdir('./dir3')
      await u.fs.writeFile('./dir3/file1', 'hello world 1')
      await u.fs.writeFile('./dir3/file2', 'hello world 2')

      await u.fs.voidDir('./dir3')

      assert.strictEqual(await u.fs.fileExists('./dir3/file1'), false)
      assert.strictEqual(await u.fs.fileExists('./dir3/file2'), false)
      assert.strictEqual(await u.fs.fileExists('./dir3'), true)

      await u.fs.rmdir('./dir3')
    })

    it('should void a directory but not delete files in sub-directories', async () => {
      await u.fs.mkdir('./dir4')
      await u.fs.writeFile('./dir4/file1', 'hello world 1')
      await u.fs.mkdir('./dir4/dir1')
      await u.fs.writeFile('./dir4/dir1/file1', 'hello world 4-1')

      await u.fs.voidDir('./dir4', false)

      assert.strictEqual(await u.fs.fileExists('./dir4/file1'), false)
      assert.strictEqual(await u.fs.fileExists('./dir4/dir1/file1'), true)

      await u.fs.rmdir('./dir4', { recursive: true })
    })

    it('should void a directory and its sub-directories but not the directory itself', async () => {
      await u.fs.mkdir('./dir5')
      await u.fs.writeFile('./dir5/file1', 'hello world 1')
      await u.fs.mkdir('./dir5/dir1')
      await u.fs.writeFile('./dir5/dir1/file1', 'hello world 5-1')

      await u.fs.voidDir('./dir5', true)

      assert.strictEqual(await u.fs.fileExists('./dir5/file1'), false)
      assert.strictEqual(await u.fs.fileExists('./dir5/dir1/file1'), false)
      assert.strictEqual(await u.fs.fileExists('./dir5/dir1'), true)

      await u.fs.rmdir('./dir5', { recursive: true })
    })

    it('should delete everything in a directory', async () => {
      await u.fs.mkdir('./dir6')
      await u.fs.writeFile('./dir6/file1', 'hello world 1')
      await u.fs.mkdir('./dir6/dir1')
      await u.fs.writeFile('./dir6/dir1/file1', 'hello world 6-1')

      await u.fs.voidDir('./dir6', true, true)

      assert.strictEqual(await u.fs.fileExists('./dir6/file1'), false)
      assert.strictEqual(await u.fs.fileExists('./dir6/dir1'), false)

      await u.fs.rmdir('./dir6', { recursive: true })
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

describe('misc', () => {
  describe('#fitSize()', () => {
    it('should give a size in bytes', () => {
      const size = u.misc.fitSize(42)
      assert.strictEqual(size.value, 42)
      assert.strictEqual(size.unit, 'bytes')
    })

    it('should give a size in megabytes', () => {
      const size = u.misc.fitSize(42 * 1024 * 1024 + 100 * 1024)
      assert.strictEqual(size.value, 42.1)
      assert.strictEqual(size.unit, 'MB')
    })

    it('should give a size in "gigaoctets"', () => {
      const size = u.misc.fitSize(42 * 1024 * 1024 * 1024, u.misc.defaultSizes.frStorage)
      assert.strictEqual(size.value, 42)
      assert.strictEqual(size.unit, 'Go')
    })
  })

  describe('#getSize()', () => {
    it('should give a size in bytes', () => {
      assert.strictEqual(u.misc.getSize(42), '42 bytes')
    })

    it('should give a size in megabytes', () => {
      assert.strictEqual(u.misc.getSize(42 * 1024 * 1024 + 100 * 1024), '42.1 MB')
    })

    it('should give a size in "gigaoctets"', () => {
      assert.strictEqual(u.misc.getSize(42 * 1024 * 1024 * 1024, u.misc.defaultSizes.frStorage), '42 Go')
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
  describe('#capitalizeFirstLetter()', () => {
    it('should capitalize a latin character', () => {
      assert.strictEqual(u.str.capitalizeFirstLetter('hello'), 'Hello')
    })

    it('should capitalize accentuated characters', () => {
      assert.strictEqual(u.str.capitalizeFirstLetter('éléphant'), 'Éléphant')
    })

    it('should leave empty strings', () => {
      assert.strictEqual(u.str.capitalizeFirstLetter(''), '')
      assert.strictEqual(u.str.capitalizeFirstLetter('  '), '  ')
    })

    it('should not do anything if already capitalized', () => {
      assert.strictEqual(u.str.capitalizeFirstLetter('Hello'), 'Hello')
    })
  })

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
