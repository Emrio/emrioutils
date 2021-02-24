/* global describe it */
const assert = require('assert')
const u = require('..')

describe('arr', () => {
  describe('#flatten()', () => {
    it('should flatten an array', () => {
      assert.deepStrictEqual(u.arr.flatten([1, [3, 42], 'string', [true, ['hello', 'world!']]]), [1, 3, 42, 'string', true, 'hello', 'world!'])
    })

    it('should not go to far if it is told otherwise', () => {
      assert(typeof u.arr.flatten([1, [3, 42], 'string', [true, ['hello', 'world!']]], 1)[5] === 'object')
    })
  })

  describe('#last()', () => {
    it('should return last item', () => {
      assert.strictEqual(u.arr.last([1, 2, 3]), 3)
    })

    it('should return before last item', () => {
      assert.strictEqual(u.arr.last([1, 2, 3], 1), 2)
    })
  })

  describe('#nafum()', () => {
    it('should create an array of given length', () => {
      const n = u.randint(5, 100)

      const arr = u.nafum(n, i => (i * 42) + 'yo')

      assert(arr.every((el, i) => el === (i * 42) + 'yo'))

      assert(n === arr.length)
    })
  })

  describe('#partition()', () => {
    it('should partition numbers', () => {
      const arr = u.nafum(u.randint(5, 100), () => u.randint(-100, 100))

      const part = u.partition(arr, (el, i) => {
        if (el === 0) {
          return 'null'
        }

        return el > 0 ? 'positive' : 'negative'
      })

      assert((part.null || []).length + (part.positive || []).length + (part.negative || []).length === arr.length)

      assert((part.null || []).every(el => el === 0))

      assert((part.positive || []).every(el => el > 0))

      assert((part.negative || []).every(el => el < 0))
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

describe('generators', () => {
  describe('#range()', () => {
    it('should give numbers between 0 and n-1', () => {
      const n = u.randint(50, 500)
      let j = 0

      for (const i of u.range(n)) {
        assert(i === j)
        j++
      }

      assert(j === n)
    })

    it('should give numbers between a and b', () => {
      const a = u.randint(-100, 0)
      const b = u.randint(100, 0)

      let j = a

      for (const i of u.range(a, b)) {
        assert(i === j)
        j++
      }

      assert(j === b)
    })

    it('should give numbers between a and b with a step', () => {
      const a = u.randint(-100, 0)
      const b = u.randint(100, 0)
      const step = u.randint(1, 5)

      let j = a

      for (const i of u.range(a, b, step)) {
        assert(i === j)
        j += step
      }

      assert(j <= b)
    })

    it('should work with decreasing steps', () => {
      const a = u.randint(100, 0)
      const b = u.randint(-100, 0)
      const step = -u.randint(1, 5)

      let j = a

      for (const i of u.range(a, b, step)) {
        assert(i === j)
        j += step
      }

      assert(j >= b)
    })
  })

  describe('#enumerate()', () => {
    it('should return indices and array values', () => {
      const arr = ['42', 'hello', true, -7, { a: null }]

      let j = 0

      for (const [i, el] of u.enumerate(arr)) {
        assert(i === j)

        assert(arr[i] === el)

        j++
      }
    })
  })

  describe('#zip()', () => {
    it('should work with a single array', () => {
      const arr = ['42', 'hello', true, -7, { a: null }]

      let j = 0

      for (const [el] of u.zip(arr)) {
        assert(arr[j] === el)

        j++
      }

      assert(j === arr.length)
    })

    it('should work with two arrays', () => {
      const arr1 = ['42', 'hello', true, -7, { a: null }]
      const arr2 = [42, 'world', false, 7, { a: undefined }]

      let j = 0

      for (const [el1, el2] of u.zip(arr1, arr2)) {
        assert(arr1[j] === el1)
        assert(arr2[j] === el2)

        j++
      }

      assert(j === arr1.length)
    })

    it('should work any number of arrays', () => {
      const n = u.randint(10, 100)

      const arrs = new Array(u.randint(5, 20)).fill(undefined).map(() => new Array(n).fill(undefined).map(() => u.randint(-100, 100)))

      let j = 0

      for (const els of u.zip(...arrs)) {
        assert(els.every((el, i) => el === arrs[i][j]))

        j++
      }

      assert(j === arrs[0].length)
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

  describe('#equal()', () => {
    it('should return true when using the same number', () => {
      assert.strictEqual(u.math.equal(42.00000001, 42.00000001), true)
    })

    it('should return true when using the same number (mathematically)', () => {
      assert.strictEqual(u.math.equal(0.1 + 0.2, 0.3), true)
    })

    it('should return false when precision is not met', () => {
      assert.strictEqual(u.math.equal(0.1 + 0.2, 0.3 + 0.0001), false)
    })
  })

  describe('#createLinearTransform()', () => {
    const a = u.rnd.randfloat(0, 42)
    const b = u.rnd.randfloat(a, 84)
    const A = u.rnd.randfloat(100, 142)
    const B = u.rnd.randfloat(A, 1084)

    const tr = u.math.createLinearTransform(a, b, A, B)

    it('should return a function', () => {
      assert(typeof tr === 'function')
    })

    it('should return limit values', () => {
      assert(u.equal(tr(a), A))
      assert(u.equal(tr(b), B))
    })

    it('should return values within range and increasing', () => {
      let last = a

      for (const i of u.range(500)) { /* eslint-disable-line no-unused-vars */
        const x = u.rnd.randfloat(last, b)

        assert(tr(last) <= tr(x) && tr(x) <= B)

        last = x
      }
    })
  })

  describe('#createLinearTransformND()', () => {
    const a = [u.randfloat(0, 42), u.randfloat(0, 42), u.randfloat(0, 42)]
    const b = [u.randfloat(a[0], 84), u.randfloat(a[1], 84), u.randfloat(a[2], 84)]
    const A = [u.randfloat(100, 142), u.randfloat(100, 142), u.randfloat(100, 142)]
    const B = [u.randfloat(A[0], 1084), u.randfloat(A[1], 1084), u.randfloat(A[2], 1084)]

    const tr = u.math.createLinearTransformND(a, b, A, B)

    it('should return a function', () => {
      assert(typeof tr === 'function')
    })

    it('should return limit values', () => {
      assert(u.equal(tr(a)[0], A[0]))
      assert(u.equal(tr(a)[1], A[1]))
      assert(u.equal(tr(a)[2], A[2]))
      assert(u.equal(tr(b)[0], B[0]))
      assert(u.equal(tr(b)[1], B[1]))
      assert(u.equal(tr(b)[2], B[2]))
    })

    it('should return values within range and increasing', () => {
      let last = a

      for (const i of u.range(500)) { /* eslint-disable-line no-unused-vars */
        const x = [u.randfloat(last[0], b[0]), u.randfloat(last[1], b[1]), u.randfloat(last[2], b[2])]

        assert(tr(last)[0] <= tr(x)[0] && (tr(x)[0] <= B[0] || u.equal(tr(x)[0], B[0])))
        assert(tr(last)[1] <= tr(x)[1] && (tr(x)[1] <= B[1] || u.equal(tr(x)[1], B[1])))
        assert(tr(last)[2] <= tr(x)[2] && (tr(x)[2] <= B[2] || u.equal(tr(x)[2], B[2])))

        last = x
      }
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
