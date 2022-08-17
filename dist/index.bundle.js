/*!
  * Debug UI v1.0.0 (undefined)
  * Copyright 2021-2022 Ivan Mucyo Ngabo
  * Licensed under MIT (https://github.com/ivanmucyongabo/debug-ui/blob/main/LICENSE)
  */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.DebugUI = {}));
})(this, (function (exports) { 'use strict';

    /******************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */

    function __classPrivateFieldGet(receiver, state, kind, f) {
        if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
        return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
    }

    function __classPrivateFieldSet(receiver, state, value, kind, f) {
        if (kind === "m") throw new TypeError("Private method is not writable");
        if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
        return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
    }

    var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

    /**
     * lodash (Custom Build) <https://lodash.com/>
     * Build: `lodash modularize exports="npm" -o ./`
     * Copyright jQuery Foundation and other contributors <https://jquery.org/>
     * Released under MIT license <https://lodash.com/license>
     * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
     * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
     */

    /** Used as the size to enable large array optimizations. */
    var LARGE_ARRAY_SIZE = 200;

    /** Used to stand-in for `undefined` hash values. */
    var HASH_UNDEFINED = '__lodash_hash_undefined__';

    /** Used as references for various `Number` constants. */
    var INFINITY$2 = 1 / 0,
        MAX_SAFE_INTEGER = 9007199254740991;

    /** `Object#toString` result references. */
    var argsTag = '[object Arguments]',
        funcTag = '[object Function]',
        genTag = '[object GeneratorFunction]';

    /**
     * Used to match `RegExp`
     * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
     */
    var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

    /** Used to detect host constructors (Safari). */
    var reIsHostCtor = /^\[object .+?Constructor\]$/;

    /** Detect free variable `global` from Node.js. */
    var freeGlobal$2 = typeof commonjsGlobal == 'object' && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;

    /** Detect free variable `self`. */
    var freeSelf$2 = typeof self == 'object' && self && self.Object === Object && self;

    /** Used as a reference to the global object. */
    var root$2 = freeGlobal$2 || freeSelf$2 || Function('return this')();

    /**
     * A faster alternative to `Function#apply`, this function invokes `func`
     * with the `this` binding of `thisArg` and the arguments of `args`.
     *
     * @private
     * @param {Function} func The function to invoke.
     * @param {*} thisArg The `this` binding of `func`.
     * @param {Array} args The arguments to invoke `func` with.
     * @returns {*} Returns the result of `func`.
     */
    function apply(func, thisArg, args) {
      switch (args.length) {
        case 0: return func.call(thisArg);
        case 1: return func.call(thisArg, args[0]);
        case 2: return func.call(thisArg, args[0], args[1]);
        case 3: return func.call(thisArg, args[0], args[1], args[2]);
      }
      return func.apply(thisArg, args);
    }

    /**
     * A specialized version of `_.includes` for arrays without support for
     * specifying an index to search from.
     *
     * @private
     * @param {Array} [array] The array to inspect.
     * @param {*} target The value to search for.
     * @returns {boolean} Returns `true` if `target` is found, else `false`.
     */
    function arrayIncludes(array, value) {
      var length = array ? array.length : 0;
      return !!length && baseIndexOf(array, value, 0) > -1;
    }

    /**
     * This function is like `arrayIncludes` except that it accepts a comparator.
     *
     * @private
     * @param {Array} [array] The array to inspect.
     * @param {*} target The value to search for.
     * @param {Function} comparator The comparator invoked per element.
     * @returns {boolean} Returns `true` if `target` is found, else `false`.
     */
    function arrayIncludesWith(array, value, comparator) {
      var index = -1,
          length = array ? array.length : 0;

      while (++index < length) {
        if (comparator(value, array[index])) {
          return true;
        }
      }
      return false;
    }

    /**
     * Appends the elements of `values` to `array`.
     *
     * @private
     * @param {Array} array The array to modify.
     * @param {Array} values The values to append.
     * @returns {Array} Returns `array`.
     */
    function arrayPush(array, values) {
      var index = -1,
          length = values.length,
          offset = array.length;

      while (++index < length) {
        array[offset + index] = values[index];
      }
      return array;
    }

    /**
     * The base implementation of `_.findIndex` and `_.findLastIndex` without
     * support for iteratee shorthands.
     *
     * @private
     * @param {Array} array The array to inspect.
     * @param {Function} predicate The function invoked per iteration.
     * @param {number} fromIndex The index to search from.
     * @param {boolean} [fromRight] Specify iterating from right to left.
     * @returns {number} Returns the index of the matched value, else `-1`.
     */
    function baseFindIndex(array, predicate, fromIndex, fromRight) {
      var length = array.length,
          index = fromIndex + (fromRight ? 1 : -1);

      while ((fromRight ? index-- : ++index < length)) {
        if (predicate(array[index], index, array)) {
          return index;
        }
      }
      return -1;
    }

    /**
     * The base implementation of `_.indexOf` without `fromIndex` bounds checks.
     *
     * @private
     * @param {Array} array The array to inspect.
     * @param {*} value The value to search for.
     * @param {number} fromIndex The index to search from.
     * @returns {number} Returns the index of the matched value, else `-1`.
     */
    function baseIndexOf(array, value, fromIndex) {
      if (value !== value) {
        return baseFindIndex(array, baseIsNaN, fromIndex);
      }
      var index = fromIndex - 1,
          length = array.length;

      while (++index < length) {
        if (array[index] === value) {
          return index;
        }
      }
      return -1;
    }

    /**
     * The base implementation of `_.isNaN` without support for number objects.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is `NaN`, else `false`.
     */
    function baseIsNaN(value) {
      return value !== value;
    }

    /**
     * Checks if a cache value for `key` exists.
     *
     * @private
     * @param {Object} cache The cache to query.
     * @param {string} key The key of the entry to check.
     * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
     */
    function cacheHas(cache, key) {
      return cache.has(key);
    }

    /**
     * Gets the value at `key` of `object`.
     *
     * @private
     * @param {Object} [object] The object to query.
     * @param {string} key The key of the property to get.
     * @returns {*} Returns the property value.
     */
    function getValue(object, key) {
      return object == null ? undefined : object[key];
    }

    /**
     * Checks if `value` is a host object in IE < 9.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a host object, else `false`.
     */
    function isHostObject(value) {
      // Many host objects are `Object` objects that can coerce to strings
      // despite having improperly defined `toString` methods.
      var result = false;
      if (value != null && typeof value.toString != 'function') {
        try {
          result = !!(value + '');
        } catch (e) {}
      }
      return result;
    }

    /**
     * Converts `set` to an array of its values.
     *
     * @private
     * @param {Object} set The set to convert.
     * @returns {Array} Returns the values.
     */
    function setToArray(set) {
      var index = -1,
          result = Array(set.size);

      set.forEach(function(value) {
        result[++index] = value;
      });
      return result;
    }

    /** Used for built-in method references. */
    var arrayProto = Array.prototype,
        funcProto = Function.prototype,
        objectProto$2 = Object.prototype;

    /** Used to detect overreaching core-js shims. */
    var coreJsData = root$2['__core-js_shared__'];

    /** Used to detect methods masquerading as native. */
    var maskSrcKey = (function() {
      var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
      return uid ? ('Symbol(src)_1.' + uid) : '';
    }());

    /** Used to resolve the decompiled source of functions. */
    var funcToString = funcProto.toString;

    /** Used to check objects for own properties. */
    var hasOwnProperty = objectProto$2.hasOwnProperty;

    /**
     * Used to resolve the
     * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
     * of values.
     */
    var objectToString$2 = objectProto$2.toString;

    /** Used to detect if a method is native. */
    var reIsNative = RegExp('^' +
      funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
      .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
    );

    /** Built-in value references. */
    var Symbol$2 = root$2.Symbol,
        propertyIsEnumerable = objectProto$2.propertyIsEnumerable,
        splice = arrayProto.splice,
        spreadableSymbol = Symbol$2 ? Symbol$2.isConcatSpreadable : undefined;

    /* Built-in method references for those with the same name as other `lodash` methods. */
    var nativeMax = Math.max;

    /* Built-in method references that are verified to be native. */
    var Map = getNative(root$2, 'Map'),
        Set = getNative(root$2, 'Set'),
        nativeCreate = getNative(Object, 'create');

    /**
     * Creates a hash object.
     *
     * @private
     * @constructor
     * @param {Array} [entries] The key-value pairs to cache.
     */
    function Hash(entries) {
      var index = -1,
          length = entries ? entries.length : 0;

      this.clear();
      while (++index < length) {
        var entry = entries[index];
        this.set(entry[0], entry[1]);
      }
    }

    /**
     * Removes all key-value entries from the hash.
     *
     * @private
     * @name clear
     * @memberOf Hash
     */
    function hashClear() {
      this.__data__ = nativeCreate ? nativeCreate(null) : {};
    }

    /**
     * Removes `key` and its value from the hash.
     *
     * @private
     * @name delete
     * @memberOf Hash
     * @param {Object} hash The hash to modify.
     * @param {string} key The key of the value to remove.
     * @returns {boolean} Returns `true` if the entry was removed, else `false`.
     */
    function hashDelete(key) {
      return this.has(key) && delete this.__data__[key];
    }

    /**
     * Gets the hash value for `key`.
     *
     * @private
     * @name get
     * @memberOf Hash
     * @param {string} key The key of the value to get.
     * @returns {*} Returns the entry value.
     */
    function hashGet(key) {
      var data = this.__data__;
      if (nativeCreate) {
        var result = data[key];
        return result === HASH_UNDEFINED ? undefined : result;
      }
      return hasOwnProperty.call(data, key) ? data[key] : undefined;
    }

    /**
     * Checks if a hash value for `key` exists.
     *
     * @private
     * @name has
     * @memberOf Hash
     * @param {string} key The key of the entry to check.
     * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
     */
    function hashHas(key) {
      var data = this.__data__;
      return nativeCreate ? data[key] !== undefined : hasOwnProperty.call(data, key);
    }

    /**
     * Sets the hash `key` to `value`.
     *
     * @private
     * @name set
     * @memberOf Hash
     * @param {string} key The key of the value to set.
     * @param {*} value The value to set.
     * @returns {Object} Returns the hash instance.
     */
    function hashSet(key, value) {
      var data = this.__data__;
      data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
      return this;
    }

    // Add methods to `Hash`.
    Hash.prototype.clear = hashClear;
    Hash.prototype['delete'] = hashDelete;
    Hash.prototype.get = hashGet;
    Hash.prototype.has = hashHas;
    Hash.prototype.set = hashSet;

    /**
     * Creates an list cache object.
     *
     * @private
     * @constructor
     * @param {Array} [entries] The key-value pairs to cache.
     */
    function ListCache(entries) {
      var index = -1,
          length = entries ? entries.length : 0;

      this.clear();
      while (++index < length) {
        var entry = entries[index];
        this.set(entry[0], entry[1]);
      }
    }

    /**
     * Removes all key-value entries from the list cache.
     *
     * @private
     * @name clear
     * @memberOf ListCache
     */
    function listCacheClear() {
      this.__data__ = [];
    }

    /**
     * Removes `key` and its value from the list cache.
     *
     * @private
     * @name delete
     * @memberOf ListCache
     * @param {string} key The key of the value to remove.
     * @returns {boolean} Returns `true` if the entry was removed, else `false`.
     */
    function listCacheDelete(key) {
      var data = this.__data__,
          index = assocIndexOf(data, key);

      if (index < 0) {
        return false;
      }
      var lastIndex = data.length - 1;
      if (index == lastIndex) {
        data.pop();
      } else {
        splice.call(data, index, 1);
      }
      return true;
    }

    /**
     * Gets the list cache value for `key`.
     *
     * @private
     * @name get
     * @memberOf ListCache
     * @param {string} key The key of the value to get.
     * @returns {*} Returns the entry value.
     */
    function listCacheGet(key) {
      var data = this.__data__,
          index = assocIndexOf(data, key);

      return index < 0 ? undefined : data[index][1];
    }

    /**
     * Checks if a list cache value for `key` exists.
     *
     * @private
     * @name has
     * @memberOf ListCache
     * @param {string} key The key of the entry to check.
     * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
     */
    function listCacheHas(key) {
      return assocIndexOf(this.__data__, key) > -1;
    }

    /**
     * Sets the list cache `key` to `value`.
     *
     * @private
     * @name set
     * @memberOf ListCache
     * @param {string} key The key of the value to set.
     * @param {*} value The value to set.
     * @returns {Object} Returns the list cache instance.
     */
    function listCacheSet(key, value) {
      var data = this.__data__,
          index = assocIndexOf(data, key);

      if (index < 0) {
        data.push([key, value]);
      } else {
        data[index][1] = value;
      }
      return this;
    }

    // Add methods to `ListCache`.
    ListCache.prototype.clear = listCacheClear;
    ListCache.prototype['delete'] = listCacheDelete;
    ListCache.prototype.get = listCacheGet;
    ListCache.prototype.has = listCacheHas;
    ListCache.prototype.set = listCacheSet;

    /**
     * Creates a map cache object to store key-value pairs.
     *
     * @private
     * @constructor
     * @param {Array} [entries] The key-value pairs to cache.
     */
    function MapCache(entries) {
      var index = -1,
          length = entries ? entries.length : 0;

      this.clear();
      while (++index < length) {
        var entry = entries[index];
        this.set(entry[0], entry[1]);
      }
    }

    /**
     * Removes all key-value entries from the map.
     *
     * @private
     * @name clear
     * @memberOf MapCache
     */
    function mapCacheClear() {
      this.__data__ = {
        'hash': new Hash,
        'map': new (Map || ListCache),
        'string': new Hash
      };
    }

    /**
     * Removes `key` and its value from the map.
     *
     * @private
     * @name delete
     * @memberOf MapCache
     * @param {string} key The key of the value to remove.
     * @returns {boolean} Returns `true` if the entry was removed, else `false`.
     */
    function mapCacheDelete(key) {
      return getMapData(this, key)['delete'](key);
    }

    /**
     * Gets the map value for `key`.
     *
     * @private
     * @name get
     * @memberOf MapCache
     * @param {string} key The key of the value to get.
     * @returns {*} Returns the entry value.
     */
    function mapCacheGet(key) {
      return getMapData(this, key).get(key);
    }

    /**
     * Checks if a map value for `key` exists.
     *
     * @private
     * @name has
     * @memberOf MapCache
     * @param {string} key The key of the entry to check.
     * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
     */
    function mapCacheHas(key) {
      return getMapData(this, key).has(key);
    }

    /**
     * Sets the map `key` to `value`.
     *
     * @private
     * @name set
     * @memberOf MapCache
     * @param {string} key The key of the value to set.
     * @param {*} value The value to set.
     * @returns {Object} Returns the map cache instance.
     */
    function mapCacheSet(key, value) {
      getMapData(this, key).set(key, value);
      return this;
    }

    // Add methods to `MapCache`.
    MapCache.prototype.clear = mapCacheClear;
    MapCache.prototype['delete'] = mapCacheDelete;
    MapCache.prototype.get = mapCacheGet;
    MapCache.prototype.has = mapCacheHas;
    MapCache.prototype.set = mapCacheSet;

    /**
     *
     * Creates an array cache object to store unique values.
     *
     * @private
     * @constructor
     * @param {Array} [values] The values to cache.
     */
    function SetCache(values) {
      var index = -1,
          length = values ? values.length : 0;

      this.__data__ = new MapCache;
      while (++index < length) {
        this.add(values[index]);
      }
    }

    /**
     * Adds `value` to the array cache.
     *
     * @private
     * @name add
     * @memberOf SetCache
     * @alias push
     * @param {*} value The value to cache.
     * @returns {Object} Returns the cache instance.
     */
    function setCacheAdd(value) {
      this.__data__.set(value, HASH_UNDEFINED);
      return this;
    }

    /**
     * Checks if `value` is in the array cache.
     *
     * @private
     * @name has
     * @memberOf SetCache
     * @param {*} value The value to search for.
     * @returns {number} Returns `true` if `value` is found, else `false`.
     */
    function setCacheHas(value) {
      return this.__data__.has(value);
    }

    // Add methods to `SetCache`.
    SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
    SetCache.prototype.has = setCacheHas;

    /**
     * Gets the index at which the `key` is found in `array` of key-value pairs.
     *
     * @private
     * @param {Array} array The array to inspect.
     * @param {*} key The key to search for.
     * @returns {number} Returns the index of the matched value, else `-1`.
     */
    function assocIndexOf(array, key) {
      var length = array.length;
      while (length--) {
        if (eq(array[length][0], key)) {
          return length;
        }
      }
      return -1;
    }

    /**
     * The base implementation of `_.flatten` with support for restricting flattening.
     *
     * @private
     * @param {Array} array The array to flatten.
     * @param {number} depth The maximum recursion depth.
     * @param {boolean} [predicate=isFlattenable] The function invoked per iteration.
     * @param {boolean} [isStrict] Restrict to values that pass `predicate` checks.
     * @param {Array} [result=[]] The initial result value.
     * @returns {Array} Returns the new flattened array.
     */
    function baseFlatten(array, depth, predicate, isStrict, result) {
      var index = -1,
          length = array.length;

      predicate || (predicate = isFlattenable);
      result || (result = []);

      while (++index < length) {
        var value = array[index];
        if (depth > 0 && predicate(value)) {
          if (depth > 1) {
            // Recursively flatten arrays (susceptible to call stack limits).
            baseFlatten(value, depth - 1, predicate, isStrict, result);
          } else {
            arrayPush(result, value);
          }
        } else if (!isStrict) {
          result[result.length] = value;
        }
      }
      return result;
    }

    /**
     * The base implementation of `_.isNative` without bad shim checks.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a native function,
     *  else `false`.
     */
    function baseIsNative(value) {
      if (!isObject(value) || isMasked(value)) {
        return false;
      }
      var pattern = (isFunction(value) || isHostObject(value)) ? reIsNative : reIsHostCtor;
      return pattern.test(toSource(value));
    }

    /**
     * The base implementation of `_.rest` which doesn't validate or coerce arguments.
     *
     * @private
     * @param {Function} func The function to apply a rest parameter to.
     * @param {number} [start=func.length-1] The start position of the rest parameter.
     * @returns {Function} Returns the new function.
     */
    function baseRest(func, start) {
      start = nativeMax(start === undefined ? (func.length - 1) : start, 0);
      return function() {
        var args = arguments,
            index = -1,
            length = nativeMax(args.length - start, 0),
            array = Array(length);

        while (++index < length) {
          array[index] = args[start + index];
        }
        index = -1;
        var otherArgs = Array(start + 1);
        while (++index < start) {
          otherArgs[index] = args[index];
        }
        otherArgs[start] = array;
        return apply(func, this, otherArgs);
      };
    }

    /**
     * The base implementation of `_.uniqBy` without support for iteratee shorthands.
     *
     * @private
     * @param {Array} array The array to inspect.
     * @param {Function} [iteratee] The iteratee invoked per element.
     * @param {Function} [comparator] The comparator invoked per element.
     * @returns {Array} Returns the new duplicate free array.
     */
    function baseUniq(array, iteratee, comparator) {
      var index = -1,
          includes = arrayIncludes,
          length = array.length,
          isCommon = true,
          result = [],
          seen = result;

      if (comparator) {
        isCommon = false;
        includes = arrayIncludesWith;
      }
      else if (length >= LARGE_ARRAY_SIZE) {
        var set = iteratee ? null : createSet(array);
        if (set) {
          return setToArray(set);
        }
        isCommon = false;
        includes = cacheHas;
        seen = new SetCache;
      }
      else {
        seen = iteratee ? [] : result;
      }
      outer:
      while (++index < length) {
        var value = array[index],
            computed = iteratee ? iteratee(value) : value;

        value = (comparator || value !== 0) ? value : 0;
        if (isCommon && computed === computed) {
          var seenIndex = seen.length;
          while (seenIndex--) {
            if (seen[seenIndex] === computed) {
              continue outer;
            }
          }
          if (iteratee) {
            seen.push(computed);
          }
          result.push(value);
        }
        else if (!includes(seen, computed, comparator)) {
          if (seen !== result) {
            seen.push(computed);
          }
          result.push(value);
        }
      }
      return result;
    }

    /**
     * Creates a set object of `values`.
     *
     * @private
     * @param {Array} values The values to add to the set.
     * @returns {Object} Returns the new set.
     */
    var createSet = !(Set && (1 / setToArray(new Set([,-0]))[1]) == INFINITY$2) ? noop : function(values) {
      return new Set(values);
    };

    /**
     * Gets the data for `map`.
     *
     * @private
     * @param {Object} map The map to query.
     * @param {string} key The reference key.
     * @returns {*} Returns the map data.
     */
    function getMapData(map, key) {
      var data = map.__data__;
      return isKeyable(key)
        ? data[typeof key == 'string' ? 'string' : 'hash']
        : data.map;
    }

    /**
     * Gets the native function at `key` of `object`.
     *
     * @private
     * @param {Object} object The object to query.
     * @param {string} key The key of the method to get.
     * @returns {*} Returns the function if it's native, else `undefined`.
     */
    function getNative(object, key) {
      var value = getValue(object, key);
      return baseIsNative(value) ? value : undefined;
    }

    /**
     * Checks if `value` is a flattenable `arguments` object or array.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is flattenable, else `false`.
     */
    function isFlattenable(value) {
      return isArray(value) || isArguments(value) ||
        !!(spreadableSymbol && value && value[spreadableSymbol]);
    }

    /**
     * Checks if `value` is suitable for use as unique object key.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
     */
    function isKeyable(value) {
      var type = typeof value;
      return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
        ? (value !== '__proto__')
        : (value === null);
    }

    /**
     * Checks if `func` has its source masked.
     *
     * @private
     * @param {Function} func The function to check.
     * @returns {boolean} Returns `true` if `func` is masked, else `false`.
     */
    function isMasked(func) {
      return !!maskSrcKey && (maskSrcKey in func);
    }

    /**
     * Converts `func` to its source code.
     *
     * @private
     * @param {Function} func The function to process.
     * @returns {string} Returns the source code.
     */
    function toSource(func) {
      if (func != null) {
        try {
          return funcToString.call(func);
        } catch (e) {}
        try {
          return (func + '');
        } catch (e) {}
      }
      return '';
    }

    /**
     * Creates an array of unique values, in order, from all given arrays using
     * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
     * for equality comparisons.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Array
     * @param {...Array} [arrays] The arrays to inspect.
     * @returns {Array} Returns the new array of combined values.
     * @example
     *
     * _.union([2], [1, 2]);
     * // => [2, 1]
     */
    var union = baseRest(function(arrays) {
      return baseUniq(baseFlatten(arrays, 1, isArrayLikeObject, true));
    });

    /**
     * Performs a
     * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
     * comparison between two values to determine if they are equivalent.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to compare.
     * @param {*} other The other value to compare.
     * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
     * @example
     *
     * var object = { 'a': 1 };
     * var other = { 'a': 1 };
     *
     * _.eq(object, object);
     * // => true
     *
     * _.eq(object, other);
     * // => false
     *
     * _.eq('a', 'a');
     * // => true
     *
     * _.eq('a', Object('a'));
     * // => false
     *
     * _.eq(NaN, NaN);
     * // => true
     */
    function eq(value, other) {
      return value === other || (value !== value && other !== other);
    }

    /**
     * Checks if `value` is likely an `arguments` object.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is an `arguments` object,
     *  else `false`.
     * @example
     *
     * _.isArguments(function() { return arguments; }());
     * // => true
     *
     * _.isArguments([1, 2, 3]);
     * // => false
     */
    function isArguments(value) {
      // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
      return isArrayLikeObject(value) && hasOwnProperty.call(value, 'callee') &&
        (!propertyIsEnumerable.call(value, 'callee') || objectToString$2.call(value) == argsTag);
    }

    /**
     * Checks if `value` is classified as an `Array` object.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is an array, else `false`.
     * @example
     *
     * _.isArray([1, 2, 3]);
     * // => true
     *
     * _.isArray(document.body.children);
     * // => false
     *
     * _.isArray('abc');
     * // => false
     *
     * _.isArray(_.noop);
     * // => false
     */
    var isArray = Array.isArray;

    /**
     * Checks if `value` is array-like. A value is considered array-like if it's
     * not a function and has a `value.length` that's an integer greater than or
     * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
     * @example
     *
     * _.isArrayLike([1, 2, 3]);
     * // => true
     *
     * _.isArrayLike(document.body.children);
     * // => true
     *
     * _.isArrayLike('abc');
     * // => true
     *
     * _.isArrayLike(_.noop);
     * // => false
     */
    function isArrayLike(value) {
      return value != null && isLength(value.length) && !isFunction(value);
    }

    /**
     * This method is like `_.isArrayLike` except that it also checks if `value`
     * is an object.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is an array-like object,
     *  else `false`.
     * @example
     *
     * _.isArrayLikeObject([1, 2, 3]);
     * // => true
     *
     * _.isArrayLikeObject(document.body.children);
     * // => true
     *
     * _.isArrayLikeObject('abc');
     * // => false
     *
     * _.isArrayLikeObject(_.noop);
     * // => false
     */
    function isArrayLikeObject(value) {
      return isObjectLike$2(value) && isArrayLike(value);
    }

    /**
     * Checks if `value` is classified as a `Function` object.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a function, else `false`.
     * @example
     *
     * _.isFunction(_);
     * // => true
     *
     * _.isFunction(/abc/);
     * // => false
     */
    function isFunction(value) {
      // The use of `Object#toString` avoids issues with the `typeof` operator
      // in Safari 8-9 which returns 'object' for typed array and other constructors.
      var tag = isObject(value) ? objectToString$2.call(value) : '';
      return tag == funcTag || tag == genTag;
    }

    /**
     * Checks if `value` is a valid array-like length.
     *
     * **Note:** This method is loosely based on
     * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
     * @example
     *
     * _.isLength(3);
     * // => true
     *
     * _.isLength(Number.MIN_VALUE);
     * // => false
     *
     * _.isLength(Infinity);
     * // => false
     *
     * _.isLength('3');
     * // => false
     */
    function isLength(value) {
      return typeof value == 'number' &&
        value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
    }

    /**
     * Checks if `value` is the
     * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
     * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is an object, else `false`.
     * @example
     *
     * _.isObject({});
     * // => true
     *
     * _.isObject([1, 2, 3]);
     * // => true
     *
     * _.isObject(_.noop);
     * // => true
     *
     * _.isObject(null);
     * // => false
     */
    function isObject(value) {
      var type = typeof value;
      return !!value && (type == 'object' || type == 'function');
    }

    /**
     * Checks if `value` is object-like. A value is object-like if it's not `null`
     * and has a `typeof` result of "object".
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
     * @example
     *
     * _.isObjectLike({});
     * // => true
     *
     * _.isObjectLike([1, 2, 3]);
     * // => true
     *
     * _.isObjectLike(_.noop);
     * // => false
     *
     * _.isObjectLike(null);
     * // => false
     */
    function isObjectLike$2(value) {
      return !!value && typeof value == 'object';
    }

    /**
     * This method returns `undefined`.
     *
     * @static
     * @memberOf _
     * @since 2.3.0
     * @category Util
     * @example
     *
     * _.times(2, _.noop);
     * // => [undefined, undefined]
     */
    function noop() {
      // No operation performed.
    }

    var lodash_union = union;

    /**
     * lodash (Custom Build) <https://lodash.com/>
     * Build: `lodash modularize exports="npm" -o ./`
     * Copyright jQuery Foundation and other contributors <https://jquery.org/>
     * Released under MIT license <https://lodash.com/license>
     * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
     * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
     */

    /** Used as references for various `Number` constants. */
    var INFINITY$1 = 1 / 0;

    /** `Object#toString` result references. */
    var symbolTag$1 = '[object Symbol]';

    /** Used to match words composed of alphanumeric characters. */
    var reAsciiWord = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g;

    /** Used to match Latin Unicode letters (excluding mathematical operators). */
    var reLatin = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g;

    /** Used to compose unicode character classes. */
    var rsAstralRange = '\\ud800-\\udfff',
        rsComboMarksRange = '\\u0300-\\u036f\\ufe20-\\ufe23',
        rsComboSymbolsRange = '\\u20d0-\\u20f0',
        rsDingbatRange = '\\u2700-\\u27bf',
        rsLowerRange = 'a-z\\xdf-\\xf6\\xf8-\\xff',
        rsMathOpRange = '\\xac\\xb1\\xd7\\xf7',
        rsNonCharRange = '\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf',
        rsPunctuationRange = '\\u2000-\\u206f',
        rsSpaceRange = ' \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000',
        rsUpperRange = 'A-Z\\xc0-\\xd6\\xd8-\\xde',
        rsVarRange = '\\ufe0e\\ufe0f',
        rsBreakRange = rsMathOpRange + rsNonCharRange + rsPunctuationRange + rsSpaceRange;

    /** Used to compose unicode capture groups. */
    var rsApos = "['\u2019]",
        rsAstral = '[' + rsAstralRange + ']',
        rsBreak = '[' + rsBreakRange + ']',
        rsCombo = '[' + rsComboMarksRange + rsComboSymbolsRange + ']',
        rsDigits = '\\d+',
        rsDingbat = '[' + rsDingbatRange + ']',
        rsLower = '[' + rsLowerRange + ']',
        rsMisc = '[^' + rsAstralRange + rsBreakRange + rsDigits + rsDingbatRange + rsLowerRange + rsUpperRange + ']',
        rsFitz = '\\ud83c[\\udffb-\\udfff]',
        rsModifier = '(?:' + rsCombo + '|' + rsFitz + ')',
        rsNonAstral = '[^' + rsAstralRange + ']',
        rsRegional = '(?:\\ud83c[\\udde6-\\uddff]){2}',
        rsSurrPair = '[\\ud800-\\udbff][\\udc00-\\udfff]',
        rsUpper = '[' + rsUpperRange + ']',
        rsZWJ = '\\u200d';

    /** Used to compose unicode regexes. */
    var rsLowerMisc = '(?:' + rsLower + '|' + rsMisc + ')',
        rsUpperMisc = '(?:' + rsUpper + '|' + rsMisc + ')',
        rsOptLowerContr = '(?:' + rsApos + '(?:d|ll|m|re|s|t|ve))?',
        rsOptUpperContr = '(?:' + rsApos + '(?:D|LL|M|RE|S|T|VE))?',
        reOptMod = rsModifier + '?',
        rsOptVar = '[' + rsVarRange + ']?',
        rsOptJoin = '(?:' + rsZWJ + '(?:' + [rsNonAstral, rsRegional, rsSurrPair].join('|') + ')' + rsOptVar + reOptMod + ')*',
        rsSeq = rsOptVar + reOptMod + rsOptJoin,
        rsEmoji = '(?:' + [rsDingbat, rsRegional, rsSurrPair].join('|') + ')' + rsSeq,
        rsSymbol = '(?:' + [rsNonAstral + rsCombo + '?', rsCombo, rsRegional, rsSurrPair, rsAstral].join('|') + ')';

    /** Used to match apostrophes. */
    var reApos = RegExp(rsApos, 'g');

    /**
     * Used to match [combining diacritical marks](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks) and
     * [combining diacritical marks for symbols](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks_for_Symbols).
     */
    var reComboMark = RegExp(rsCombo, 'g');

    /** Used to match [string symbols](https://mathiasbynens.be/notes/javascript-unicode). */
    var reUnicode = RegExp(rsFitz + '(?=' + rsFitz + ')|' + rsSymbol + rsSeq, 'g');

    /** Used to match complex or compound words. */
    var reUnicodeWord = RegExp([
      rsUpper + '?' + rsLower + '+' + rsOptLowerContr + '(?=' + [rsBreak, rsUpper, '$'].join('|') + ')',
      rsUpperMisc + '+' + rsOptUpperContr + '(?=' + [rsBreak, rsUpper + rsLowerMisc, '$'].join('|') + ')',
      rsUpper + '?' + rsLowerMisc + '+' + rsOptLowerContr,
      rsUpper + '+' + rsOptUpperContr,
      rsDigits,
      rsEmoji
    ].join('|'), 'g');

    /** Used to detect strings with [zero-width joiners or code points from the astral planes](http://eev.ee/blog/2015/09/12/dark-corners-of-unicode/). */
    var reHasUnicode = RegExp('[' + rsZWJ + rsAstralRange  + rsComboMarksRange + rsComboSymbolsRange + rsVarRange + ']');

    /** Used to detect strings that need a more robust regexp to match words. */
    var reHasUnicodeWord = /[a-z][A-Z]|[A-Z]{2,}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/;

    /** Used to map Latin Unicode letters to basic Latin letters. */
    var deburredLetters = {
      // Latin-1 Supplement block.
      '\xc0': 'A',  '\xc1': 'A', '\xc2': 'A', '\xc3': 'A', '\xc4': 'A', '\xc5': 'A',
      '\xe0': 'a',  '\xe1': 'a', '\xe2': 'a', '\xe3': 'a', '\xe4': 'a', '\xe5': 'a',
      '\xc7': 'C',  '\xe7': 'c',
      '\xd0': 'D',  '\xf0': 'd',
      '\xc8': 'E',  '\xc9': 'E', '\xca': 'E', '\xcb': 'E',
      '\xe8': 'e',  '\xe9': 'e', '\xea': 'e', '\xeb': 'e',
      '\xcc': 'I',  '\xcd': 'I', '\xce': 'I', '\xcf': 'I',
      '\xec': 'i',  '\xed': 'i', '\xee': 'i', '\xef': 'i',
      '\xd1': 'N',  '\xf1': 'n',
      '\xd2': 'O',  '\xd3': 'O', '\xd4': 'O', '\xd5': 'O', '\xd6': 'O', '\xd8': 'O',
      '\xf2': 'o',  '\xf3': 'o', '\xf4': 'o', '\xf5': 'o', '\xf6': 'o', '\xf8': 'o',
      '\xd9': 'U',  '\xda': 'U', '\xdb': 'U', '\xdc': 'U',
      '\xf9': 'u',  '\xfa': 'u', '\xfb': 'u', '\xfc': 'u',
      '\xdd': 'Y',  '\xfd': 'y', '\xff': 'y',
      '\xc6': 'Ae', '\xe6': 'ae',
      '\xde': 'Th', '\xfe': 'th',
      '\xdf': 'ss',
      // Latin Extended-A block.
      '\u0100': 'A',  '\u0102': 'A', '\u0104': 'A',
      '\u0101': 'a',  '\u0103': 'a', '\u0105': 'a',
      '\u0106': 'C',  '\u0108': 'C', '\u010a': 'C', '\u010c': 'C',
      '\u0107': 'c',  '\u0109': 'c', '\u010b': 'c', '\u010d': 'c',
      '\u010e': 'D',  '\u0110': 'D', '\u010f': 'd', '\u0111': 'd',
      '\u0112': 'E',  '\u0114': 'E', '\u0116': 'E', '\u0118': 'E', '\u011a': 'E',
      '\u0113': 'e',  '\u0115': 'e', '\u0117': 'e', '\u0119': 'e', '\u011b': 'e',
      '\u011c': 'G',  '\u011e': 'G', '\u0120': 'G', '\u0122': 'G',
      '\u011d': 'g',  '\u011f': 'g', '\u0121': 'g', '\u0123': 'g',
      '\u0124': 'H',  '\u0126': 'H', '\u0125': 'h', '\u0127': 'h',
      '\u0128': 'I',  '\u012a': 'I', '\u012c': 'I', '\u012e': 'I', '\u0130': 'I',
      '\u0129': 'i',  '\u012b': 'i', '\u012d': 'i', '\u012f': 'i', '\u0131': 'i',
      '\u0134': 'J',  '\u0135': 'j',
      '\u0136': 'K',  '\u0137': 'k', '\u0138': 'k',
      '\u0139': 'L',  '\u013b': 'L', '\u013d': 'L', '\u013f': 'L', '\u0141': 'L',
      '\u013a': 'l',  '\u013c': 'l', '\u013e': 'l', '\u0140': 'l', '\u0142': 'l',
      '\u0143': 'N',  '\u0145': 'N', '\u0147': 'N', '\u014a': 'N',
      '\u0144': 'n',  '\u0146': 'n', '\u0148': 'n', '\u014b': 'n',
      '\u014c': 'O',  '\u014e': 'O', '\u0150': 'O',
      '\u014d': 'o',  '\u014f': 'o', '\u0151': 'o',
      '\u0154': 'R',  '\u0156': 'R', '\u0158': 'R',
      '\u0155': 'r',  '\u0157': 'r', '\u0159': 'r',
      '\u015a': 'S',  '\u015c': 'S', '\u015e': 'S', '\u0160': 'S',
      '\u015b': 's',  '\u015d': 's', '\u015f': 's', '\u0161': 's',
      '\u0162': 'T',  '\u0164': 'T', '\u0166': 'T',
      '\u0163': 't',  '\u0165': 't', '\u0167': 't',
      '\u0168': 'U',  '\u016a': 'U', '\u016c': 'U', '\u016e': 'U', '\u0170': 'U', '\u0172': 'U',
      '\u0169': 'u',  '\u016b': 'u', '\u016d': 'u', '\u016f': 'u', '\u0171': 'u', '\u0173': 'u',
      '\u0174': 'W',  '\u0175': 'w',
      '\u0176': 'Y',  '\u0177': 'y', '\u0178': 'Y',
      '\u0179': 'Z',  '\u017b': 'Z', '\u017d': 'Z',
      '\u017a': 'z',  '\u017c': 'z', '\u017e': 'z',
      '\u0132': 'IJ', '\u0133': 'ij',
      '\u0152': 'Oe', '\u0153': 'oe',
      '\u0149': "'n", '\u017f': 'ss'
    };

    /** Detect free variable `global` from Node.js. */
    var freeGlobal$1 = typeof commonjsGlobal == 'object' && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;

    /** Detect free variable `self`. */
    var freeSelf$1 = typeof self == 'object' && self && self.Object === Object && self;

    /** Used as a reference to the global object. */
    var root$1 = freeGlobal$1 || freeSelf$1 || Function('return this')();

    /**
     * A specialized version of `_.reduce` for arrays without support for
     * iteratee shorthands.
     *
     * @private
     * @param {Array} [array] The array to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @param {*} [accumulator] The initial value.
     * @param {boolean} [initAccum] Specify using the first element of `array` as
     *  the initial value.
     * @returns {*} Returns the accumulated value.
     */
    function arrayReduce(array, iteratee, accumulator, initAccum) {
      var index = -1,
          length = array ? array.length : 0;

      if (initAccum && length) {
        accumulator = array[++index];
      }
      while (++index < length) {
        accumulator = iteratee(accumulator, array[index], index, array);
      }
      return accumulator;
    }

    /**
     * Converts an ASCII `string` to an array.
     *
     * @private
     * @param {string} string The string to convert.
     * @returns {Array} Returns the converted array.
     */
    function asciiToArray(string) {
      return string.split('');
    }

    /**
     * Splits an ASCII `string` into an array of its words.
     *
     * @private
     * @param {string} The string to inspect.
     * @returns {Array} Returns the words of `string`.
     */
    function asciiWords(string) {
      return string.match(reAsciiWord) || [];
    }

    /**
     * The base implementation of `_.propertyOf` without support for deep paths.
     *
     * @private
     * @param {Object} object The object to query.
     * @returns {Function} Returns the new accessor function.
     */
    function basePropertyOf(object) {
      return function(key) {
        return object == null ? undefined : object[key];
      };
    }

    /**
     * Used by `_.deburr` to convert Latin-1 Supplement and Latin Extended-A
     * letters to basic Latin letters.
     *
     * @private
     * @param {string} letter The matched letter to deburr.
     * @returns {string} Returns the deburred letter.
     */
    var deburrLetter = basePropertyOf(deburredLetters);

    /**
     * Checks if `string` contains Unicode symbols.
     *
     * @private
     * @param {string} string The string to inspect.
     * @returns {boolean} Returns `true` if a symbol is found, else `false`.
     */
    function hasUnicode(string) {
      return reHasUnicode.test(string);
    }

    /**
     * Checks if `string` contains a word composed of Unicode symbols.
     *
     * @private
     * @param {string} string The string to inspect.
     * @returns {boolean} Returns `true` if a word is found, else `false`.
     */
    function hasUnicodeWord(string) {
      return reHasUnicodeWord.test(string);
    }

    /**
     * Converts `string` to an array.
     *
     * @private
     * @param {string} string The string to convert.
     * @returns {Array} Returns the converted array.
     */
    function stringToArray(string) {
      return hasUnicode(string)
        ? unicodeToArray(string)
        : asciiToArray(string);
    }

    /**
     * Converts a Unicode `string` to an array.
     *
     * @private
     * @param {string} string The string to convert.
     * @returns {Array} Returns the converted array.
     */
    function unicodeToArray(string) {
      return string.match(reUnicode) || [];
    }

    /**
     * Splits a Unicode `string` into an array of its words.
     *
     * @private
     * @param {string} The string to inspect.
     * @returns {Array} Returns the words of `string`.
     */
    function unicodeWords(string) {
      return string.match(reUnicodeWord) || [];
    }

    /** Used for built-in method references. */
    var objectProto$1 = Object.prototype;

    /**
     * Used to resolve the
     * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
     * of values.
     */
    var objectToString$1 = objectProto$1.toString;

    /** Built-in value references. */
    var Symbol$1 = root$1.Symbol;

    /** Used to convert symbols to primitives and strings. */
    var symbolProto$1 = Symbol$1 ? Symbol$1.prototype : undefined,
        symbolToString$1 = symbolProto$1 ? symbolProto$1.toString : undefined;

    /**
     * The base implementation of `_.slice` without an iteratee call guard.
     *
     * @private
     * @param {Array} array The array to slice.
     * @param {number} [start=0] The start position.
     * @param {number} [end=array.length] The end position.
     * @returns {Array} Returns the slice of `array`.
     */
    function baseSlice(array, start, end) {
      var index = -1,
          length = array.length;

      if (start < 0) {
        start = -start > length ? 0 : (length + start);
      }
      end = end > length ? length : end;
      if (end < 0) {
        end += length;
      }
      length = start > end ? 0 : ((end - start) >>> 0);
      start >>>= 0;

      var result = Array(length);
      while (++index < length) {
        result[index] = array[index + start];
      }
      return result;
    }

    /**
     * The base implementation of `_.toString` which doesn't convert nullish
     * values to empty strings.
     *
     * @private
     * @param {*} value The value to process.
     * @returns {string} Returns the string.
     */
    function baseToString$1(value) {
      // Exit early for strings to avoid a performance hit in some environments.
      if (typeof value == 'string') {
        return value;
      }
      if (isSymbol$1(value)) {
        return symbolToString$1 ? symbolToString$1.call(value) : '';
      }
      var result = (value + '');
      return (result == '0' && (1 / value) == -INFINITY$1) ? '-0' : result;
    }

    /**
     * Casts `array` to a slice if it's needed.
     *
     * @private
     * @param {Array} array The array to inspect.
     * @param {number} start The start position.
     * @param {number} [end=array.length] The end position.
     * @returns {Array} Returns the cast slice.
     */
    function castSlice(array, start, end) {
      var length = array.length;
      end = end === undefined ? length : end;
      return (!start && end >= length) ? array : baseSlice(array, start, end);
    }

    /**
     * Creates a function like `_.lowerFirst`.
     *
     * @private
     * @param {string} methodName The name of the `String` case method to use.
     * @returns {Function} Returns the new case function.
     */
    function createCaseFirst(methodName) {
      return function(string) {
        string = toString$1(string);

        var strSymbols = hasUnicode(string)
          ? stringToArray(string)
          : undefined;

        var chr = strSymbols
          ? strSymbols[0]
          : string.charAt(0);

        var trailing = strSymbols
          ? castSlice(strSymbols, 1).join('')
          : string.slice(1);

        return chr[methodName]() + trailing;
      };
    }

    /**
     * Creates a function like `_.camelCase`.
     *
     * @private
     * @param {Function} callback The function to combine each word.
     * @returns {Function} Returns the new compounder function.
     */
    function createCompounder(callback) {
      return function(string) {
        return arrayReduce(words(deburr(string).replace(reApos, '')), callback, '');
      };
    }

    /**
     * Checks if `value` is object-like. A value is object-like if it's not `null`
     * and has a `typeof` result of "object".
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
     * @example
     *
     * _.isObjectLike({});
     * // => true
     *
     * _.isObjectLike([1, 2, 3]);
     * // => true
     *
     * _.isObjectLike(_.noop);
     * // => false
     *
     * _.isObjectLike(null);
     * // => false
     */
    function isObjectLike$1(value) {
      return !!value && typeof value == 'object';
    }

    /**
     * Checks if `value` is classified as a `Symbol` primitive or object.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
     * @example
     *
     * _.isSymbol(Symbol.iterator);
     * // => true
     *
     * _.isSymbol('abc');
     * // => false
     */
    function isSymbol$1(value) {
      return typeof value == 'symbol' ||
        (isObjectLike$1(value) && objectToString$1.call(value) == symbolTag$1);
    }

    /**
     * Converts `value` to a string. An empty string is returned for `null`
     * and `undefined` values. The sign of `-0` is preserved.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to process.
     * @returns {string} Returns the string.
     * @example
     *
     * _.toString(null);
     * // => ''
     *
     * _.toString(-0);
     * // => '-0'
     *
     * _.toString([1, 2, 3]);
     * // => '1,2,3'
     */
    function toString$1(value) {
      return value == null ? '' : baseToString$1(value);
    }

    /**
     * Converts `string` to [camel case](https://en.wikipedia.org/wiki/CamelCase).
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category String
     * @param {string} [string=''] The string to convert.
     * @returns {string} Returns the camel cased string.
     * @example
     *
     * _.camelCase('Foo Bar');
     * // => 'fooBar'
     *
     * _.camelCase('--foo-bar--');
     * // => 'fooBar'
     *
     * _.camelCase('__FOO_BAR__');
     * // => 'fooBar'
     */
    var camelCase = createCompounder(function(result, word, index) {
      word = word.toLowerCase();
      return result + (index ? capitalize(word) : word);
    });

    /**
     * Converts the first character of `string` to upper case and the remaining
     * to lower case.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category String
     * @param {string} [string=''] The string to capitalize.
     * @returns {string} Returns the capitalized string.
     * @example
     *
     * _.capitalize('FRED');
     * // => 'Fred'
     */
    function capitalize(string) {
      return upperFirst(toString$1(string).toLowerCase());
    }

    /**
     * Deburrs `string` by converting
     * [Latin-1 Supplement](https://en.wikipedia.org/wiki/Latin-1_Supplement_(Unicode_block)#Character_table)
     * and [Latin Extended-A](https://en.wikipedia.org/wiki/Latin_Extended-A)
     * letters to basic Latin letters and removing
     * [combining diacritical marks](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks).
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category String
     * @param {string} [string=''] The string to deburr.
     * @returns {string} Returns the deburred string.
     * @example
     *
     * _.deburr('déjà vu');
     * // => 'deja vu'
     */
    function deburr(string) {
      string = toString$1(string);
      return string && string.replace(reLatin, deburrLetter).replace(reComboMark, '');
    }

    /**
     * Converts the first character of `string` to upper case.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category String
     * @param {string} [string=''] The string to convert.
     * @returns {string} Returns the converted string.
     * @example
     *
     * _.upperFirst('fred');
     * // => 'Fred'
     *
     * _.upperFirst('FRED');
     * // => 'FRED'
     */
    var upperFirst = createCaseFirst('toUpperCase');

    /**
     * Splits `string` into an array of its words.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category String
     * @param {string} [string=''] The string to inspect.
     * @param {RegExp|string} [pattern] The pattern to match words.
     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
     * @returns {Array} Returns the words of `string`.
     * @example
     *
     * _.words('fred, barney, & pebbles');
     * // => ['fred', 'barney', 'pebbles']
     *
     * _.words('fred, barney, & pebbles', /[^, ]+/g);
     * // => ['fred', 'barney', '&', 'pebbles']
     */
    function words(string, pattern, guard) {
      string = toString$1(string);
      pattern = guard ? undefined : pattern;

      if (pattern === undefined) {
        return hasUnicodeWord(string) ? unicodeWords(string) : asciiWords(string);
      }
      return string.match(pattern) || [];
    }

    var lodash_camelcase = camelCase;

    /**
     * lodash (Custom Build) <https://lodash.com/>
     * Build: `lodash modularize exports="npm" -o ./`
     * Copyright jQuery Foundation and other contributors <https://jquery.org/>
     * Released under MIT license <https://lodash.com/license>
     * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
     * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
     */

    /** Used as references for various `Number` constants. */
    var INFINITY = 1 / 0;

    /** `Object#toString` result references. */
    var symbolTag = '[object Symbol]';

    /** Detect free variable `global` from Node.js. */
    var freeGlobal = typeof commonjsGlobal == 'object' && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;

    /** Detect free variable `self`. */
    var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

    /** Used as a reference to the global object. */
    var root = freeGlobal || freeSelf || Function('return this')();

    /** Used for built-in method references. */
    var objectProto = Object.prototype;

    /** Used to generate unique IDs. */
    var idCounter = 0;

    /**
     * Used to resolve the
     * [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
     * of values.
     */
    var objectToString = objectProto.toString;

    /** Built-in value references. */
    var Symbol = root.Symbol;

    /** Used to convert symbols to primitives and strings. */
    var symbolProto = Symbol ? Symbol.prototype : undefined,
        symbolToString = symbolProto ? symbolProto.toString : undefined;

    /**
     * The base implementation of `_.toString` which doesn't convert nullish
     * values to empty strings.
     *
     * @private
     * @param {*} value The value to process.
     * @returns {string} Returns the string.
     */
    function baseToString(value) {
      // Exit early for strings to avoid a performance hit in some environments.
      if (typeof value == 'string') {
        return value;
      }
      if (isSymbol(value)) {
        return symbolToString ? symbolToString.call(value) : '';
      }
      var result = (value + '');
      return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
    }

    /**
     * Checks if `value` is object-like. A value is object-like if it's not `null`
     * and has a `typeof` result of "object".
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
     * @example
     *
     * _.isObjectLike({});
     * // => true
     *
     * _.isObjectLike([1, 2, 3]);
     * // => true
     *
     * _.isObjectLike(_.noop);
     * // => false
     *
     * _.isObjectLike(null);
     * // => false
     */
    function isObjectLike(value) {
      return !!value && typeof value == 'object';
    }

    /**
     * Checks if `value` is classified as a `Symbol` primitive or object.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
     * @example
     *
     * _.isSymbol(Symbol.iterator);
     * // => true
     *
     * _.isSymbol('abc');
     * // => false
     */
    function isSymbol(value) {
      return typeof value == 'symbol' ||
        (isObjectLike(value) && objectToString.call(value) == symbolTag);
    }

    /**
     * Converts `value` to a string. An empty string is returned for `null`
     * and `undefined` values. The sign of `-0` is preserved.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to process.
     * @returns {string} Returns the string.
     * @example
     *
     * _.toString(null);
     * // => ''
     *
     * _.toString(-0);
     * // => '-0'
     *
     * _.toString([1, 2, 3]);
     * // => '1,2,3'
     */
    function toString(value) {
      return value == null ? '' : baseToString(value);
    }

    /**
     * Generates a unique ID. If `prefix` is given, the ID is appended to it.
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category Util
     * @param {string} [prefix=''] The value to prefix the ID with.
     * @returns {string} Returns the unique ID.
     * @example
     *
     * _.uniqueId('contact_');
     * // => 'contact_104'
     *
     * _.uniqueId();
     * // => '105'
     */
    function uniqueId(prefix) {
      var id = ++idCounter;
      return toString(prefix) + id;
    }

    var lodash_uniqueid = uniqueId;

    var _Component_uuid_, _Component_id_, _Component_classNames_, _Component_tagName_, _Component_element_;
    const DEFAULT_TAG_NAME = 'div';
    class Component {
        constructor(config) {
            this.name = 'debugUI';
            _Component_uuid_.set(this, void 0);
            _Component_id_.set(this, void 0);
            _Component_classNames_.set(this, void 0);
            _Component_tagName_.set(this, void 0);
            _Component_element_.set(this, void 0);
            __classPrivateFieldSet(this, _Component_uuid_, lodash_uniqueid(), "f");
            __classPrivateFieldSet(this, _Component_id_, config.id || (lodash_camelcase(this.constructor.name) + __classPrivateFieldGet(this, _Component_uuid_, "f")), "f");
            __classPrivateFieldSet(this, _Component_tagName_, config.tagName || DEFAULT_TAG_NAME, "f");
            __classPrivateFieldSet(this, _Component_element_, null, "f");
            __classPrivateFieldSet(this, _Component_classNames_, lodash_union(config.classNames || [], [this.name]), "f");
        }
        get id() {
            return __classPrivateFieldGet(this, _Component_id_, "f");
        }
        get classNames() {
            return __classPrivateFieldGet(this, _Component_classNames_, "f");
        }
        set classNames(classes) {
            __classPrivateFieldSet(this, _Component_classNames_, classes, "f");
        }
        get tagName() {
            return __classPrivateFieldGet(this, _Component_tagName_, "f");
        }
        get element() {
            return __classPrivateFieldGet(this, _Component_element_, "f");
        }
        set element(el) {
            __classPrivateFieldSet(this, _Component_element_, el, "f");
        }
        render() {
            const html = this.renderAsHTML();
            this.attachListeners();
            return html;
        }
        renderAsString() {
            const html = this.renderAsHTML();
            return html.outerHTML;
        }
        renderAsHTML() {
            return this.html();
        }
        html() {
            if (this.element) {
                return this.element;
            }
            else {
                const el = document.createElement(__classPrivateFieldGet(this, _Component_tagName_, "f"));
                el.setAttribute('id', __classPrivateFieldGet(this, _Component_id_, "f"));
                el.classList.add(...__classPrivateFieldGet(this, _Component_classNames_, "f"));
                return this.element = el;
            }
        }
        attachListeners() {
            return;
        }
    }
    _Component_uuid_ = new WeakMap(), _Component_id_ = new WeakMap(), _Component_classNames_ = new WeakMap(), _Component_tagName_ = new WeakMap(), _Component_element_ = new WeakMap();

    var _Button_label_, _Button_icon_, _Button_labelClassNames_, _Button_iconClassNames_, _Button_labelId_, _Button_iconId_, _Button_isPressed_, _Button_isDisabled_, _Button_tabIndex_;
    const DEFAULT_SEPERATOR$4 = '-';
    class Button extends Component {
        constructor(config) {
            config.tagName = config.tagName || 'button';
            super(config);
            this.name = 'button';
            _Button_label_.set(this, void 0);
            _Button_icon_.set(this, void 0);
            _Button_labelClassNames_.set(this, void 0);
            _Button_iconClassNames_.set(this, void 0);
            _Button_labelId_.set(this, void 0);
            _Button_iconId_.set(this, void 0);
            _Button_isPressed_.set(this, void 0);
            _Button_isDisabled_.set(this, void 0);
            _Button_tabIndex_.set(this, void 0);
            __classPrivateFieldSet(this, _Button_label_, config.label, "f");
            __classPrivateFieldSet(this, _Button_icon_, config.icon, "f");
            __classPrivateFieldSet(this, _Button_labelClassNames_, config.labelClassNames || [], "f");
            __classPrivateFieldSet(this, _Button_iconClassNames_, config.iconclassNames || [], "f");
            __classPrivateFieldSet(this, _Button_isPressed_, config.isPressed || false, "f");
            __classPrivateFieldSet(this, _Button_isDisabled_, config.isDisabled || false, "f");
            __classPrivateFieldSet(this, _Button_tabIndex_, config.tabIndex || -1, "f");
            __classPrivateFieldSet(this, _Button_labelId_, config.labelId || `label${DEFAULT_SEPERATOR$4}${this.id}`, "f");
            __classPrivateFieldSet(this, _Button_iconId_, config.iconId || `icon${DEFAULT_SEPERATOR$4}${this.id}`, "f");
            this.classNames = lodash_union(this.classNames, [this.name]);
            __classPrivateFieldSet(this, _Button_labelClassNames_, lodash_union(config.labelClassNames || [], [`${this.name}${DEFAULT_SEPERATOR$4}label`]), "f");
            __classPrivateFieldSet(this, _Button_iconClassNames_, lodash_union(config.iconclassNames || [], [`${this.name}${DEFAULT_SEPERATOR$4}icon`]), "f");
        }
        get label() {
            return __classPrivateFieldGet(this, _Button_label_, "f");
        }
        get isPressed() {
            return __classPrivateFieldGet(this, _Button_isPressed_, "f");
        }
        get isDisabled() {
            return __classPrivateFieldGet(this, _Button_isDisabled_, "f");
        }
        get tabIndex() {
            return __classPrivateFieldGet(this, _Button_tabIndex_, "f");
        }
        renderAsHTML() {
            const html = super.renderAsHTML();
            html.append(__classPrivateFieldGet(this, _Button_label_, "f"), this.iconHTML(__classPrivateFieldGet(this, _Button_icon_, "f")));
            return html;
        }
        labelHTML(label) {
            const html = document.createElement('span');
            html.setAttribute('id', __classPrivateFieldGet(this, _Button_labelId_, "f"));
            html.classList.add(...__classPrivateFieldGet(this, _Button_labelClassNames_, "f"));
            html.innerText = label;
            return html;
        }
        iconHTML(icon) {
            const html = document.createElement('span');
            html.setAttribute('id', __classPrivateFieldGet(this, _Button_iconId_, "f"));
            html.classList.add(...__classPrivateFieldGet(this, _Button_iconClassNames_, "f"));
            html.innerHTML = icon || '';
            return html;
        }
    }
    _Button_label_ = new WeakMap(), _Button_icon_ = new WeakMap(), _Button_labelClassNames_ = new WeakMap(), _Button_iconClassNames_ = new WeakMap(), _Button_labelId_ = new WeakMap(), _Button_iconId_ = new WeakMap(), _Button_isPressed_ = new WeakMap(), _Button_isDisabled_ = new WeakMap(), _Button_tabIndex_ = new WeakMap();

    var _Accordian_panelClassNames_, _Accordian_panelId_;
    class Accordian extends Button {
        constructor(config) {
            super(config);
            this.name = 'accordian';
            _Accordian_panelClassNames_.set(this, void 0);
            _Accordian_panelId_.set(this, void 0);
            __classPrivateFieldSet(this, _Accordian_panelId_, config.panelId || '', "f");
            __classPrivateFieldSet(this, _Accordian_panelClassNames_, lodash_union(config.panelClassNames || [], []), "f");
        }
        render() {
            const html = super.render();
            const panel = document.createElement('div');
            panel.setAttribute('id', __classPrivateFieldGet(this, _Accordian_panelId_, "f"));
            panel.classList.add(...__classPrivateFieldGet(this, _Accordian_panelClassNames_, "f"));
            return html;
        }
    }
    _Accordian_panelClassNames_ = new WeakMap(), _Accordian_panelId_ = new WeakMap();

    var _ComboBox_inputId_, _ComboBox_inputClassNames_, _ComboBox_btnId_, _ComboBox_btnClassNames_, _ComboBox_listBoxId_, _ComboBox_listBoxClassNames_, _ComboBox_listBoxItemClassNames_, _ComboBox_containerClassNames_, _ComboBox_options_, _ComboBox_option_, _ComboBox_firstOption_, _ComboBox_lastOption_, _ComboBox_filteredOptions_, _ComboBox_filter_;
    const DEFAULT_SEPERATOR$3 = '-';
    class ComboBox extends Component {
        constructor(config) {
            super(config);
            this.name = 'combobox';
            _ComboBox_inputId_.set(this, void 0);
            _ComboBox_inputClassNames_.set(this, void 0);
            _ComboBox_btnId_.set(this, void 0);
            _ComboBox_btnClassNames_.set(this, void 0);
            _ComboBox_listBoxId_.set(this, void 0);
            _ComboBox_listBoxClassNames_.set(this, void 0);
            _ComboBox_listBoxItemClassNames_.set(this, void 0);
            _ComboBox_containerClassNames_.set(this, void 0);
            _ComboBox_options_.set(this, void 0);
            _ComboBox_option_.set(this, void 0);
            _ComboBox_firstOption_.set(this, void 0);
            _ComboBox_lastOption_.set(this, void 0);
            _ComboBox_filteredOptions_.set(this, void 0);
            _ComboBox_filter_.set(this, void 0);
            __classPrivateFieldSet(this, _ComboBox_options_, config.options, "f");
            __classPrivateFieldSet(this, _ComboBox_option_, '', "f");
            __classPrivateFieldSet(this, _ComboBox_firstOption_, '', "f");
            __classPrivateFieldSet(this, _ComboBox_lastOption_, '', "f");
            __classPrivateFieldSet(this, _ComboBox_filteredOptions_, [], "f");
            __classPrivateFieldSet(this, _ComboBox_filter_, '', "f");
            __classPrivateFieldSet(this, _ComboBox_inputId_, config.inputId || `${this.name}${DEFAULT_SEPERATOR$3}${'input'.concat(this.id)}`, "f");
            __classPrivateFieldSet(this, _ComboBox_btnId_, config.btnId || `${this.name}${DEFAULT_SEPERATOR$3}${'btn'.concat(this.id)}`, "f");
            __classPrivateFieldSet(this, _ComboBox_listBoxId_, config.listBoxId || `${this.name}${DEFAULT_SEPERATOR$3}${'listbox'.concat(this.id)}`, "f");
            __classPrivateFieldSet(this, _ComboBox_inputClassNames_, lodash_union(config.inputClasses || [], [`${this.name}${DEFAULT_SEPERATOR$3}input`]), "f");
            __classPrivateFieldSet(this, _ComboBox_btnClassNames_, lodash_union(config.btnClasses || [], [`${this.name}${DEFAULT_SEPERATOR$3}button`]), "f");
            __classPrivateFieldSet(this, _ComboBox_listBoxClassNames_, lodash_union(config.listBoxClasses || [], [`${this.name}${DEFAULT_SEPERATOR$3}listbox`]), "f");
            __classPrivateFieldSet(this, _ComboBox_listBoxItemClassNames_, lodash_union(config.listBoxItemClassNames || [], [`${this.name}${DEFAULT_SEPERATOR$3}listbox${DEFAULT_SEPERATOR$3}item`]), "f");
            __classPrivateFieldSet(this, _ComboBox_containerClassNames_, lodash_union(config.containerClassNames || [], [`${this.name}${DEFAULT_SEPERATOR$3}group`]), "f");
            this.classNames = lodash_union(config.wrapperClassNames || [], this.classNames, [this.name, `${this.name}${DEFAULT_SEPERATOR$3}list`]);
        }
        get filter() {
            return __classPrivateFieldGet(this, _ComboBox_filter_, "f");
        }
        get filteredOptions() {
            return __classPrivateFieldGet(this, _ComboBox_filteredOptions_, "f");
        }
        get lastOption() {
            return __classPrivateFieldGet(this, _ComboBox_lastOption_, "f");
        }
        get option() {
            return __classPrivateFieldGet(this, _ComboBox_option_, "f");
        }
        get firstOption() {
            return __classPrivateFieldGet(this, _ComboBox_firstOption_, "f");
        }
        open() {
            this.toggle(true);
        }
        close() {
            this.toggle(false);
        }
        toggle(open) {
            return open;
        }
        renderAsHTML() {
            const html = super.renderAsHTML();
            const cont = document.createElement('div');
            cont.classList.add(...__classPrivateFieldGet(this, _ComboBox_containerClassNames_, "f"));
            cont.append(this.inputHTML(), this.btnHTML(), this.listboxHTML());
            html.append(cont);
            return html;
        }
        btnHTML() {
            const btn = document.createElement('button');
            btn.setAttribute('id', __classPrivateFieldGet(this, _ComboBox_btnId_, "f"));
            btn.classList.add(...__classPrivateFieldGet(this, _ComboBox_btnClassNames_, "f"));
            btn.setAttribute('value', 'level');
            btn.innerText = 'levels';
            return btn;
        }
        inputHTML() {
            const input = document.createElement('input');
            input.setAttribute('id', __classPrivateFieldGet(this, _ComboBox_inputId_, "f"));
            input.setAttribute('type', 'text');
            input.classList.add(...__classPrivateFieldGet(this, _ComboBox_inputClassNames_, "f"));
            return input;
        }
        listboxHTML() {
            const listbox = document.createElement('ul');
            listbox.setAttribute('id', __classPrivateFieldGet(this, _ComboBox_listBoxId_, "f"));
            listbox.setAttribute('type', 'text');
            listbox.setAttribute('role', 'listbox');
            listbox.classList.add(...__classPrivateFieldGet(this, _ComboBox_listBoxClassNames_, "f"));
            for (let i = 0, options = __classPrivateFieldGet(this, _ComboBox_options_, "f"), option; option = options[i]; i++) {
                listbox.append(this.optHTML(option));
            }
            return listbox;
        }
        optHTML(opt) {
            const option = document.createElement('li');
            option.classList.add(...__classPrivateFieldGet(this, _ComboBox_listBoxItemClassNames_, "f"));
            option.innerText = opt;
            return option;
        }
    }
    _ComboBox_inputId_ = new WeakMap(), _ComboBox_inputClassNames_ = new WeakMap(), _ComboBox_btnId_ = new WeakMap(), _ComboBox_btnClassNames_ = new WeakMap(), _ComboBox_listBoxId_ = new WeakMap(), _ComboBox_listBoxClassNames_ = new WeakMap(), _ComboBox_listBoxItemClassNames_ = new WeakMap(), _ComboBox_containerClassNames_ = new WeakMap(), _ComboBox_options_ = new WeakMap(), _ComboBox_option_ = new WeakMap(), _ComboBox_firstOption_ = new WeakMap(), _ComboBox_lastOption_ = new WeakMap(), _ComboBox_filteredOptions_ = new WeakMap(), _ComboBox_filter_ = new WeakMap();

    var _LogRecord_level, _LogRecord_msg, _LogRecord_name, _LogRecord_timer, _Logger_name, _LogRegistryItem_logger, _LogRegistryItem_level, _LogRegistryItem_handlers, _LogRegistry_items, _LogBuffer_capacity, _LogBuffer_buffer, _LogBuffer_isFull, _LogBuffer_isBufferingEnabled, _LogBuffer_currIndex;
    const ROOT_LOG_NAME = '';
    const BUFFER_CAPACITY = 0;
    var LogLevel;
    (function (LogLevel) {
        LogLevel[LogLevel["Off"] = 0] = "Off";
        LogLevel[LogLevel["Debug"] = 1] = "Debug";
        LogLevel[LogLevel["Info"] = 2] = "Info";
        LogLevel[LogLevel["Warning"] = 3] = "Warning";
        LogLevel[LogLevel["Error"] = 4] = "Error";
    })(LogLevel || (LogLevel = {}));
    class LogRecord {
        constructor(level, msg, name, time) {
            _LogRecord_level.set(this, void 0);
            _LogRecord_msg.set(this, void 0);
            _LogRecord_name.set(this, void 0);
            _LogRecord_timer.set(this, void 0);
            __classPrivateFieldSet(this, _LogRecord_level, level, "f");
            __classPrivateFieldSet(this, _LogRecord_msg, msg, "f");
            __classPrivateFieldSet(this, _LogRecord_name, name, "f");
            __classPrivateFieldSet(this, _LogRecord_timer, time || Date.now(), "f");
        }
        get level() {
            return __classPrivateFieldGet(this, _LogRecord_level, "f");
        }
        get message() {
            return __classPrivateFieldGet(this, _LogRecord_msg, "f");
        }
        get name() {
            return __classPrivateFieldGet(this, _LogRecord_name, "f");
        }
        get timestamp() {
            return __classPrivateFieldGet(this, _LogRecord_timer, "f");
        }
        set timestamp(time) {
            __classPrivateFieldSet(this, _LogRecord_timer, time, "f");
        }
        reset(level, msg, name, timestamp, time) {
            __classPrivateFieldSet(this, _LogRecord_level, level, "f");
            __classPrivateFieldSet(this, _LogRecord_msg, msg, "f");
            __classPrivateFieldSet(this, _LogRecord_name, name, "f");
            __classPrivateFieldSet(this, _LogRecord_timer, timestamp || Date.now(), "f");
        }
    }
    _LogRecord_level = new WeakMap(), _LogRecord_msg = new WeakMap(), _LogRecord_name = new WeakMap(), _LogRecord_timer = new WeakMap();
    class Logger {
        constructor(name) {
            _Logger_name.set(this, void 0);
            __classPrivateFieldSet(this, _Logger_name, name, "f");
        }
        get name() {
            return __classPrivateFieldGet(this, _Logger_name, "f");
        }
    }
    _Logger_name = new WeakMap();
    class LogRegistryItem {
        constructor(name, level) {
            _LogRegistryItem_logger.set(this, void 0);
            _LogRegistryItem_level.set(this, void 0);
            _LogRegistryItem_handlers.set(this, void 0);
            __classPrivateFieldSet(this, _LogRegistryItem_logger, new Logger(name), "f");
            __classPrivateFieldSet(this, _LogRegistryItem_level, level || LogLevel.Debug, "f");
            __classPrivateFieldSet(this, _LogRegistryItem_handlers, [], "f");
        }
        get logger() {
            return __classPrivateFieldGet(this, _LogRegistryItem_logger, "f");
        }
        get name() {
            return __classPrivateFieldGet(this, _LogRegistryItem_logger, "f").name;
        }
        get level() {
            return __classPrivateFieldGet(this, _LogRegistryItem_level, "f");
        }
        set level(level) {
            __classPrivateFieldSet(this, _LogRegistryItem_level, level, "f");
        }
        get subscriberCount() {
            return __classPrivateFieldGet(this, _LogRegistryItem_handlers, "f").length;
        }
        subscribe(fn) {
            __classPrivateFieldGet(this, _LogRegistryItem_handlers, "f").push(fn);
        }
        unsubscribe(fn) {
            __classPrivateFieldSet(this, _LogRegistryItem_handlers, __classPrivateFieldGet(this, _LogRegistryItem_handlers, "f").filter((item) => {
                if (item !== fn) {
                    return item;
                }
            }), "f");
        }
        fire(record) {
            __classPrivateFieldGet(this, _LogRegistryItem_handlers, "f").forEach(handler => {
                handler(record);
            });
        }
    }
    _LogRegistryItem_logger = new WeakMap(), _LogRegistryItem_level = new WeakMap(), _LogRegistryItem_handlers = new WeakMap();
    class LogRegistry {
        constructor() {
            _LogRegistry_items.set(this, void 0);
            __classPrivateFieldSet(this, _LogRegistry_items, {}, "f");
            __classPrivateFieldGet(this, _LogRegistry_items, "f")[ROOT_LOG_NAME] = new LogRegistryItem(ROOT_LOG_NAME);
        }
        get itemCount() {
            return Object.values(__classPrivateFieldGet(this, _LogRegistry_items, "f")).length;
        }
        getLogger(name, level) {
            const item = __classPrivateFieldGet(this, _LogRegistry_items, "f")[name];
            if (item) {
                if (level !== undefined) {
                    item.level = level;
                }
                return item;
            }
            else {
                const logRegistryEntry = new LogRegistryItem(name);
                __classPrivateFieldGet(this, _LogRegistry_items, "f")[name] = logRegistryEntry;
                if (level !== undefined) {
                    logRegistryEntry.level = level;
                }
                return logRegistryEntry;
            }
        }
        getLoggers() {
            return Object.keys(__classPrivateFieldGet(this, _LogRegistry_items, "f"))
                .map(loggerName => __classPrivateFieldGet(this, _LogRegistry_items, "f")[loggerName]);
        }
    }
    _LogRegistry_items = new WeakMap();
    class LogBuffer {
        constructor(capacity) {
            _LogBuffer_capacity.set(this, void 0);
            _LogBuffer_buffer.set(this, void 0);
            _LogBuffer_isFull.set(this, void 0);
            _LogBuffer_isBufferingEnabled.set(this, void 0);
            _LogBuffer_currIndex.set(this, void 0);
            __classPrivateFieldSet(this, _LogBuffer_capacity, capacity || BUFFER_CAPACITY, "f");
            __classPrivateFieldSet(this, _LogBuffer_buffer, new Array(__classPrivateFieldGet(this, _LogBuffer_capacity, "f")), "f");
            __classPrivateFieldSet(this, _LogBuffer_isBufferingEnabled, __classPrivateFieldGet(this, _LogBuffer_buffer, "f").length > 0, "f");
            __classPrivateFieldSet(this, _LogBuffer_currIndex, -1, "f");
            __classPrivateFieldSet(this, _LogBuffer_isFull, false, "f");
        }
        get capacity() {
            return __classPrivateFieldGet(this, _LogBuffer_capacity, "f");
        }
        get buffer() {
            return __classPrivateFieldGet(this, _LogBuffer_buffer, "f");
        }
        get isFull() {
            return __classPrivateFieldGet(this, _LogBuffer_isFull, "f");
        }
        get isBufferingEnabled() {
            return __classPrivateFieldGet(this, _LogBuffer_isBufferingEnabled, "f");
        }
        get currIndex() {
            return __classPrivateFieldGet(this, _LogBuffer_currIndex, "f");
        }
        add(level, msg, name) {
            if (!__classPrivateFieldGet(this, _LogBuffer_isBufferingEnabled, "f")) {
                return new LogRecord(level, msg, name);
            }
            const currIndex = (__classPrivateFieldGet(this, _LogBuffer_currIndex, "f") + 1) % __classPrivateFieldGet(this, _LogBuffer_capacity, "f");
            __classPrivateFieldSet(this, _LogBuffer_currIndex, currIndex, "f");
            if (__classPrivateFieldGet(this, _LogBuffer_isFull, "f")) {
                const ret = __classPrivateFieldGet(this, _LogBuffer_buffer, "f")[currIndex];
                ret.reset(level, msg, name);
                return ret;
            }
            __classPrivateFieldSet(this, _LogBuffer_isFull, currIndex === (__classPrivateFieldGet(this, _LogBuffer_capacity, "f") - 1), "f");
            return __classPrivateFieldGet(this, _LogBuffer_buffer, "f")[currIndex] = new LogRecord(level, msg, name);
        }
        forEach(fn) {
            const buffer = __classPrivateFieldGet(this, _LogBuffer_buffer, "f");
            if (!buffer[0]) {
                return;
            }
            const currIndex = __classPrivateFieldGet(this, _LogBuffer_currIndex, "f");
            let i = __classPrivateFieldGet(this, _LogBuffer_isFull, "f") ? currIndex : -1;
            do {
                i = (i + 1) % __classPrivateFieldGet(this, _LogBuffer_capacity, "f");
                fn((buffer[i]));
            } while (i !== currIndex);
        }
        clear() {
            __classPrivateFieldSet(this, _LogBuffer_buffer, new Array(__classPrivateFieldGet(this, _LogBuffer_capacity, "f")), "f");
            __classPrivateFieldSet(this, _LogBuffer_currIndex, -1, "f");
            __classPrivateFieldSet(this, _LogBuffer_isFull, false, "f");
        }
    }
    _LogBuffer_capacity = new WeakMap(), _LogBuffer_buffer = new WeakMap(), _LogBuffer_isFull = new WeakMap(), _LogBuffer_isBufferingEnabled = new WeakMap(), _LogBuffer_currIndex = new WeakMap();

    var _Timer_timestamp;
    class Timer {
        constructor() {
            _Timer_timestamp.set(this, void 0);
            __classPrivateFieldSet(this, _Timer_timestamp, Date.now(), "f");
        }
        get timestamp() {
            return __classPrivateFieldGet(this, _Timer_timestamp, "f");
        }
        set timestamp(timestamp) {
            __classPrivateFieldSet(this, _Timer_timestamp, timestamp, "f");
        }
        reset() {
            __classPrivateFieldSet(this, _Timer_timestamp, Date.now(), "f");
        }
    }
    _Timer_timestamp = new WeakMap();

    var _Formatter_timer, _Formatter_showAbsoluteTime, _Formatter_showRelativeTime, _Formatter_showLoggerName, _Formatter_showSeverityLevel, _Formatter_info, _Formatter_error, _Formatter_warning, _Formatter_debug, _Formatter_logRecordContainer, _Formatter_logRecordTimestamp, _Formatter_logRecordName, _Formatter_logRecordLevel, _Formatter_logRecordMessage, _Formatter_prefix;
    const htmlEscape = (str) => {
        return str;
    };
    class Formatter {
        constructor(config) {
            _Formatter_timer.set(this, void 0);
            _Formatter_showAbsoluteTime.set(this, void 0);
            _Formatter_showRelativeTime.set(this, void 0);
            _Formatter_showLoggerName.set(this, void 0);
            _Formatter_showSeverityLevel.set(this, void 0);
            _Formatter_info.set(this, void 0);
            _Formatter_error.set(this, void 0);
            _Formatter_warning.set(this, void 0);
            _Formatter_debug.set(this, void 0);
            _Formatter_logRecordContainer.set(this, void 0);
            _Formatter_logRecordTimestamp.set(this, void 0);
            _Formatter_logRecordName.set(this, void 0);
            _Formatter_logRecordLevel.set(this, void 0);
            _Formatter_logRecordMessage.set(this, void 0);
            _Formatter_prefix.set(this, void 0);
            __classPrivateFieldSet(this, _Formatter_timer, new Timer(), "f");
            __classPrivateFieldSet(this, _Formatter_showAbsoluteTime, (config === null || config === void 0 ? void 0 : config.showAbsoluteTime) || true, "f");
            __classPrivateFieldSet(this, _Formatter_showRelativeTime, (config === null || config === void 0 ? void 0 : config.showRelativeTime) || true, "f");
            __classPrivateFieldSet(this, _Formatter_showLoggerName, (config === null || config === void 0 ? void 0 : config.showLoggerName) || true, "f");
            __classPrivateFieldSet(this, _Formatter_showSeverityLevel, (config === null || config === void 0 ? void 0 : config.showSeverityLevel) || false, "f");
            __classPrivateFieldSet(this, _Formatter_info, (config === null || config === void 0 ? void 0 : config.info) || 'debug-console-log-record--info', "f");
            __classPrivateFieldSet(this, _Formatter_error, (config === null || config === void 0 ? void 0 : config.error) || 'debug-console-log-record--error', "f");
            __classPrivateFieldSet(this, _Formatter_warning, (config === null || config === void 0 ? void 0 : config.warning) || 'debug-console-log-record--warning', "f");
            __classPrivateFieldSet(this, _Formatter_debug, (config === null || config === void 0 ? void 0 : config.debug) || 'debug-console-log-record--debug', "f");
            __classPrivateFieldSet(this, _Formatter_logRecordContainer, (config === null || config === void 0 ? void 0 : config.logRecordContainer) || 'debug-console-log-record', "f");
            __classPrivateFieldSet(this, _Formatter_logRecordTimestamp, (config === null || config === void 0 ? void 0 : config.logRecordTimestamp) || 'debug-console-log-record-timestamp', "f");
            __classPrivateFieldSet(this, _Formatter_logRecordName, (config === null || config === void 0 ? void 0 : config.logRecordName) || 'debug-console-log-record-name', "f");
            __classPrivateFieldSet(this, _Formatter_logRecordLevel, (config === null || config === void 0 ? void 0 : config.logRecordLevel) || 'debug-console-log-record-level', "f");
            __classPrivateFieldSet(this, _Formatter_logRecordMessage, (config === null || config === void 0 ? void 0 : config.logRecordMessage) || 'debug-console-log-record-message', "f");
            __classPrivateFieldSet(this, _Formatter_prefix, (config === null || config === void 0 ? void 0 : config.prefix) || '', "f");
        }
        get timer() {
            return __classPrivateFieldGet(this, _Formatter_timer, "f");
        }
        set timer(timer) {
            __classPrivateFieldSet(this, _Formatter_timer, timer, "f");
        }
        get showAbsoluteTime() {
            return __classPrivateFieldGet(this, _Formatter_showAbsoluteTime, "f");
        }
        set showAbsoluteTime(show) {
            __classPrivateFieldSet(this, _Formatter_showAbsoluteTime, show, "f");
        }
        get showRelativeTime() {
            return __classPrivateFieldGet(this, _Formatter_showRelativeTime, "f");
        }
        set showRelativeTime(show) {
            __classPrivateFieldSet(this, _Formatter_showRelativeTime, show, "f");
        }
        get showLoggerName() {
            return __classPrivateFieldGet(this, _Formatter_showLoggerName, "f");
        }
        set showLoggerName(show) {
            __classPrivateFieldSet(this, _Formatter_showLoggerName, show, "f");
        }
        get showSeverityLevel() {
            return __classPrivateFieldGet(this, _Formatter_showSeverityLevel, "f");
        }
        set showSeverityLevel(show) {
            __classPrivateFieldSet(this, _Formatter_showSeverityLevel, show, "f");
        }
        get css() {
            return {
                info: __classPrivateFieldGet(this, _Formatter_info, "f"),
                error: __classPrivateFieldGet(this, _Formatter_error, "f"),
                warning: __classPrivateFieldGet(this, _Formatter_warning, "f"),
                debug: __classPrivateFieldGet(this, _Formatter_debug, "f"),
                logRecordContainer: __classPrivateFieldGet(this, _Formatter_logRecordContainer, "f"),
                logRecordTimestamp: __classPrivateFieldGet(this, _Formatter_logRecordTimestamp, "f"),
                logRecordName: __classPrivateFieldGet(this, _Formatter_logRecordName, "f"),
                logRecordLevel: __classPrivateFieldGet(this, _Formatter_logRecordLevel, "f"),
                prefix: __classPrivateFieldGet(this, _Formatter_prefix, "f")
            };
        }
        getDateTimeStamp(logRecord) {
            const time = new Date(logRecord.timestamp);
            const date = `${(time.getMonth() + 1)}/${time.getDate()}/${(time.getFullYear() - 2000)}`;
            return `${date} ${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}.${Math.floor(time.getMilliseconds() / 10)}`;
        }
        getRelativeTimestamp(logRecord, timestamp) {
            const ms = logRecord.timestamp - timestamp;
            let sec = ms / 1000;
            const str = sec.toFixed(3);
            let spacesToPrepend = 0;
            if (sec < 1) {
                spacesToPrepend = 2;
            }
            else {
                while (sec < 100) {
                    spacesToPrepend++;
                    sec *= 10;
                }
            }
            while (spacesToPrepend-- > 0) {
                str.padStart(str.length + 1, ' ');
            }
            return `${str} s`;
        }
        format(logRecord) {
            return this.formatAsHtml(logRecord).outerHTML;
        }
        formatAsHtml(logRecord) {
            if (!logRecord) {
                return document.createElement('div');
            }
            const classNames = this.css;
            let className;
            switch (logRecord.level) {
                case LogLevel.Error:
                    className = classNames.error;
                    break;
                case LogLevel.Warning:
                    className = classNames.warning;
                    break;
                case LogLevel.Info:
                    className = classNames.info;
                    break;
                case LogLevel.Debug:
                    className = classNames.debug;
                default:
                    className = classNames.debug;
                    break;
            }
            const html = document.createElement('div');
            if (this.showAbsoluteTime) {
                const timestamp = document.createElement('span');
                timestamp.classList.add(__classPrivateFieldGet(this, _Formatter_logRecordTimestamp, "f"));
                timestamp.innerText = this.getDateTimeStamp(logRecord);
                html.append(timestamp);
            }
            if (this.showRelativeTime) {
                const relativeTime = document.createElement('span');
                relativeTime.classList.add(__classPrivateFieldGet(this, _Formatter_logRecordTimestamp, "f"));
                relativeTime.innerText = this.getRelativeTimestamp(logRecord, __classPrivateFieldGet(this, _Formatter_timer, "f").timestamp);
                html.append(relativeTime);
            }
            if (this.showLoggerName) {
                const loggerName = document.createElement('span');
                loggerName.classList.add(__classPrivateFieldGet(this, _Formatter_logRecordName, "f"));
                loggerName.innerText = logRecord.name;
                html.append(loggerName);
            }
            if (this.showSeverityLevel) {
                const loggerLevel = document.createElement('span');
                loggerLevel.classList.add(__classPrivateFieldGet(this, _Formatter_logRecordLevel, "f"));
                loggerLevel.innerText = LogLevel[logRecord.level];
                html.append(loggerLevel);
            }
            const logRecordHtml = htmlEscape(logRecord.message);
            const recordHTML = document.createElement('span');
            recordHTML.classList.add(__classPrivateFieldGet(this, _Formatter_logRecordMessage, "f"));
            recordHTML.append(logRecordHtml);
            html.append(recordHTML, document.createElement('br'));
            html.classList.add(this.css.logRecordContainer, className);
            return html;
        }
    }
    _Formatter_timer = new WeakMap(), _Formatter_showAbsoluteTime = new WeakMap(), _Formatter_showRelativeTime = new WeakMap(), _Formatter_showLoggerName = new WeakMap(), _Formatter_showSeverityLevel = new WeakMap(), _Formatter_info = new WeakMap(), _Formatter_error = new WeakMap(), _Formatter_warning = new WeakMap(), _Formatter_debug = new WeakMap(), _Formatter_logRecordContainer = new WeakMap(), _Formatter_logRecordTimestamp = new WeakMap(), _Formatter_logRecordName = new WeakMap(), _Formatter_logRecordLevel = new WeakMap(), _Formatter_logRecordMessage = new WeakMap(), _Formatter_prefix = new WeakMap();

    var _Counter_countClassNames_, _Counter_countId_, _Counter_label_, _Counter_count_;
    const DEFAULT_SEPERATOR$2 = '-';
    const DEFAULT_TAGNAME = 'div';
    class Counter extends Component {
        constructor(config) {
            config.tagName = config.tagName || DEFAULT_TAGNAME;
            super(config);
            this.name = 'counter';
            _Counter_countClassNames_.set(this, void 0);
            _Counter_countId_.set(this, void 0);
            _Counter_label_.set(this, void 0);
            _Counter_count_.set(this, void 0);
            __classPrivateFieldSet(this, _Counter_count_, 0, "f");
            __classPrivateFieldSet(this, _Counter_label_, config.label, "f");
            __classPrivateFieldSet(this, _Counter_countId_, config.countId || `${this.name}${DEFAULT_SEPERATOR$2}${'count'.concat(this.id)}`, "f");
            __classPrivateFieldSet(this, _Counter_countClassNames_, lodash_union(config.countClassNames || [], [`${this.name}${DEFAULT_SEPERATOR$2}count`]), "f");
            this.classNames = lodash_union(this.classNames, [this.name]);
        }
        get count() {
            return __classPrivateFieldGet(this, _Counter_count_, "f");
        }
        set count(count) {
            __classPrivateFieldSet(this, _Counter_count_, count, "f");
            this.setCount(__classPrivateFieldGet(this, _Counter_count_, "f"));
        }
        setCount(count) {
            const el = this.element;
            if (el) {
                const countEl = document.getElementById(`${__classPrivateFieldGet(this, _Counter_countId_, "f")}`);
                countEl.innerText = count.toString();
            }
        }
        increment(delta) {
            const oldCount = __classPrivateFieldGet(this, _Counter_count_, "f");
            this.count = oldCount + delta;
        }
        renderAsHTML() {
            const html = super.renderAsHTML();
            const count = document.createElement('span');
            count.classList.add(...__classPrivateFieldGet(this, _Counter_countClassNames_, "f"));
            count.setAttribute('id', __classPrivateFieldGet(this, _Counter_countId_, "f"));
            count.innerText = __classPrivateFieldGet(this, _Counter_count_, "f").toString();
            html.append(__classPrivateFieldGet(this, _Counter_label_, "f"), count);
            return html;
        }
    }
    _Counter_countClassNames_ = new WeakMap(), _Counter_countId_ = new WeakMap(), _Counter_label_ = new WeakMap(), _Counter_count_ = new WeakMap();

    var _ToolBarComboBox_parent_, _ToolBarAccordian_parent_, _ToolBarCounter_parent_, _ToolBarButton_parent_, _ToolBar_itemClassNames_, _ToolBar_groupClassNames_, _ToolBar_items_;
    const DEFAULT_SEPERATOR$1 = '-';
    class ToolBarComboBox extends ComboBox {
        constructor(config) {
            super(config);
            _ToolBarComboBox_parent_.set(this, void 0);
            __classPrivateFieldSet(this, _ToolBarComboBox_parent_, config.toolbar, "f");
        }
        set parent(parent) {
            __classPrivateFieldSet(this, _ToolBarComboBox_parent_, parent, "f");
        }
        renderAsHTML() {
            const html = super.renderAsHTML();
            if (__classPrivateFieldGet(this, _ToolBarComboBox_parent_, "f")) {
                html.classList.add(...[`${__classPrivateFieldGet(this, _ToolBarComboBox_parent_, "f").name}-item`, `${__classPrivateFieldGet(this, _ToolBarComboBox_parent_, "f").name}-${this.name}`]);
            }
            return html;
        }
    }
    _ToolBarComboBox_parent_ = new WeakMap();
    class ToolBarAccordian extends Accordian {
        constructor(config) {
            config.classNames = lodash_union(config.classNames || [], []);
            super(config);
            _ToolBarAccordian_parent_.set(this, void 0);
            __classPrivateFieldSet(this, _ToolBarAccordian_parent_, config.toolbar, "f");
        }
        set parent(parent) {
            __classPrivateFieldSet(this, _ToolBarAccordian_parent_, parent, "f");
        }
        renderAsHTML() {
            const html = super.renderAsHTML();
            if (__classPrivateFieldGet(this, _ToolBarAccordian_parent_, "f")) {
                html.classList.add(...[`${__classPrivateFieldGet(this, _ToolBarAccordian_parent_, "f").name}-item`, `${__classPrivateFieldGet(this, _ToolBarAccordian_parent_, "f").name}-${this.name}`]);
            }
            return html;
        }
    }
    _ToolBarAccordian_parent_ = new WeakMap();
    class ToolBarCounter extends Counter {
        constructor(config) {
            config.classNames = lodash_union(config.classNames || [], []);
            super(config);
            _ToolBarCounter_parent_.set(this, void 0);
            __classPrivateFieldSet(this, _ToolBarCounter_parent_, config.toolbar, "f");
        }
        set parent(parent) {
            __classPrivateFieldSet(this, _ToolBarCounter_parent_, parent, "f");
        }
        renderAsHTML() {
            const html = super.renderAsHTML();
            if (__classPrivateFieldGet(this, _ToolBarCounter_parent_, "f")) {
                html.classList.add(...[`${__classPrivateFieldGet(this, _ToolBarCounter_parent_, "f").name}-item`, `${__classPrivateFieldGet(this, _ToolBarCounter_parent_, "f").name}-${this.name}`]);
            }
            return html;
        }
    }
    _ToolBarCounter_parent_ = new WeakMap();
    class ToolBarButton extends Button {
        constructor(config) {
            config.classNames = lodash_union(config.classNames || [], []);
            super(config);
            _ToolBarButton_parent_.set(this, void 0);
            __classPrivateFieldSet(this, _ToolBarButton_parent_, config.toolbar, "f");
        }
        set parent(parent) {
            __classPrivateFieldSet(this, _ToolBarButton_parent_, parent, "f");
        }
        renderAsHTML() {
            const html = super.renderAsHTML();
            if (__classPrivateFieldGet(this, _ToolBarButton_parent_, "f")) {
                html.classList.add(...[`${__classPrivateFieldGet(this, _ToolBarButton_parent_, "f").name}-item`, `${__classPrivateFieldGet(this, _ToolBarButton_parent_, "f").name}-${this.name}`]);
            }
            return html;
        }
    }
    _ToolBarButton_parent_ = new WeakMap();
    class ToolBar extends Component {
        constructor(config) {
            super(config);
            this.name = 'toolbar';
            _ToolBar_itemClassNames_.set(this, void 0);
            _ToolBar_groupClassNames_.set(this, void 0);
            _ToolBar_items_.set(this, void 0);
            __classPrivateFieldSet(this, _ToolBar_items_, config.items || {}, "f");
            __classPrivateFieldSet(this, _ToolBar_itemClassNames_, lodash_union(config.itemClassNames || [], [`${this.name}${DEFAULT_SEPERATOR$1}item`]), "f");
            __classPrivateFieldSet(this, _ToolBar_groupClassNames_, lodash_union(config.groupClassNames || [], [`${this.name}-group`, 'group']), "f");
            this.classNames = lodash_union(this.classNames, [this.name]);
            for (let i = 0, groups = Object.values(__classPrivateFieldGet(this, _ToolBar_items_, "f")), group; group = groups[i]; i++) {
                for (let j = 0, items = group, item; item = items[j]; j++) {
                    item.parent = this;
                }
            }
        }
        group(index) {
            return __classPrivateFieldGet(this, _ToolBar_items_, "f")[index];
        }
        insert(group, item) {
            let initialInsert = false;
            if (!__classPrivateFieldGet(this, _ToolBar_items_, "f")[group]) {
                initialInsert = true;
                __classPrivateFieldGet(this, _ToolBar_items_, "f")[group] = [];
            }
            if (!item.parent || item.parent !== this) {
                item.parent = this;
            }
            __classPrivateFieldGet(this, _ToolBar_items_, "f")[group].push(item);
            return initialInsert;
        }
        groupHTML(name) {
            const groupEl = document.createElement('div');
            groupEl.classList.add(...__classPrivateFieldGet(this, _ToolBar_groupClassNames_, "f"));
            return groupEl;
        }
        render() {
            const html = super.render();
            const itemsCopy = __classPrivateFieldGet(this, _ToolBar_items_, "f");
            for (let i = 0, groups = Object.keys(itemsCopy), group; group = groups[i]; i++) {
                const groupHTML = this.groupHTML(group);
                for (let j = 0, items = itemsCopy[group], item; item = items[j]; j++) {
                    const itemEl = item.render();
                    itemEl.classList.add(...__classPrivateFieldGet(this, _ToolBar_itemClassNames_, "f"));
                    groupHTML.append(itemEl);
                }
                html.append(groupHTML);
            }
            return html;
        }
        html() {
            const html = super.html();
            html.setAttribute('role', 'toolbar');
            return html;
        }
        attachListeners() {
            super.attachListeners();
        }
    }
    _ToolBar_itemClassNames_ = new WeakMap(), _ToolBar_groupClassNames_ = new WeakMap(), _ToolBar_items_ = new WeakMap();

    var _DebugConsole_headerClassNames_, _DebugConsole_logClassNames_, _DebugConsole_footerClassNames_, _DebugConsole_headerId_, _DebugConsole_logId_, _DebugConsole_footerId_, _DebugConsole_outputBuffer_, _DebugConsole_savedMessages_, _DebugConsole_filteredLoggers_, _DebugConsole_isLogging_, _DebugConsole_mountTo, _DebugConsole_logEl_, _DebugConsole_toolbar_, _DebugConsole_formatter_;
    const DEFAULT_SEPERATOR = '-';
    class ToolBarClearButton extends ToolBarButton {
        attachListeners() {
            super.attachListeners();
            const el = this.element;
            el === null || el === void 0 ? void 0 : el.addEventListener('click', (e) => this.handleClick(e));
        }
        handleClick(e) {
            var _a;
            (_a = e.target) === null || _a === void 0 ? void 0 : _a.dispatchEvent(new CustomEvent('clear', {
                bubbles: true,
                detail: {}
            }));
        }
    }
    class DebugConsole extends Component {
        constructor(config) {
            super(config);
            this.name = 'debug-console';
            _DebugConsole_headerClassNames_.set(this, void 0);
            _DebugConsole_logClassNames_.set(this, void 0);
            _DebugConsole_footerClassNames_.set(this, void 0);
            _DebugConsole_headerId_.set(this, void 0);
            _DebugConsole_logId_.set(this, void 0);
            _DebugConsole_footerId_.set(this, void 0);
            _DebugConsole_outputBuffer_.set(this, void 0);
            _DebugConsole_savedMessages_.set(this, void 0);
            _DebugConsole_filteredLoggers_.set(this, void 0);
            _DebugConsole_isLogging_.set(this, void 0);
            _DebugConsole_mountTo.set(this, void 0);
            _DebugConsole_logEl_.set(this, void 0);
            _DebugConsole_toolbar_.set(this, void 0);
            _DebugConsole_formatter_.set(this, void 0);
            __classPrivateFieldSet(this, _DebugConsole_outputBuffer_, [], "f");
            __classPrivateFieldSet(this, _DebugConsole_savedMessages_, [], "f");
            __classPrivateFieldSet(this, _DebugConsole_filteredLoggers_, {}, "f");
            __classPrivateFieldSet(this, _DebugConsole_isLogging_, true, "f");
            __classPrivateFieldSet(this, _DebugConsole_logEl_, null, "f");
            __classPrivateFieldSet(this, _DebugConsole_mountTo, config.mountTo, "f");
            __classPrivateFieldSet(this, _DebugConsole_headerClassNames_, lodash_union(config.headerClassNames || [], [`${this.name}${DEFAULT_SEPERATOR}header`]), "f");
            __classPrivateFieldSet(this, _DebugConsole_logClassNames_, lodash_union(config.logClassNames || [], [`${this.name}${DEFAULT_SEPERATOR}logger`]), "f");
            __classPrivateFieldSet(this, _DebugConsole_footerClassNames_, lodash_union(config.footerClassNames || [], [`${this.name}${DEFAULT_SEPERATOR}footer`]), "f");
            __classPrivateFieldSet(this, _DebugConsole_headerId_, config.headerId || `${this.name.concat('-header')}${this.id}`, "f");
            __classPrivateFieldSet(this, _DebugConsole_logId_, config.logId || `${this.name.concat('-logger')}${this.id}`, "f");
            __classPrivateFieldSet(this, _DebugConsole_footerId_, config.footerId || `${this.name.concat('-footer')}${this.id}`, "f");
            __classPrivateFieldSet(this, _DebugConsole_toolbar_, config.toolbar || DebugConsole.defaultToolbar(), "f");
            __classPrivateFieldSet(this, _DebugConsole_formatter_, config.formatter || new Formatter(), "f");
        }
        get headerId() {
            return __classPrivateFieldGet(this, _DebugConsole_headerId_, "f");
        }
        get logId() {
            return __classPrivateFieldGet(this, _DebugConsole_logId_, "f");
        }
        get footerId() {
            return __classPrivateFieldGet(this, _DebugConsole_footerId_, "f");
        }
        get headerClassNames() {
            return __classPrivateFieldGet(this, _DebugConsole_headerClassNames_, "f");
        }
        get logClassNames() {
            return __classPrivateFieldGet(this, _DebugConsole_logClassNames_, "f");
        }
        get footerClassNames() {
            return __classPrivateFieldGet(this, _DebugConsole_footerClassNames_, "f");
        }
        get isLogging() {
            return __classPrivateFieldGet(this, _DebugConsole_isLogging_, "f");
        }
        get outputBuffer() {
            return __classPrivateFieldGet(this, _DebugConsole_outputBuffer_, "f");
        }
        get savedMessages() {
            return __classPrivateFieldGet(this, _DebugConsole_savedMessages_, "f");
        }
        get filteredLoggers() {
            return __classPrivateFieldGet(this, _DebugConsole_filteredLoggers_, "f");
        }
        log(logRecord) {
            if (!logRecord) {
                return;
            }
            __classPrivateFieldSet(this, _DebugConsole_logEl_, __classPrivateFieldGet(this, _DebugConsole_logEl_, "f") || document.createElement('div'), "f");
            const scroll = (__classPrivateFieldGet(this, _DebugConsole_logEl_, "f").scrollHeight - __classPrivateFieldGet(this, _DebugConsole_logEl_, "f").scrollTop - __classPrivateFieldGet(this, _DebugConsole_logEl_, "f").clientHeight) <= 100;
            __classPrivateFieldGet(this, _DebugConsole_logEl_, "f").appendChild(__classPrivateFieldGet(this, _DebugConsole_formatter_, "f").formatAsHtml(logRecord));
            if (scroll) {
                __classPrivateFieldGet(this, _DebugConsole_logEl_, "f").scrollTop = __classPrivateFieldGet(this, _DebugConsole_logEl_, "f").scrollHeight;
            }
        }
        open(mountTo) {
            if (mountTo) {
                __classPrivateFieldSet(this, _DebugConsole_mountTo, mountTo, "f");
            }
            this.render();
        }
        clear() {
            var _a;
            while ((_a = __classPrivateFieldGet(this, _DebugConsole_logEl_, "f")) === null || _a === void 0 ? void 0 : _a.firstChild)
                __classPrivateFieldGet(this, _DebugConsole_logEl_, "f").removeChild(__classPrivateFieldGet(this, _DebugConsole_logEl_, "f").firstChild);
        }
        exit() {
            __classPrivateFieldSet(this, _DebugConsole_outputBuffer_, [], "f");
            __classPrivateFieldSet(this, _DebugConsole_savedMessages_, [], "f");
            __classPrivateFieldSet(this, _DebugConsole_filteredLoggers_, {}, "f");
            this.clear();
        }
        render() {
            var _a;
            const html = super.render();
            if (__classPrivateFieldGet(this, _DebugConsole_mountTo, "f") && (typeof __classPrivateFieldGet(this, _DebugConsole_mountTo, "f") === 'string')) {
                const target = document.getElementById(__classPrivateFieldGet(this, _DebugConsole_mountTo, "f"));
                target === null || target === void 0 ? void 0 : target.append(html);
                __classPrivateFieldSet(this, _DebugConsole_mountTo, target, "f");
            }
            else if (__classPrivateFieldGet(this, _DebugConsole_mountTo, "f") && (__classPrivateFieldGet(this, _DebugConsole_mountTo, "f") instanceof HTMLElement)) {
                (_a = __classPrivateFieldGet(this, _DebugConsole_mountTo, "f")) === null || _a === void 0 ? void 0 : _a.append(html);
            }
            return html;
        }
        renderAsHTML() {
            const el = super.renderAsHTML();
            const headerEl = document.createElement('header');
            headerEl.classList.add(...__classPrivateFieldGet(this, _DebugConsole_headerClassNames_, "f"));
            headerEl.setAttribute('id', __classPrivateFieldGet(this, _DebugConsole_headerId_, "f"));
            headerEl.append(__classPrivateFieldGet(this, _DebugConsole_toolbar_, "f").render());
            const logEl = document.createElement('div');
            logEl.classList.add(...__classPrivateFieldGet(this, _DebugConsole_logClassNames_, "f"));
            logEl.setAttribute('id', __classPrivateFieldGet(this, _DebugConsole_logId_, "f"));
            const footerEl = document.createElement('footer');
            footerEl.classList.add(...__classPrivateFieldGet(this, _DebugConsole_footerClassNames_, "f"));
            footerEl.setAttribute('id', __classPrivateFieldGet(this, _DebugConsole_footerId_, "f"));
            el.append(headerEl, logEl, footerEl);
            __classPrivateFieldSet(this, _DebugConsole_logEl_, logEl, "f");
            return this.element = el;
        }
        attachListeners() {
            super.attachListeners();
            const defaultGroup = __classPrivateFieldGet(this, _DebugConsole_toolbar_, "f").group('default');
            if (defaultGroup) {
                this.defaultToolbarListeners(defaultGroup);
            }
        }
        defaultToolbarListeners(items) {
            const el = this.element;
            el === null || el === void 0 ? void 0 : el.addEventListener('clear', (e) => this.clear());
        }
        static defaultToolbar() {
            const toolbar = new ToolBar({});
            toolbar.insert('default', new ToolBarClearButton({
                label: 'clear',
                icon: '<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>'
            }));
            toolbar.insert('default', new ToolBarComboBox({
                options: ['debug', 'info', 'warning', 'error']
            }));
            toolbar.insert('default', new ToolBarCounter({ label: 'info', classNames: ['counter--info'] }));
            toolbar.insert('default', new ToolBarCounter({ label: 'warning', classNames: ['counter--warning'] }));
            toolbar.insert('default', new ToolBarCounter({ label: 'error', classNames: ['counter--error'] }));
            toolbar.insert('default', new ToolBarAccordian({
                label: 'settings',
                icon: '<svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24" viewBox="0 0 24 24" width="24"><g><path d="M0,0h24v24H0V0z" fill="none"/><path d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.8,11.69,4.8,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z"/></g></svg>',
                panel: 'settings accordian panel'
            }));
            return toolbar;
        }
    }
    _DebugConsole_headerClassNames_ = new WeakMap(), _DebugConsole_logClassNames_ = new WeakMap(), _DebugConsole_footerClassNames_ = new WeakMap(), _DebugConsole_headerId_ = new WeakMap(), _DebugConsole_logId_ = new WeakMap(), _DebugConsole_footerId_ = new WeakMap(), _DebugConsole_outputBuffer_ = new WeakMap(), _DebugConsole_savedMessages_ = new WeakMap(), _DebugConsole_filteredLoggers_ = new WeakMap(), _DebugConsole_isLogging_ = new WeakMap(), _DebugConsole_mountTo = new WeakMap(), _DebugConsole_logEl_ = new WeakMap(), _DebugConsole_toolbar_ = new WeakMap(), _DebugConsole_formatter_ = new WeakMap();

    const logRegistry = new LogRegistry();
    const logBuffer = new LogBuffer();
    const getLogger = (name, level) => {
        return logRegistry.getLogger(name, level);
    };
    const getLoggers = () => {
        return logRegistry.getLoggers();
    };
    const subscribe = (logger, fn) => {
        if (logger) {
            logger = logger.name || logger;
            const loggerItem = getLogger(logger);
            loggerItem.subscribe(fn);
        }
        return false;
    };
    const unsubscribe = (logger, fn) => {
        if (logger) {
            logger = logger.name || logger;
            const loggerItem = getLogger(logger);
            loggerItem.unsubscribe(fn);
        }
        return false;
    };
    const log = (logger, level, msg) => {
        if (logger) {
            logger = logger.name || logger;
            level = level || LogLevel.Debug;
            const loggerItem = getLogger(logger);
            const logRecord = logBuffer.add(level, msg, logger);
            loggerItem.fire(logRecord);
        }
    };
    const info = (logger, msg) => {
        if (logger) {
            log(logger, LogLevel.Info, msg);
        }
    };
    const error = (logger, msg) => {
        if (logger) {
            log(logger, LogLevel.Error, msg);
        }
    };
    const debug = (logger, msg) => {
        if (logger) {
            log(logger, LogLevel.Debug, msg);
        }
    };
    const warning = (logger, msg) => {
        if (logger) {
            log(logger, LogLevel.Warning, msg);
        }
    };

    exports.Accordian = Accordian;
    exports.Button = Button;
    exports.ComboBox = ComboBox;
    exports.Counter = Counter;
    exports.DebugConsole = DebugConsole;
    exports.Formatter = Formatter;
    exports.ToolBar = ToolBar;
    exports.ToolBarAccordian = ToolBarAccordian;
    exports.ToolBarButton = ToolBarButton;
    exports.ToolBarComboBox = ToolBarComboBox;
    exports.ToolBarCounter = ToolBarCounter;
    exports.debug = debug;
    exports.error = error;
    exports.getLogger = getLogger;
    exports.getLoggers = getLoggers;
    exports.info = info;
    exports.log = log;
    exports.logBuffer = logBuffer;
    exports.logRegistry = logRegistry;
    exports.subscribe = subscribe;
    exports.unsubscribe = unsubscribe;
    exports.warning = warning;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=index.bundle.js.map
