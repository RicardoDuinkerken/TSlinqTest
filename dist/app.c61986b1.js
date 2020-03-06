// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"../node_modules/linq-collections/build/src/Iterators.js":[function(require,module,exports) {
"use strict";
/*
 * Created by Ivan Sanz (@isc30)
 * Copyright © 2017 Ivan Sanz Carasa. All rights reserved.
*/
Object.defineProperty(exports, "__esModule", { value: true });
/* ES6 compatibility layer :D
interface IteratorResult<T>
{
    done: boolean;
    value: T;
}

interface Iterator<T>
{
    next(value?: any): IteratorResult<T>;
    return?(value?: any): IteratorResult<T>;
    throw?(e?: any): IteratorResult<T>;
}*/
var ArrayIterator = /** @class */ (function () {
    function ArrayIterator(source) {
        this.source = source;
        this.reset();
    }
    ArrayIterator.prototype.copy = function () {
        return new ArrayIterator(this.source);
    };
    ArrayIterator.prototype.reset = function () {
        this._index = -1;
    };
    ArrayIterator.prototype.isValidIndex = function () {
        return this._index >= 0 && this._index < this.source.length;
    };
    ArrayIterator.prototype.next = function () {
        ++this._index;
        return this.isValidIndex();
    };
    ArrayIterator.prototype.value = function () {
        if (!this.isValidIndex()) {
            throw new Error("Out of bounds");
        }
        return this.source[this._index];
    };
    return ArrayIterator;
}());
exports.ArrayIterator = ArrayIterator;

},{}],"../node_modules/linq-collections/build/src/Comparers.js":[function(require,module,exports) {
"use strict";
/*
 * Created by Ivan Sanz (@isc30)
 * Copyright © 2017 Ivan Sanz Carasa. All rights reserved.
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.strictEqualityComparer = function () { return function (left, right) { return left === right; }; };
function combineComparers(left, right) {
    return function (l, r) { return left(l, r) || right(l, r); };
}
exports.combineComparers = combineComparers;
function createComparer(keySelector, ascending, customComparer) {
    if (customComparer !== undefined) {
        return function (l, r) { return customComparer(keySelector(l), keySelector(r)); };
    }
    return ascending
        ? function (l, r) {
            var left = keySelector(l);
            var right = keySelector(r);
            return left < right
                ? -1
                : left > right
                    ? 1
                    : 0;
        }
        : function (l, r) {
            var left = keySelector(l);
            var right = keySelector(r);
            return left < right
                ? 1
                : left > right
                    ? -1
                    : 0;
        };
}
exports.createComparer = createComparer;

},{}],"../node_modules/linq-collections/build/src/Collections.js":[function(require,module,exports) {
"use strict";
// -
// Created by Ivan Sanz (@isc30)
// Copyright © 2017 Ivan Sanz Carasa. All rights reserved.
// -
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Enumerables_1 = require("./Enumerables");
var Comparers_1 = require("./Comparers");
// endregion
// region EnumerableCollection
var EnumerableCollection = /** @class */ (function () {
    function EnumerableCollection() {
    }
    EnumerableCollection.prototype.toList = function () {
        return new List(this.toArray());
    };
    EnumerableCollection.prototype.toDictionary = function (keySelector, valueSelector) {
        return Dictionary.fromArray(this.toArray(), keySelector, valueSelector);
    };
    EnumerableCollection.prototype.reverse = function () {
        return new Enumerables_1.ReverseEnumerable(this.asEnumerable());
    };
    EnumerableCollection.prototype.concat = function (other) {
        var others = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            others[_i - 1] = arguments[_i];
        }
        return (_a = this.asEnumerable()).concat.apply(_a, [other].concat(others));
        var _a;
    };
    EnumerableCollection.prototype.contains = function (element) {
        return this.any(function (e) { return e === element; });
    };
    EnumerableCollection.prototype.where = function (predicate) {
        return new Enumerables_1.ConditionalEnumerable(this.asEnumerable(), predicate);
    };
    EnumerableCollection.prototype.select = function (selector) {
        return new Enumerables_1.TransformEnumerable(this.asEnumerable(), selector);
    };
    EnumerableCollection.prototype.selectMany = function (selector) {
        var selectToEnumerable = function (e) {
            var ie = selector(e);
            return ie instanceof Array
                ? new Enumerables_1.ArrayEnumerable(ie)
                : ie.asEnumerable();
        };
        return this
            .select(selectToEnumerable).toArray()
            .reduce(function (p, c) { return new Enumerables_1.ConcatEnumerable(p, c); }, Enumerables_1.Enumerable.empty());
    };
    EnumerableCollection.prototype.elementAt = function (index) {
        var element = this.elementAtOrDefault(index);
        if (element === undefined) {
            throw new Error("Out of bounds");
        }
        return element;
    };
    EnumerableCollection.prototype.except = function (other) {
        return this.asEnumerable().except(other);
    };
    EnumerableCollection.prototype.first = function (predicate) {
        var element;
        if (predicate !== undefined) {
            element = this.firstOrDefault(predicate);
        }
        else {
            element = this.firstOrDefault();
        }
        if (element === undefined) {
            throw new Error("Sequence contains no elements");
        }
        return element;
    };
    EnumerableCollection.prototype.groupBy = function (keySelector, valueSelector) {
        var array = this.toArray();
        var dictionary = new Dictionary();
        for (var i = 0; i < array.length; ++i) {
            var key = keySelector(array[i]);
            var value = valueSelector !== undefined
                ? valueSelector(array[i])
                : array[i];
            if (!dictionary.containsKey(key)) {
                dictionary.set(key, new List());
            }
            dictionary.get(key).push(value);
        }
        return dictionary.asEnumerable();
    };
    EnumerableCollection.prototype.last = function (predicate) {
        var element;
        if (predicate !== undefined) {
            element = this.lastOrDefault(predicate);
        }
        else {
            element = this.lastOrDefault();
        }
        if (element === undefined) {
            throw new Error("Sequence contains no elements");
        }
        return element;
    };
    EnumerableCollection.prototype.single = function (predicate) {
        var element;
        if (predicate !== undefined) {
            element = this.singleOrDefault(predicate);
        }
        else {
            element = this.singleOrDefault();
        }
        if (element === undefined) {
            throw new Error("Sequence contains no elements");
        }
        return element;
    };
    EnumerableCollection.prototype.singleOrDefault = function (predicate) {
        if (predicate !== undefined) {
            return this.asEnumerable().singleOrDefault(predicate);
        }
        return this.asEnumerable().singleOrDefault();
    };
    EnumerableCollection.prototype.skipWhile = function (predicate) {
        return this.asEnumerable().skipWhile(predicate);
    };
    EnumerableCollection.prototype.takeWhile = function (predicate) {
        return this.asEnumerable().takeWhile(predicate);
    };
    EnumerableCollection.prototype.sequenceEqual = function (other, comparer) {
        if (comparer !== undefined) {
            return this.asEnumerable().sequenceEqual(other, comparer);
        }
        return this.asEnumerable().sequenceEqual(other);
    };
    EnumerableCollection.prototype.distinct = function (keySelector) {
        return new Enumerables_1.UniqueEnumerable(this.asEnumerable(), keySelector);
    };
    EnumerableCollection.prototype.min = function (selector) {
        if (selector !== undefined) {
            // Don't copy iterators
            return new Enumerables_1.TransformEnumerable(this.asEnumerable(), selector).min();
        }
        return this.aggregate(function (previous, current) {
            return (previous !== undefined && previous < current)
                ? previous
                : current;
        });
    };
    EnumerableCollection.prototype.orderBy = function (keySelector, comparer) {
        return new Enumerables_1.OrderedEnumerable(this.asEnumerable(), Comparers_1.createComparer(keySelector, true, comparer));
    };
    EnumerableCollection.prototype.orderByDescending = function (keySelector) {
        return new Enumerables_1.OrderedEnumerable(this.asEnumerable(), Comparers_1.createComparer(keySelector, false, undefined));
    };
    EnumerableCollection.prototype.max = function (selector) {
        if (selector !== undefined) {
            // Don't copy iterators
            return new Enumerables_1.TransformEnumerable(this.asEnumerable(), selector).max();
        }
        return this.aggregate(function (previous, current) {
            return (previous !== undefined && previous > current)
                ? previous
                : current;
        });
    };
    EnumerableCollection.prototype.sum = function (selector) {
        return this.aggregate(function (previous, current) { return previous + selector(current); }, 0);
    };
    EnumerableCollection.prototype.skip = function (amount) {
        return new Enumerables_1.RangeEnumerable(this.asEnumerable(), amount, undefined);
    };
    EnumerableCollection.prototype.take = function (amount) {
        return new Enumerables_1.RangeEnumerable(this.asEnumerable(), undefined, amount);
    };
    EnumerableCollection.prototype.union = function (other) {
        return new Enumerables_1.UniqueEnumerable(this.concat(other));
    };
    EnumerableCollection.prototype.aggregate = function (aggregator, initialValue) {
        if (initialValue !== undefined) {
            return this.asEnumerable().aggregate(aggregator, initialValue);
        }
        return this.asEnumerable().aggregate(aggregator);
    };
    EnumerableCollection.prototype.any = function (predicate) {
        if (predicate !== undefined) {
            return this.asEnumerable().any(predicate);
        }
        return this.asEnumerable().any();
    };
    EnumerableCollection.prototype.all = function (predicate) {
        return this.asEnumerable().all(predicate);
    };
    EnumerableCollection.prototype.average = function (selector) {
        return this.asEnumerable().average(selector);
    };
    EnumerableCollection.prototype.count = function (predicate) {
        if (predicate !== undefined) {
            return this.asEnumerable().count(predicate);
        }
        return this.asEnumerable().count();
    };
    EnumerableCollection.prototype.elementAtOrDefault = function (index) {
        return this.asEnumerable().elementAtOrDefault(index);
    };
    EnumerableCollection.prototype.firstOrDefault = function (predicate) {
        if (predicate !== undefined) {
            return this.asEnumerable().firstOrDefault(predicate);
        }
        return this.asEnumerable().firstOrDefault();
    };
    EnumerableCollection.prototype.lastOrDefault = function (predicate) {
        if (predicate !== undefined) {
            return this.asEnumerable().lastOrDefault(predicate);
        }
        return this.asEnumerable().lastOrDefault();
    };
    EnumerableCollection.prototype.forEach = function (action) {
        return this.asEnumerable().forEach(action);
    };
    EnumerableCollection.prototype.defaultIfEmpty = function (defaultValue) {
        if (defaultValue !== undefined) {
            return this.asEnumerable().defaultIfEmpty(defaultValue);
        }
        return this.asEnumerable().defaultIfEmpty();
    };
    EnumerableCollection.prototype.zip = function (other, selector) {
        return this.asEnumerable().zip(other, selector);
    };
    return EnumerableCollection;
}());
exports.EnumerableCollection = EnumerableCollection;
// endregion
// region ArrayQueryable
var ArrayQueryable = /** @class */ (function (_super) {
    __extends(ArrayQueryable, _super);
    function ArrayQueryable(elements) {
        if (elements === void 0) { elements = []; }
        var _this = _super.call(this) || this;
        _this.source = elements;
        return _this;
    }
    ArrayQueryable.prototype.asArray = function () {
        return this.source;
    };
    ArrayQueryable.prototype.toArray = function () {
        return [].concat(this.source);
    };
    ArrayQueryable.prototype.toList = function () {
        return new List(this.toArray());
    };
    ArrayQueryable.prototype.asEnumerable = function () {
        return new Enumerables_1.ArrayEnumerable(this.source);
    };
    ArrayQueryable.prototype.aggregate = function (aggregator, initialValue) {
        if (initialValue !== undefined) {
            return this.source.reduce(aggregator, initialValue);
        }
        return this.source.reduce(aggregator);
    };
    ArrayQueryable.prototype.any = function (predicate) {
        if (predicate !== undefined) {
            return this.source.some(predicate);
        }
        return this.source.length > 0;
    };
    ArrayQueryable.prototype.all = function (predicate) {
        return this.source.every(predicate);
    };
    ArrayQueryable.prototype.average = function (selector) {
        if (this.count() === 0) {
            throw new Error("Sequence contains no elements");
        }
        var sum = 0;
        for (var i = 0, end = this.source.length; i < end; ++i) {
            sum += selector(this.source[i]);
        }
        return sum / this.source.length;
    };
    ArrayQueryable.prototype.count = function (predicate) {
        if (predicate !== undefined) {
            return this.source.filter(predicate).length;
        }
        return this.source.length;
    };
    ArrayQueryable.prototype.elementAtOrDefault = function (index) {
        if (index < 0) {
            throw new Error("Negative index is forbiden");
        }
        return this.source[index];
    };
    ArrayQueryable.prototype.firstOrDefault = function (predicate) {
        if (predicate !== undefined) {
            return this.source.filter(predicate)[0];
        }
        return this.source[0];
    };
    ArrayQueryable.prototype.groupBy = function (keySelector, valueSelector) {
        var array = this.asArray();
        var dictionary = new Dictionary();
        for (var i = 0; i < array.length; ++i) {
            var key = keySelector(array[i]);
            var value = valueSelector !== undefined
                ? valueSelector(array[i])
                : array[i];
            if (!dictionary.containsKey(key)) {
                dictionary.set(key, new List());
            }
            dictionary.get(key).push(value);
        }
        return dictionary.asEnumerable();
    };
    ArrayQueryable.prototype.lastOrDefault = function (predicate) {
        if (predicate !== undefined) {
            var records = this.source.filter(predicate);
            return records[records.length - 1];
        }
        return this.source[this.source.length - 1];
    };
    ArrayQueryable.prototype.forEach = function (action) {
        for (var i = 0, end = this.source.length; i < end; ++i) {
            action(this.source[i], i);
        }
    };
    ArrayQueryable.prototype.sequenceEqual = function (other, comparer) {
        if (comparer === void 0) { comparer = Comparers_1.strictEqualityComparer(); }
        if (other instanceof ArrayQueryable
            || other instanceof Array) {
            var thisArray = this.asArray();
            var otherArray = other instanceof ArrayQueryable
                ? other.asArray()
                : other;
            if (thisArray.length != otherArray.length) {
                return false;
            }
            for (var i = 0; i < thisArray.length; ++i) {
                if (!comparer(thisArray[i], otherArray[i])) {
                    return false;
                }
            }
            return true;
        }
        return this.asEnumerable().sequenceEqual(other, comparer);
    };
    return ArrayQueryable;
}(EnumerableCollection));
exports.ArrayQueryable = ArrayQueryable;
var List = /** @class */ (function (_super) {
    __extends(List, _super);
    function List() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    List.prototype.copy = function () {
        return new List(this.toArray());
    };
    List.prototype.asReadOnly = function () {
        return this;
    };
    List.prototype.clear = function () {
        this.source = [];
    };
    List.prototype.remove = function (element) {
        var newSource = [];
        for (var i = 0, end = this.source.length; i < end; ++i) {
            if (this.source[i] !== element) {
                newSource.push(this.source[i]);
            }
        }
        this.source = newSource;
    };
    List.prototype.removeAt = function (index) {
        if (index < 0 || this.source[index] === undefined) {
            throw new Error("Out of bounds");
        }
        return this.source.splice(index, 1)[0];
    };
    List.prototype.get = function (index) {
        return this.source[index];
    };
    List.prototype.push = function (element) {
        return this.source.push(element);
    };
    List.prototype.pushRange = function (elements) {
        if (!(elements instanceof Array)) {
            elements = elements.toArray();
        }
        return this.source.push.apply(this.source, elements);
    };
    List.prototype.pushFront = function (element) {
        return this.source.unshift(element);
    };
    List.prototype.pop = function () {
        return this.source.pop();
    };
    List.prototype.popFront = function () {
        return this.source.shift();
    };
    List.prototype.set = function (index, element) {
        if (index < 0) {
            throw new Error("Out of bounds");
        }
        this.source[index] = element;
    };
    List.prototype.insert = function (index, element) {
        if (index < 0 || index > this.source.length) {
            throw new Error("Out of bounds");
        }
        this.source.splice(index, 0, element);
    };
    List.prototype.indexOf = function (element) {
        return this.source.indexOf(element);
    };
    return List;
}(ArrayQueryable));
exports.List = List;
var Stack = /** @class */ (function (_super) {
    __extends(Stack, _super);
    function Stack() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Stack.prototype.copy = function () {
        return new Stack(this.toArray());
    };
    Stack.prototype.clear = function () {
        this.source = [];
    };
    Stack.prototype.peek = function () {
        return this.source[this.source.length - 1];
    };
    Stack.prototype.pop = function () {
        return this.source.pop();
    };
    Stack.prototype.push = function (element) {
        return this.source.push(element);
    };
    return Stack;
}(ArrayQueryable));
exports.Stack = Stack;
var Dictionary = /** @class */ (function (_super) {
    __extends(Dictionary, _super);
    function Dictionary(keyValuePairs) {
        var _this = _super.call(this) || this;
        _this.clear();
        if (keyValuePairs !== undefined) {
            for (var i = 0; i < keyValuePairs.length; ++i) {
                var pair = keyValuePairs[i];
                _this.set(pair.key, pair.value);
            }
        }
        return _this;
    }
    Dictionary.fromArray = function (array, keySelector, valueSelector) {
        var keyValuePairs = array.map(function (v) {
            return {
                key: keySelector(v),
                value: valueSelector(v),
            };
        });
        return new Dictionary(keyValuePairs);
    };
    Dictionary.fromJsObject = function (object) {
        var keys = new List(Object.getOwnPropertyNames(object));
        var keyValues = keys.select(function (k) { return ({ key: k, value: object[k] }); });
        return new Dictionary(keyValues.toArray());
    };
    Dictionary.prototype.copy = function () {
        return new Dictionary(this.toArray());
    };
    Dictionary.prototype.asReadOnly = function () {
        return this;
    };
    Dictionary.prototype.asEnumerable = function () {
        return new Enumerables_1.ArrayEnumerable(this.toArray());
    };
    Dictionary.prototype.toArray = function () {
        var _this = this;
        return this.getKeys().select(function (p) {
            return {
                key: p,
                value: _this.dictionary[p],
            };
        }).toArray();
    };
    Dictionary.prototype.clear = function () {
        this.dictionary = {};
    };
    Dictionary.prototype.containsKey = function (key) {
        return this.dictionary.hasOwnProperty(key);
    };
    Dictionary.prototype.containsValue = function (value) {
        var keys = this.getKeysFast();
        for (var i = 0; i < keys.length; ++i) {
            if (this.dictionary[keys[i]] === value) {
                return true;
            }
        }
        return false;
    };
    Dictionary.prototype.getKeys = function () {
        var _this = this;
        var keys = this.getKeysFast();
        return new List(keys.map(function (k) { return _this.keyType === "number"
            ? parseFloat(k)
            : k; }));
    };
    Dictionary.prototype.getKeysFast = function () {
        return Object.getOwnPropertyNames(this.dictionary);
    };
    Dictionary.prototype.getValues = function () {
        var keys = this.getKeysFast();
        var result = new Array(keys.length);
        for (var i = 0; i < keys.length; ++i) {
            result[i] = this.dictionary[keys[i]];
        }
        return new List(result);
    };
    Dictionary.prototype.remove = function (key) {
        if (this.containsKey(key)) {
            delete this.dictionary[key];
        }
    };
    Dictionary.prototype.get = function (key) {
        if (!this.containsKey(key)) {
            throw new Error("Key doesn't exist: " + key);
        }
        return this.dictionary[key];
    };
    Dictionary.prototype.set = function (key, value) {
        if (this.containsKey(key)) {
            throw new Error("Key already exists: " + key);
        }
        this.setOrUpdate(key, value);
    };
    Dictionary.prototype.setOrUpdate = function (key, value) {
        if (this.keyType === undefined) {
            this.keyType = typeof key;
        }
        this.dictionary[key] = value;
    };
    return Dictionary;
}(EnumerableCollection));
exports.Dictionary = Dictionary;
// endregion

},{"./Enumerables":"../node_modules/linq-collections/build/src/Enumerables.js","./Comparers":"../node_modules/linq-collections/build/src/Comparers.js"}],"../node_modules/linq-collections/build/src/Utils.js":[function(require,module,exports) {
"use strict";
/*
 * Created by Ivan Sanz (@isc30)
 * Copyright © 2017 Ivan Sanz Carasa. All rights reserved.
*/
Object.defineProperty(exports, "__esModule", { value: true });
/*export function Lazy<T>(factory: () => T): () => T
{
    let instance: T;
    
    return () => instance !== undefined
        ? instance
        : (instance = factory());
}*/
var Cached = /** @class */ (function () {
    function Cached() {
        this._isValid = false;
    }
    Cached.prototype.invalidate = function () {
        this._isValid = false;
    };
    Cached.prototype.isValid = function () {
        return this._isValid;
    };
    Object.defineProperty(Cached.prototype, "value", {
        get: function () {
            if (!this._isValid) {
                throw new Error("Trying to get value of invalid cache");
            }
            return this._value;
        },
        set: function (value) {
            this._value = value;
            this._isValid = true;
        },
        enumerable: true,
        configurable: true
    });
    return Cached;
}());
exports.Cached = Cached;

},{}],"../node_modules/linq-collections/build/src/Enumerables.js":[function(require,module,exports) {
"use strict";
// -
// Created by Ivan Sanz (@isc30)
// Copyright © 2017 Ivan Sanz Carasa. All rights reserved.
// -
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Iterators_1 = require("./Iterators");
var Comparers_1 = require("./Comparers");
var Collections_1 = require("./Collections");
var Utils_1 = require("./Utils");
// endregion
// region EnumerableBase
var EnumerableBase = /** @class */ (function () {
    function EnumerableBase(source) {
        this.source = source;
    }
    EnumerableBase.prototype.reset = function () {
        this.source.reset();
    };
    EnumerableBase.prototype.next = function () {
        return this.source.next();
    };
    EnumerableBase.prototype.asEnumerable = function () {
        return this;
    };
    EnumerableBase.prototype.toArray = function () {
        var result = [];
        this.reset();
        while (this.next()) {
            result.push(this.value());
        }
        return result;
    };
    EnumerableBase.prototype.toList = function () {
        return new Collections_1.List(this.toArray());
    };
    EnumerableBase.prototype.toDictionary = function (keySelector, valueSelector) {
        return Collections_1.Dictionary.fromArray(this.toArray(), keySelector, valueSelector);
    };
    EnumerableBase.prototype.count = function (predicate) {
        if (predicate !== undefined) {
            // Don't copy iterators
            return new ConditionalEnumerable(this, predicate).count();
        }
        var result = 0;
        this.reset();
        while (this.next()) {
            ++result;
        }
        // tslint:disable-next-line:no-bitwise
        return result >>> 0;
    };
    EnumerableBase.prototype.any = function (predicate) {
        if (predicate !== undefined) {
            // Don't copy iterators
            return new ConditionalEnumerable(this, predicate).any();
        }
        this.reset();
        return this.next();
    };
    EnumerableBase.prototype.all = function (predicate) {
        this.reset();
        while (this.next()) {
            if (!predicate(this.value())) {
                return false;
            }
        }
        return true;
    };
    EnumerableBase.prototype.reverse = function () {
        return new ReverseEnumerable(this.copy());
    };
    EnumerableBase.prototype.contains = function (element) {
        return this.any(function (e) { return e === element; });
    };
    EnumerableBase.prototype.sequenceEqual = function (other, comparer) {
        if (comparer === void 0) { comparer = Comparers_1.strictEqualityComparer(); }
        var otherEnumerable = other instanceof Array
            ? new ArrayEnumerable(other)
            : other.asEnumerable();
        this.reset();
        otherEnumerable.reset();
        while (this.next()) {
            if (!otherEnumerable.next() || !comparer(this.value(), otherEnumerable.value())) {
                return false;
            }
        }
        return !otherEnumerable.next();
    };
    EnumerableBase.prototype.where = function (predicate) {
        return new ConditionalEnumerable(this.copy(), predicate);
    };
    EnumerableBase.prototype.select = function (selector) {
        return new TransformEnumerable(this.copy(), selector);
    };
    EnumerableBase.prototype.selectMany = function (selector) {
        var selectToEnumerable = function (e) {
            var ie = selector(e);
            return Array.isArray(ie)
                ? new ArrayEnumerable(ie)
                : ie.asEnumerable();
        };
        return this
            .select(selectToEnumerable).toArray()
            .reduce(function (p, c) { return new ConcatEnumerable(p, c); }, Enumerable.empty());
    };
    EnumerableBase.prototype.skipWhile = function (predicate) {
        return new SkipWhileEnumerable(this.copy(), predicate);
    };
    EnumerableBase.prototype.concat = function (other) {
        var others = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            others[_i - 1] = arguments[_i];
        }
        var asEnumerable = function (e) {
            return e instanceof Array
                ? new ArrayEnumerable(e)
                : e.asEnumerable();
        };
        var result = new ConcatEnumerable(this.copy(), asEnumerable(other).copy());
        for (var i = 0, end = others.length; i < end; ++i) {
            result = new ConcatEnumerable(result, asEnumerable(others[i]).copy());
        }
        return result;
    };
    EnumerableBase.prototype.defaultIfEmpty = function (defaultValue) {
        return new DefaultIfEmptyEnumerable(this, defaultValue);
    };
    EnumerableBase.prototype.elementAt = function (index) {
        var element = this.elementAtOrDefault(index);
        if (element === undefined) {
            throw new Error("Out of bounds");
        }
        return element;
    };
    EnumerableBase.prototype.elementAtOrDefault = function (index) {
        if (index < 0) {
            throw new Error("Negative index is forbiden");
        }
        this.reset();
        var currentIndex = -1;
        while (this.next()) {
            ++currentIndex;
            if (currentIndex === index) {
                break;
            }
        }
        if (currentIndex !== index) {
            return undefined;
        }
        return this.value();
    };
    EnumerableBase.prototype.except = function (other) {
        return this.where(function (e) { return !other.contains(e); });
    };
    EnumerableBase.prototype.first = function (predicate) {
        var element;
        if (predicate !== undefined) {
            element = this.firstOrDefault(predicate);
        }
        else {
            element = this.firstOrDefault();
        }
        if (element === undefined) {
            throw new Error("Sequence contains no elements");
        }
        return element;
    };
    EnumerableBase.prototype.firstOrDefault = function (predicate) {
        if (predicate !== undefined) {
            // Don't copy iterators
            return new ConditionalEnumerable(this, predicate).firstOrDefault();
        }
        this.reset();
        if (!this.next()) {
            return undefined;
        }
        return this.value();
    };
    EnumerableBase.prototype.forEach = function (action) {
        this.reset();
        for (var i = 0; this.next(); ++i) {
            action(this.value(), i);
        }
    };
    EnumerableBase.prototype.groupBy = function (keySelector, valueSelector) {
        var array = this.toArray();
        var dictionary = new Collections_1.Dictionary();
        for (var i = 0; i < array.length; ++i) {
            var key = keySelector(array[i]);
            var value = valueSelector !== undefined
                ? valueSelector(array[i])
                : array[i];
            if (!dictionary.containsKey(key)) {
                dictionary.set(key, new Collections_1.List());
            }
            dictionary.get(key).push(value);
        }
        return dictionary.asEnumerable();
    };
    EnumerableBase.prototype.last = function (predicate) {
        var element;
        if (predicate !== undefined) {
            element = this.lastOrDefault(predicate);
        }
        else {
            element = this.lastOrDefault();
        }
        if (element === undefined) {
            throw new Error("Sequence contains no elements");
        }
        return element;
    };
    EnumerableBase.prototype.lastOrDefault = function (predicate) {
        if (predicate !== undefined) {
            // Don't copy iterators
            return new ConditionalEnumerable(this, predicate).lastOrDefault();
        }
        var reversed = new ReverseEnumerable(this);
        reversed.reset();
        if (!reversed.next()) {
            return undefined;
        }
        return reversed.value();
    };
    EnumerableBase.prototype.single = function (predicate) {
        var element;
        if (predicate !== undefined) {
            element = this.singleOrDefault(predicate);
        }
        else {
            element = this.singleOrDefault();
        }
        if (element === undefined) {
            throw new Error("Sequence contains no elements");
        }
        return element;
    };
    EnumerableBase.prototype.singleOrDefault = function (predicate) {
        if (predicate !== undefined) {
            // Don't copy iterators
            return new ConditionalEnumerable(this, predicate).singleOrDefault();
        }
        this.reset();
        if (!this.next()) {
            return undefined;
        }
        var element = this.value();
        if (this.next()) {
            throw new Error("Sequence contains more than 1 element");
        }
        return element;
    };
    EnumerableBase.prototype.distinct = function (keySelector) {
        return new UniqueEnumerable(this.copy(), keySelector);
    };
    EnumerableBase.prototype.aggregate = function (aggregator, initialValue) {
        var value = initialValue;
        this.reset();
        if (initialValue === undefined) {
            if (!this.next()) {
                throw new Error("Sequence contains no elements");
            }
            value = aggregator(value, this.value());
        }
        while (this.next()) {
            value = aggregator(value, this.value());
        }
        return value;
    };
    EnumerableBase.prototype.min = function (selector) {
        if (selector !== undefined) {
            // Don't copy iterators
            return new TransformEnumerable(this, selector).min();
        }
        return this.aggregate(function (previous, current) {
            return (previous !== undefined && previous < current)
                ? previous
                : current;
        });
    };
    EnumerableBase.prototype.orderBy = function (keySelector, comparer) {
        return new OrderedEnumerable(this.copy(), Comparers_1.createComparer(keySelector, true, comparer));
    };
    EnumerableBase.prototype.orderByDescending = function (keySelector) {
        return new OrderedEnumerable(this.copy(), Comparers_1.createComparer(keySelector, false, undefined));
    };
    EnumerableBase.prototype.max = function (selector) {
        if (selector !== undefined) {
            // Don't copy iterators
            return new TransformEnumerable(this, selector).max();
        }
        return this.aggregate(function (previous, current) {
            return (previous !== undefined && previous > current)
                ? previous
                : current;
        });
    };
    EnumerableBase.prototype.sum = function (selector) {
        return this.aggregate(function (previous, current) { return previous + selector(current); }, 0);
    };
    EnumerableBase.prototype.average = function (selector) {
        this.reset();
        if (!this.next()) {
            throw new Error("Sequence contains no elements");
        }
        var sum = 0;
        var count = 0;
        do {
            sum += selector(this.value());
            ++count;
        } while (this.next());
        return sum / count;
    };
    EnumerableBase.prototype.skip = function (amount) {
        return new RangeEnumerable(this.copy(), amount, undefined);
    };
    EnumerableBase.prototype.take = function (amount) {
        return new RangeEnumerable(this.copy(), undefined, amount);
    };
    EnumerableBase.prototype.takeWhile = function (predicate) {
        return new TakeWhileEnumerable(this.copy(), predicate);
    };
    EnumerableBase.prototype.union = function (other) {
        return new UniqueEnumerable(this.concat(other));
    };
    EnumerableBase.prototype.zip = function (other, selector) {
        var otherAsEnumerable = other instanceof Array
            ? new ArrayEnumerable(other)
            : other.asEnumerable();
        return new ZippedEnumerable(this, otherAsEnumerable, selector);
    };
    return EnumerableBase;
}());
exports.EnumerableBase = EnumerableBase;
// endregion
// region Enumerable
var Enumerable = /** @class */ (function (_super) {
    __extends(Enumerable, _super);
    function Enumerable(source) {
        var _this = _super.call(this, source) || this;
        _this.currentValue = new Utils_1.Cached();
        return _this;
    }
    Enumerable.fromSource = function (source) {
        if (source instanceof Array) {
            return new ArrayEnumerable(source);
        }
        return new Enumerable(source);
    };
    Enumerable.empty = function () {
        return Enumerable.fromSource([]);
    };
    Enumerable.range = function (start, count, ascending) {
        if (ascending === void 0) { ascending = true; }
        if (count < 0) {
            throw new Error("Count must be >= 0");
        }
        var source = new Array(count);
        if (ascending) {
            // tslint:disable-next-line:curly
            for (var i = 0; i < count; source[i] = start + (i++))
                ;
        }
        else {
            // tslint:disable-next-line:curly
            for (var i = 0; i < count; source[i] = start - (i++))
                ;
        }
        return new ArrayEnumerable(source);
    };
    Enumerable.repeat = function (element, count) {
        if (count < 0) {
            throw new Error("Count must me >= 0");
        }
        var source = new Array(count);
        for (var i = 0; i < count; ++i) {
            source[i] = element;
        }
        return new ArrayEnumerable(source);
    };
    Enumerable.prototype.copy = function () {
        return new Enumerable(this.source.copy());
    };
    Enumerable.prototype.value = function () {
        if (!this.currentValue.isValid()) {
            this.currentValue.value = this.source.value();
        }
        return this.currentValue.value;
    };
    Enumerable.prototype.reset = function () {
        _super.prototype.reset.call(this);
        this.currentValue.invalidate();
    };
    Enumerable.prototype.next = function () {
        this.currentValue.invalidate();
        return _super.prototype.next.call(this);
    };
    return Enumerable;
}(EnumerableBase));
exports.Enumerable = Enumerable;
// endregion
// region ConditionalEnumerable
var ConditionalEnumerable = /** @class */ (function (_super) {
    __extends(ConditionalEnumerable, _super);
    function ConditionalEnumerable(source, predicate) {
        var _this = _super.call(this, source) || this;
        _this._predicate = predicate;
        return _this;
    }
    ConditionalEnumerable.prototype.copy = function () {
        return new ConditionalEnumerable(this.source.copy(), this._predicate);
    };
    ConditionalEnumerable.prototype.next = function () {
        var hasValue;
        do {
            hasValue = _super.prototype.next.call(this);
        } while (hasValue && !this._predicate(this.value()));
        return hasValue;
    };
    return ConditionalEnumerable;
}(Enumerable));
exports.ConditionalEnumerable = ConditionalEnumerable;
// endregion
// region SkipWhileEnumerable
var SkipWhileEnumerable = /** @class */ (function (_super) {
    __extends(SkipWhileEnumerable, _super);
    function SkipWhileEnumerable(source, predicate) {
        var _this = _super.call(this, source) || this;
        _this._predicate = predicate;
        _this._shouldContinueChecking = true;
        return _this;
    }
    SkipWhileEnumerable.prototype.reset = function () {
        _super.prototype.reset.call(this);
        this._shouldContinueChecking = true;
    };
    SkipWhileEnumerable.prototype.copy = function () {
        return new SkipWhileEnumerable(this.source.copy(), this._predicate);
    };
    SkipWhileEnumerable.prototype.next = function () {
        if (!this._shouldContinueChecking) {
            return _super.prototype.next.call(this);
        }
        var hasValue;
        do {
            hasValue = _super.prototype.next.call(this);
        } while (hasValue && this._predicate(this.value()));
        this._shouldContinueChecking = false;
        return hasValue;
    };
    return SkipWhileEnumerable;
}(Enumerable));
exports.SkipWhileEnumerable = SkipWhileEnumerable;
// endregion
// region TakeWhileEnumerable
var TakeWhileEnumerable = /** @class */ (function (_super) {
    __extends(TakeWhileEnumerable, _super);
    function TakeWhileEnumerable(source, predicate) {
        var _this = _super.call(this, source) || this;
        _this._predicate = predicate;
        _this._shouldContinueTaking = true;
        return _this;
    }
    TakeWhileEnumerable.prototype.reset = function () {
        _super.prototype.reset.call(this);
        this._shouldContinueTaking = true;
    };
    TakeWhileEnumerable.prototype.copy = function () {
        return new TakeWhileEnumerable(this.source.copy(), this._predicate);
    };
    TakeWhileEnumerable.prototype.next = function () {
        if (_super.prototype.next.call(this)) {
            if (this._shouldContinueTaking && this._predicate(this.value())) {
                return true;
            }
        }
        this._shouldContinueTaking = false;
        return false;
    };
    return TakeWhileEnumerable;
}(Enumerable));
exports.TakeWhileEnumerable = TakeWhileEnumerable;
// endregion
// region ConcatEnumerable
var ConcatEnumerable = /** @class */ (function (_super) {
    __extends(ConcatEnumerable, _super);
    function ConcatEnumerable(left, right) {
        var _this = _super.call(this, left) || this;
        _this._otherSource = right;
        _this._isFirstSourceFinished = false;
        return _this;
    }
    ConcatEnumerable.prototype.copy = function () {
        return new ConcatEnumerable(this.source.copy(), this._otherSource.copy());
    };
    ConcatEnumerable.prototype.reset = function () {
        this.source.reset();
        this._otherSource.reset();
        this._isFirstSourceFinished = false;
        this.currentValue.invalidate();
    };
    ConcatEnumerable.prototype.next = function () {
        this.currentValue.invalidate();
        var hasValue = !this._isFirstSourceFinished
            ? this.source.next()
            : this._otherSource.next();
        if (!hasValue && !this._isFirstSourceFinished) {
            this._isFirstSourceFinished = true;
            return this.next();
        }
        return hasValue;
    };
    ConcatEnumerable.prototype.value = function () {
        if (!this.currentValue.isValid()) {
            this.currentValue.value = !this._isFirstSourceFinished
                ? this.source.value()
                : this._otherSource.value();
        }
        return this.currentValue.value;
    };
    return ConcatEnumerable;
}(Enumerable));
exports.ConcatEnumerable = ConcatEnumerable;
// endregion
// region UniqueEnumerable
var UniqueEnumerable = /** @class */ (function (_super) {
    __extends(UniqueEnumerable, _super);
    function UniqueEnumerable(source, keySelector) {
        var _this = _super.call(this, source) || this;
        _this._keySelector = keySelector;
        _this._seen = { primitive: { number: {}, string: {}, boolean: {} }, complex: [] };
        return _this;
    }
    UniqueEnumerable.prototype.copy = function () {
        return new UniqueEnumerable(this.source.copy(), this._keySelector);
    };
    UniqueEnumerable.prototype.reset = function () {
        _super.prototype.reset.call(this);
        this._seen = { primitive: { number: {}, string: {}, boolean: {} }, complex: [] };
    };
    UniqueEnumerable.prototype.isUnique = function (element) {
        var key = this._keySelector !== undefined
            ? this._keySelector(element)
            : element;
        var type = typeof key;
        return (type in this._seen.primitive)
            ? this._seen.primitive[type].hasOwnProperty(key)
                ? false
                : this._seen.primitive[type][key] = true
            : this._seen.complex.indexOf(key) !== -1
                ? false
                : this._seen.complex.push(key) > -1;
    };
    UniqueEnumerable.prototype.next = function () {
        var hasValue;
        do {
            hasValue = _super.prototype.next.call(this);
        } while (hasValue && !this.isUnique(this.value()));
        return hasValue;
    };
    return UniqueEnumerable;
}(Enumerable));
exports.UniqueEnumerable = UniqueEnumerable;
// endregion
// region RangeEnumerable
var RangeEnumerable = /** @class */ (function (_super) {
    __extends(RangeEnumerable, _super);
    function RangeEnumerable(source, start, count) {
        var _this = this;
        if ((start !== undefined && start < 0) || (count !== undefined && count < 0)) {
            throw new Error("Incorrect parameters");
        }
        _this = _super.call(this, source) || this;
        _this._start = start;
        _this._count = count;
        _this._currentIndex = -1;
        return _this;
    }
    RangeEnumerable.prototype.copy = function () {
        return new RangeEnumerable(this.source.copy(), this._start, this._count);
    };
    RangeEnumerable.prototype.reset = function () {
        _super.prototype.reset.call(this);
        this._currentIndex = -1;
    };
    RangeEnumerable.prototype.isValidIndex = function () {
        var start = this._start !== undefined ? this._start : 0;
        var end = this._count !== undefined ? start + this._count : undefined;
        return this._currentIndex >= start && (end === undefined || this._currentIndex < end);
    };
    RangeEnumerable.prototype.performSkip = function () {
        var start = this._start !== undefined ? this._start : 0;
        var hasValue = true;
        while (hasValue && this._currentIndex + 1 < start) {
            hasValue = _super.prototype.next.call(this);
            ++this._currentIndex;
        }
        return hasValue;
    };
    RangeEnumerable.prototype.next = function () {
        if (this._currentIndex < 0 && !this.performSkip()) {
            return false;
        }
        ++this._currentIndex;
        return _super.prototype.next.call(this) && this.isValidIndex();
    };
    RangeEnumerable.prototype.value = function () {
        if (!this.isValidIndex()) {
            throw new Error("Out of bounds");
        }
        return _super.prototype.value.call(this);
    };
    return RangeEnumerable;
}(Enumerable));
exports.RangeEnumerable = RangeEnumerable;
// endregion
// region TransformEnumerable
var TransformEnumerable = /** @class */ (function (_super) {
    __extends(TransformEnumerable, _super);
    function TransformEnumerable(source, transform) {
        var _this = _super.call(this, source) || this;
        _this._transform = transform;
        _this._currentValue = new Utils_1.Cached();
        return _this;
    }
    TransformEnumerable.prototype.copy = function () {
        return new TransformEnumerable(this.source.copy(), this._transform);
    };
    TransformEnumerable.prototype.value = function () {
        if (!this._currentValue.isValid()) {
            this._currentValue.value = this._transform(this.source.value());
        }
        return this._currentValue.value;
    };
    TransformEnumerable.prototype.reset = function () {
        _super.prototype.reset.call(this);
        this._currentValue.invalidate();
    };
    TransformEnumerable.prototype.next = function () {
        this._currentValue.invalidate();
        return _super.prototype.next.call(this);
    };
    return TransformEnumerable;
}(EnumerableBase));
exports.TransformEnumerable = TransformEnumerable;
// endregion
// region ReverseEnumerable
var ReverseEnumerable = /** @class */ (function (_super) {
    __extends(ReverseEnumerable, _super);
    function ReverseEnumerable(source) {
        var _this = _super.call(this, source) || this;
        _this._elements = new Utils_1.Cached();
        _this._currentIndex = -1;
        return _this;
    }
    ReverseEnumerable.prototype.copy = function () {
        return new ReverseEnumerable(this.source.copy());
    };
    ReverseEnumerable.prototype.reset = function () {
        this._elements.invalidate();
        this._currentIndex = -1;
    };
    ReverseEnumerable.prototype.isValidIndex = function () {
        return this._currentIndex >= 0
            && this._currentIndex < this._elements.value.length;
    };
    ReverseEnumerable.prototype.all = function (predicate) {
        return this.source.all(predicate);
    };
    ReverseEnumerable.prototype.any = function (predicate) {
        if (predicate !== undefined) {
            return this.source.any(predicate);
        }
        return this.source.any();
    };
    ReverseEnumerable.prototype.average = function (selector) {
        return this.source.average(selector);
    };
    ReverseEnumerable.prototype.count = function (predicate) {
        if (predicate !== undefined) {
            return this.source.count(predicate);
        }
        return this.source.count();
    };
    ReverseEnumerable.prototype.max = function (selector) {
        if (selector !== undefined) {
            return this.source.max(selector);
        }
        return this.source.max();
    };
    ReverseEnumerable.prototype.min = function (selector) {
        if (selector !== undefined) {
            return this.source.min(selector);
        }
        return this.source.min();
    };
    ReverseEnumerable.prototype.reverse = function () {
        return this.source.copy(); // haha so smart
    };
    ReverseEnumerable.prototype.sum = function (selector) {
        return this.source.sum(selector);
    };
    ReverseEnumerable.prototype.next = function () {
        if (!this._elements.isValid()) {
            this._elements.value = this.source.toArray();
        }
        ++this._currentIndex;
        return this.isValidIndex();
    };
    ReverseEnumerable.prototype.value = function () {
        if (!this._elements.isValid() || !this.isValidIndex()) {
            throw new Error("Out of bounds");
        }
        return this._elements.value[(this._elements.value.length - 1) - this._currentIndex];
    };
    return ReverseEnumerable;
}(Enumerable));
exports.ReverseEnumerable = ReverseEnumerable;
// endregion
// region OrderedEnumerable
var OrderedEnumerable = /** @class */ (function (_super) {
    __extends(OrderedEnumerable, _super);
    function OrderedEnumerable(source, comparer) {
        var _this = _super.call(this, source) || this;
        _this._comparer = comparer;
        _this._elements = new Utils_1.Cached();
        _this._currentIndex = -1;
        return _this;
    }
    OrderedEnumerable.prototype.isValidIndex = function () {
        return this._currentIndex >= 0
            && this._currentIndex < this._elements.value.length;
    };
    OrderedEnumerable.prototype.orderBy = function (keySelector, comparer) {
        return new OrderedEnumerable(this.source.copy(), Comparers_1.createComparer(keySelector, true, comparer));
    };
    OrderedEnumerable.prototype.orderByDescending = function (keySelector) {
        return new OrderedEnumerable(this.source.copy(), Comparers_1.createComparer(keySelector, false, undefined));
    };
    OrderedEnumerable.prototype.thenBy = function (keySelector, comparer) {
        return new OrderedEnumerable(this.source.copy(), Comparers_1.combineComparers(this._comparer, Comparers_1.createComparer(keySelector, true, comparer)));
    };
    OrderedEnumerable.prototype.thenByDescending = function (keySelector) {
        return new OrderedEnumerable(this.source.copy(), Comparers_1.combineComparers(this._comparer, Comparers_1.createComparer(keySelector, false, undefined)));
    };
    OrderedEnumerable.prototype.reset = function () {
        this._elements.invalidate();
        this._currentIndex = -1;
    };
    OrderedEnumerable.prototype.copy = function () {
        return new OrderedEnumerable(this.source.copy(), this._comparer);
    };
    OrderedEnumerable.prototype.value = function () {
        if (!this._elements.isValid() || !this.isValidIndex()) {
            throw new Error("Out of bounds");
        }
        return this._elements.value[this._currentIndex];
    };
    OrderedEnumerable.prototype.next = function () {
        if (!this._elements.isValid()) {
            this._elements.value = this.toArray();
        }
        ++this._currentIndex;
        return this.isValidIndex();
    };
    OrderedEnumerable.prototype.toArray = function () {
        // Allocate the array before sorting
        // It's faster than working with anonymous reference
        var result = this.source.toArray();
        return result.sort(this._comparer);
    };
    return OrderedEnumerable;
}(EnumerableBase));
exports.OrderedEnumerable = OrderedEnumerable;
// endregion
// region ArrayEnumerable
var ArrayEnumerable = /** @class */ (function (_super) {
    __extends(ArrayEnumerable, _super);
    function ArrayEnumerable(source) {
        var _this = _super.call(this, new Iterators_1.ArrayIterator(source)) || this;
        _this.list = new Collections_1.List(source);
        return _this;
    }
    ArrayEnumerable.prototype.toArray = function () {
        return this.list.toArray();
    };
    ArrayEnumerable.prototype.aggregate = function (aggregator, initialValue) {
        if (initialValue !== undefined) {
            return this.list.aggregate(aggregator, initialValue);
        }
        return this.list.aggregate(aggregator);
    };
    ArrayEnumerable.prototype.any = function (predicate) {
        if (predicate !== undefined) {
            return this.list.any(predicate);
        }
        return this.list.any();
    };
    ArrayEnumerable.prototype.all = function (predicate) {
        return this.list.all(predicate);
    };
    ArrayEnumerable.prototype.average = function (selector) {
        return this.list.average(selector);
    };
    ArrayEnumerable.prototype.count = function (predicate) {
        if (predicate !== undefined) {
            return this.list.count(predicate);
        }
        return this.list.count();
    };
    ArrayEnumerable.prototype.copy = function () {
        return new ArrayEnumerable(this.list.asArray());
    };
    ArrayEnumerable.prototype.elementAtOrDefault = function (index) {
        return this.list.elementAtOrDefault(index);
    };
    ArrayEnumerable.prototype.firstOrDefault = function (predicate) {
        if (predicate !== undefined) {
            return this.list.firstOrDefault(predicate);
        }
        return this.list.firstOrDefault();
    };
    ArrayEnumerable.prototype.lastOrDefault = function (predicate) {
        if (predicate !== undefined) {
            return this.list.lastOrDefault(predicate);
        }
        return this.list.lastOrDefault();
    };
    return ArrayEnumerable;
}(Enumerable));
exports.ArrayEnumerable = ArrayEnumerable;
// endregion
// region DefaultIfEmptyEnumerable
var DefaultIfEmptyEnumerable = /** @class */ (function (_super) {
    __extends(DefaultIfEmptyEnumerable, _super);
    function DefaultIfEmptyEnumerable(source, defaultValue) {
        var _this = _super.call(this, source) || this;
        _this._mustUseDefaultValue = undefined;
        _this._defaultValue = defaultValue;
        return _this;
    }
    DefaultIfEmptyEnumerable.prototype.copy = function () {
        return new DefaultIfEmptyEnumerable(this.source.copy(), this._defaultValue);
    };
    DefaultIfEmptyEnumerable.prototype.value = function () {
        if (this._mustUseDefaultValue) {
            return this._defaultValue;
        }
        return this.source.value();
    };
    DefaultIfEmptyEnumerable.prototype.next = function () {
        var hasNextElement = _super.prototype.next.call(this);
        // single default element
        this._mustUseDefaultValue = this._mustUseDefaultValue === undefined && !hasNextElement;
        return this._mustUseDefaultValue || hasNextElement;
    };
    DefaultIfEmptyEnumerable.prototype.reset = function () {
        _super.prototype.reset.call(this);
        this._mustUseDefaultValue = undefined;
    };
    return DefaultIfEmptyEnumerable;
}(EnumerableBase));
exports.DefaultIfEmptyEnumerable = DefaultIfEmptyEnumerable;
// endregion
// region ZippedEnumerable
var ZippedEnumerable = /** @class */ (function (_super) {
    __extends(ZippedEnumerable, _super);
    function ZippedEnumerable(source, otherSource, selector) {
        var _this = _super.call(this, source) || this;
        _this._otherSource = otherSource;
        _this._isOneOfTheSourcesFinished = false;
        _this._currentValue = new Utils_1.Cached();
        _this._selector = selector;
        return _this;
    }
    ZippedEnumerable.prototype.copy = function () {
        return new ZippedEnumerable(this.source.copy(), this._otherSource.copy(), this._selector);
    };
    ZippedEnumerable.prototype.value = function () {
        if (!this._currentValue.isValid()) {
            this._currentValue.value = this._selector(this.source.value(), this._otherSource.value());
        }
        return this._currentValue.value;
    };
    ZippedEnumerable.prototype.reset = function () {
        _super.prototype.reset.call(this);
        this._otherSource.reset();
        this._isOneOfTheSourcesFinished = false;
        this._currentValue.invalidate();
    };
    ZippedEnumerable.prototype.next = function () {
        this._currentValue.invalidate();
        if (!this._isOneOfTheSourcesFinished) {
            this._isOneOfTheSourcesFinished = !_super.prototype.next.call(this) || !this._otherSource.next();
        }
        return !this._isOneOfTheSourcesFinished;
    };
    return ZippedEnumerable;
}(EnumerableBase));
exports.ZippedEnumerable = ZippedEnumerable;
// endregion

},{"./Iterators":"../node_modules/linq-collections/build/src/Iterators.js","./Comparers":"../node_modules/linq-collections/build/src/Comparers.js","./Collections":"../node_modules/linq-collections/build/src/Collections.js","./Utils":"../node_modules/linq-collections/build/src/Utils.js"}],"../node_modules/linq-collections/build/src/Linq.js":[function(require,module,exports) {
"use strict";
/*
 * Created by Ivan Sanz (@isc30)
 * Copyright © 2017 Ivan Sanz Carasa. All rights reserved.
*/
Object.defineProperty(exports, "__esModule", { value: true });
var Enumerables_1 = require("./Enumerables");
exports.Enumerable = Enumerables_1.Enumerable;
var Iterators_1 = require("./Iterators");
exports.ArrayIterator = Iterators_1.ArrayIterator;
var Collections_1 = require("./Collections");
exports.List = Collections_1.List;
exports.Dictionary = Collections_1.Dictionary;
exports.Stack = Collections_1.Stack;
var Comparers_1 = require("./Comparers");
exports.strictEqualityComparer = Comparers_1.strictEqualityComparer;

},{"./Enumerables":"../node_modules/linq-collections/build/src/Enumerables.js","./Iterators":"../node_modules/linq-collections/build/src/Iterators.js","./Collections":"../node_modules/linq-collections/build/src/Collections.js","./Comparers":"../node_modules/linq-collections/build/src/Comparers.js"}],"app.ts":[function(require,module,exports) {
"use strict";

var __importStar = this && this.__importStar || function (mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) {
    if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
  }
  result["default"] = mod;
  return result;
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var linq = __importStar(require("linq-collections"));

var test = new linq.List(["c", "b", "a"]);
var result = test.where(function (e) {
  return e !== "c";
}).toList();
console.log(result);
},{"linq-collections":"../node_modules/linq-collections/build/src/Linq.js"}],"../node_modules/parcel/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "64327" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel/src/builtins/hmr-runtime.js","app.ts"], null)
//# sourceMappingURL=/app.c61986b1.js.map