'use strict';
const assert = require('assert');
const _ = require('lodash');

describe('code snippet example', () => {

  it('compact', () => {
    assert.deepEqual(
      _.compact([0, 1, false, 2, '', 3]),
      [0, 1, false, 2, '', 3].filter(v => v)
    )
  })

  it('concat', () => {
    const lodashArray = [1]
    const lodashResult = _.concat(lodashArray, 2, [3], [[4]])

    const nativehArray = [1]
    const nativeResult = nativehArray.concat(2, [3], [[4]])

    assert.deepEqual(lodashResult, nativeResult)
  })

  it('pick', () => {
    var object = { 'a': 1, 'b': '2', 'c': 3 };
    function pick(object, paths) {
      const obj = {};
      for (const path of paths) {
        if (object[path]) {
          obj[path] = object[path]
        }
      }
      return obj;
    }
    assert.deepEqual(
      _.pick(object, ['a', 'c']),
      pick(object, ['a', 'c'])
    )
  })

  it('pickBy', () => {
    var object = { 'a': 1, 'b': null, 'c': 3, 'd': false, 'e': undefined };
    function pickBy(object) {
      const obj = {};
      for (const key in object) {
        if (object[key] !== null && object[key] !== false && object[key] !== undefined) {
          obj[key] = object[key];
        }
      }
      return obj;
    }
    assert.deepEqual(
      _.pickBy(object),
      pickBy(object)
    )
  })

  describe('fill', () => {
    it("_.fill(array, 'a')", () => {
      var array = [1, 2, 3]
      assert.deepEqual(
        _.fill(array, 'a'),
        array.fill('a')
      )
    })
    it("_.fill(Array(3), 2)", () => {
      assert.deepEqual(
        _.fill(Array(3), 2),
        Array(3).fill(2)
      )
    })

    it("_.fill([4, 6, 8, 10], '*', 1, 3)", () => {
      assert.deepEqual(
        _.fill([4, 6, 8, 10], '*', 1, 3),
        [4, 6, 8, 10].fill('*', 1, 3)
      )
    })
  })
  describe('chunk', () => {
    const chunk = (input, size) => {
      return input.reduce((arr, item, idx) => {
        return idx % size === 0
          ? [...arr, [item]]
          : [...arr.slice(0, -1), [...arr.slice(-1)[0], item]];
      }, []);
    };
    it("_.chunk(['a', 'b', 'c', 'd'], 2);", () => {
      assert.deepEqual(
        _.chunk(['a', 'b', 'c', 'd'], 2),
        chunk(['a', 'b', 'c', 'd'], 2)
      )
    })
    it("_.chunk(['a', 'b', 'c', 'd'], 3);", () => {
      assert.deepEqual(
        _.chunk(['a', 'b', 'c', 'd'], 3),
        chunk(['a', 'b', 'c', 'd'], 3)
      )
    })
  })
  describe('times', () => {
    const times = (n, fn = (_, x) => x) => {
      return Array.from(Array(n), fn)
    };
    it("_.times(10);", () => {
      assert.deepEqual(
        _.times(10),
        times(10)
      )
    })
    it("_.times(10, x => x + 1);", () => {
      assert.deepEqual(
        _.times(10, x => x + 1),
        times(10, (_, x) => x + 1)
      )
    })
  })
  describe('assign', () => {
    function Foo() {
      this.c = 3;
    }
    function Bar() {
      this.e = 5;
    }
    Foo.prototype.d = 4;
    Bar.prototype.f = 6;
    const assign = (target, ...sources) => Object.assign(target, ...sources);
    it("_.assign({}, new Foo, new Bar);", () => {
      assert.deepEqual(
        _.assign({}, new Foo, new Bar),
        assign({}, new Foo, new Bar)
      )
    })
    it("_.assign(new Foo, new Bar);", () => {
      assert.deepEqual(
        _.assign(new Foo, new Bar),
        assign(new Foo, new Bar)
      )
    })
  })
  describe('extend', () => {
    function Foo() {
      this.c = 3;
    }
    function Bar() {
      this.e = 5;
    }
    Foo.prototype.d = 4;
    Bar.prototype.f = 6;
    const extend = (target, ...sources) => {
      let source = [];
      sources.forEach(src => {
        source = source.concat([src, Object.getPrototypeOf(src)])
      })
      return Object.assign(target, ...source)
    };

    it("_.extend({}, new Foo, new Bar);", () => {
      assert.deepEqual(
        _.extend({}, new Foo, new Bar),
        extend({}, new Foo, new Bar)
      )
    })
    it("_.extend(new Foo, new Bar);", () => {
      assert.deepEqual(
        _.extend(new Foo, new Bar),
        extend(new Foo, new Bar)
      )
    })
  })
  describe('isEmpty', () => {
    const isEmpty = (obj) => {
      return (obj ? [Object, Array].includes(obj.constructor) && !Object.entries(obj).length : true);
    };
    it ('_.isEmpty(null)', () => {
      assert.equal(
        _.isEmpty(null),
        isEmpty(null)
      )
    })
    it ("_.isEmpty('')", () => {
      assert.equal(
        _.isEmpty(''),
        isEmpty('')
      )
    })
    it ("_.isEmpty({})", () => {
      assert.equal(
        _.isEmpty({}),
        isEmpty({})
      )
    })
    it ("_.isEmpty([])", () => {
      assert.equal(
        _.isEmpty([]),
        isEmpty([])
      )
    })
    it ("_.isEmpty({a: '1'})", () => {
      assert.equal(
        _.isEmpty({a: '1'}),
        isEmpty({a: '1'})
      )
    })
  })
})
