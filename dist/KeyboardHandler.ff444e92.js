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
})({"../node_modules/ste-core/dist/management.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Allows the user to interact with the event.
 *
 * @class EventManagement
 * @implements {IEventManagement}
 */

var EventManagement =
/** @class */
function () {
  function EventManagement(unsub) {
    this.unsub = unsub;
    this.propagationStopped = false;
  }

  EventManagement.prototype.stopPropagation = function () {
    this.propagationStopped = true;
  };

  return EventManagement;
}();

exports.EventManagement = EventManagement;
},{}],"../node_modules/ste-core/dist/subscription.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Stores a handler. Manages execution meta data.
 * @class Subscription
 * @template TEventHandler
 */

var Subscription =
/** @class */
function () {
  /**
   * Creates an instance of Subscription.
   *
   * @param {TEventHandler} handler The handler for the subscription.
   * @param {boolean} isOnce Indicates if the handler should only be executed once.
   */
  function Subscription(handler, isOnce) {
    this.handler = handler;
    this.isOnce = isOnce;
    /**
     * Indicates if the subscription has been executed before.
     */

    this.isExecuted = false;
  }
  /**
   * Executes the handler.
   *
   * @param {boolean} executeAsync True if the even should be executed async.
   * @param {*} scope The scope the scope of the event.
   * @param {IArguments} args The arguments for the event.
   */


  Subscription.prototype.execute = function (executeAsync, scope, args) {
    if (!this.isOnce || !this.isExecuted) {
      this.isExecuted = true;
      var fn = this.handler;

      if (executeAsync) {
        setTimeout(function () {
          fn.apply(scope, args);
        }, 1);
      } else {
        fn.apply(scope, args);
      }
    }
  };

  return Subscription;
}();

exports.Subscription = Subscription;
},{}],"../node_modules/ste-core/dist/dispatching.js":[function(require,module,exports) {
"use strict";

var __spreadArrays = this && this.__spreadArrays || function () {
  for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;

  for (var r = Array(s), k = 0, i = 0; i < il; i++) for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++) r[k] = a[j];

  return r;
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var management_1 = require("./management");

var subscription_1 = require("./subscription");
/**
 * Base class for implementation of the dispatcher. It facilitates the subscribe
 * and unsubscribe methods based on generic handlers. The TEventType specifies
 * the type of event that should be exposed. Use the asEvent to expose the
 * dispatcher as event.
 */


var DispatcherBase =
/** @class */
function () {
  function DispatcherBase() {
    this._wrap = new DispatcherWrapper(this);
    this._subscriptions = new Array();
  }

  Object.defineProperty(DispatcherBase.prototype, "count", {
    /**
     * Returns the number of subscriptions.
     *
     * @readonly
     *
     * @memberOf DispatcherBase
     */
    get: function () {
      return this._subscriptions.length;
    },
    enumerable: true,
    configurable: true
  });
  /**
   * Subscribe to the event dispatcher.
   * @param fn The event handler that is called when the event is dispatched.
   * @returns A function that unsubscribes the event handler from the event.
   */

  DispatcherBase.prototype.subscribe = function (fn) {
    var _this = this;

    if (fn) {
      this._subscriptions.push(new subscription_1.Subscription(fn, false));
    }

    return function () {
      _this.unsubscribe(fn);
    };
  };
  /**
   * Subscribe to the event dispatcher.
   * @param fn The event handler that is called when the event is dispatched.
   * @returns A function that unsubscribes the event handler from the event.
   */


  DispatcherBase.prototype.sub = function (fn) {
    return this.subscribe(fn);
  };
  /**
   * Subscribe once to the event with the specified name.
   * @param fn The event handler that is called when the event is dispatched.
   * @returns A function that unsubscribes the event handler from the event.
   */


  DispatcherBase.prototype.one = function (fn) {
    var _this = this;

    if (fn) {
      this._subscriptions.push(new subscription_1.Subscription(fn, true));
    }

    return function () {
      _this.unsubscribe(fn);
    };
  };
  /**
   * Checks it the event has a subscription for the specified handler.
   * @param fn The event handler.
   */


  DispatcherBase.prototype.has = function (fn) {
    if (!fn) return false;
    return this._subscriptions.some(function (sub) {
      return sub.handler == fn;
    });
  };
  /**
   * Unsubscribes the handler from the dispatcher.
   * @param fn The event handler.
   */


  DispatcherBase.prototype.unsubscribe = function (fn) {
    if (!fn) return;

    for (var i = 0; i < this._subscriptions.length; i++) {
      if (this._subscriptions[i].handler == fn) {
        this._subscriptions.splice(i, 1);

        break;
      }
    }
  };
  /**
   * Unsubscribes the handler from the dispatcher.
   * @param fn The event handler.
   */


  DispatcherBase.prototype.unsub = function (fn) {
    this.unsubscribe(fn);
  };
  /**
   * Generic dispatch will dispatch the handlers with the given arguments.
   *
   * @protected
   * @param {boolean} executeAsync True if the even should be executed async.
   * @param {*} The scope the scope of the event. The scope becomes the "this" for handler.
   * @param {IArguments} args The arguments for the event.
   */


  DispatcherBase.prototype._dispatch = function (executeAsync, scope, args) {
    var _this = this;

    var _loop_1 = function (sub) {
      var ev = new management_1.EventManagement(function () {
        return _this.unsub(sub.handler);
      });
      var nargs = Array.prototype.slice.call(args);
      nargs.push(ev);
      sub.execute(executeAsync, scope, nargs); //cleanup subs that are no longer needed

      this_1.cleanup(sub);

      if (!executeAsync && ev.propagationStopped) {
        return "break";
      }
    };

    var this_1 = this; //execute on a copy because of bug #9

    for (var _i = 0, _a = __spreadArrays(this._subscriptions); _i < _a.length; _i++) {
      var sub = _a[_i];

      var state_1 = _loop_1(sub);

      if (state_1 === "break") break;
    }
  };
  /**
   * Cleans up subs that ran and should run only once.
   */


  DispatcherBase.prototype.cleanup = function (sub) {
    if (sub.isOnce && sub.isExecuted) {
      var i = this._subscriptions.indexOf(sub);

      if (i > -1) {
        this._subscriptions.splice(i, 1);
      }
    }
  };
  /**
   * Creates an event from the dispatcher. Will return the dispatcher
   * in a wrapper. This will prevent exposure of any dispatcher methods.
   */


  DispatcherBase.prototype.asEvent = function () {
    return this._wrap;
  };
  /**
   * Clears all the subscriptions.
   */


  DispatcherBase.prototype.clear = function () {
    this._subscriptions.splice(0, this._subscriptions.length);
  };

  return DispatcherBase;
}();

exports.DispatcherBase = DispatcherBase;
/**
 * Base class for event lists classes. Implements the get and remove.
 */

var EventListBase =
/** @class */
function () {
  function EventListBase() {
    this._events = {};
  }
  /**
   * Gets the dispatcher associated with the name.
   * @param name The name of the event.
   */


  EventListBase.prototype.get = function (name) {
    var event = this._events[name];

    if (event) {
      return event;
    }

    event = this.createDispatcher();
    this._events[name] = event;
    return event;
  };
  /**
   * Removes the dispatcher associated with the name.
   * @param name The name of the event.
   */


  EventListBase.prototype.remove = function (name) {
    delete this._events[name];
  };

  return EventListBase;
}();

exports.EventListBase = EventListBase;
/**
 * Hides the implementation of the event dispatcher. Will expose methods that
 * are relevent to the event.
 */

var DispatcherWrapper =
/** @class */
function () {
  /**
   * Creates a new EventDispatcherWrapper instance.
   * @param dispatcher The dispatcher.
   */
  function DispatcherWrapper(dispatcher) {
    this._subscribe = function (fn) {
      return dispatcher.subscribe(fn);
    };

    this._unsubscribe = function (fn) {
      return dispatcher.unsubscribe(fn);
    };

    this._one = function (fn) {
      return dispatcher.one(fn);
    };

    this._has = function (fn) {
      return dispatcher.has(fn);
    };

    this._clear = function () {
      return dispatcher.clear();
    };

    this._count = function () {
      return dispatcher.count;
    };
  }

  Object.defineProperty(DispatcherWrapper.prototype, "count", {
    /**
     * Returns the number of subscriptions.
     *
     * @readonly
     * @type {number}
     * @memberOf DispatcherWrapper
     */
    get: function () {
      return this._count();
    },
    enumerable: true,
    configurable: true
  });
  /**
   * Subscribe to the event dispatcher.
   * @param fn The event handler that is called when the event is dispatched.
   * @returns A function that unsubscribes the event handler from the event.
   */

  DispatcherWrapper.prototype.subscribe = function (fn) {
    return this._subscribe(fn);
  };
  /**
   * Subscribe to the event dispatcher.
   * @param fn The event handler that is called when the event is dispatched.
   * @returns A function that unsubscribes the event handler from the event.
   */


  DispatcherWrapper.prototype.sub = function (fn) {
    return this.subscribe(fn);
  };
  /**
   * Unsubscribe from the event dispatcher.
   * @param fn The event handler that is called when the event is dispatched.
   */


  DispatcherWrapper.prototype.unsubscribe = function (fn) {
    this._unsubscribe(fn);
  };
  /**
   * Unsubscribe from the event dispatcher.
   * @param fn The event handler that is called when the event is dispatched.
   */


  DispatcherWrapper.prototype.unsub = function (fn) {
    this.unsubscribe(fn);
  };
  /**
   * Subscribe once to the event with the specified name.
   * @param fn The event handler that is called when the event is dispatched.
   */


  DispatcherWrapper.prototype.one = function (fn) {
    return this._one(fn);
  };
  /**
   * Checks it the event has a subscription for the specified handler.
   * @param fn The event handler.
   */


  DispatcherWrapper.prototype.has = function (fn) {
    return this._has(fn);
  };
  /**
   * Clears all the subscriptions.
   */


  DispatcherWrapper.prototype.clear = function () {
    this._clear();
  };

  return DispatcherWrapper;
}();

exports.DispatcherWrapper = DispatcherWrapper;
},{"./management":"../node_modules/ste-core/dist/management.js","./subscription":"../node_modules/ste-core/dist/subscription.js"}],"../node_modules/ste-core/dist/index.js":[function(require,module,exports) {
"use strict";
/*!
 * Strongly Typed Events for TypeScript - Core
 * https://github.com/KeesCBakker/StronlyTypedEvents/
 * http://keestalkstech.com
 *
 * Copyright Kees C. Bakker / KeesTalksTech
 * Released under the MIT license
 */

Object.defineProperty(exports, "__esModule", {
  value: true
});

var dispatching_1 = require("./dispatching");

exports.DispatcherBase = dispatching_1.DispatcherBase;
exports.DispatcherWrapper = dispatching_1.DispatcherWrapper;
exports.EventListBase = dispatching_1.EventListBase;

var subscription_1 = require("./subscription");

exports.Subscription = subscription_1.Subscription;
},{"./dispatching":"../node_modules/ste-core/dist/dispatching.js","./subscription":"../node_modules/ste-core/dist/subscription.js"}],"../node_modules/ste-events/dist/events.js":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var extendStatics = function (d, b) {
    extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    };

    return extendStatics(d, b);
  };

  return function (d, b) {
    extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var ste_core_1 = require("ste-core");
/**
 * Dispatcher implementation for events. Can be used to subscribe, unsubscribe
 * or dispatch events. Use the ToEvent() method to expose the event.
 */


var EventDispatcher =
/** @class */
function (_super) {
  __extends(EventDispatcher, _super);
  /**
   * Creates a new EventDispatcher instance.
   */


  function EventDispatcher() {
    return _super.call(this) || this;
  }
  /**
   * Dispatches the event.
   * @param sender The sender.
   * @param args The arguments object.
   */


  EventDispatcher.prototype.dispatch = function (sender, args) {
    this._dispatch(false, this, arguments);
  };
  /**
   * Dispatches the events thread.
   * @param sender The sender.
   * @param args The arguments object.
   */


  EventDispatcher.prototype.dispatchAsync = function (sender, args) {
    this._dispatch(true, this, arguments);
  };
  /**
   * Creates an event from the dispatcher. Will return the dispatcher
   * in a wrapper. This will prevent exposure of any dispatcher methods.
   */


  EventDispatcher.prototype.asEvent = function () {
    return _super.prototype.asEvent.call(this);
  };

  return EventDispatcher;
}(ste_core_1.DispatcherBase);

exports.EventDispatcher = EventDispatcher;
/**
 * Similar to EventList, but instead of TArgs, a map of event names ang argument types is provided with TArgsMap.
 */

var NonUniformEventList =
/** @class */
function () {
  function NonUniformEventList() {
    this._events = {};
  }
  /**
   * Gets the dispatcher associated with the name.
   * @param name The name of the event.
   */


  NonUniformEventList.prototype.get = function (name) {
    if (this._events[name]) {
      // @TODO avoid typecasting. Not sure why TS thinks this._events[name] could still be undefined.
      return this._events[name];
    }

    var event = this.createDispatcher();
    this._events[name] = event;
    return event;
  };
  /**
   * Removes the dispatcher associated with the name.
   * @param name The name of the event.
   */


  NonUniformEventList.prototype.remove = function (name) {
    delete this._events[name];
  };
  /**
   * Creates a new dispatcher instance.
   */


  NonUniformEventList.prototype.createDispatcher = function () {
    return new EventDispatcher();
  };

  return NonUniformEventList;
}();

exports.NonUniformEventList = NonUniformEventList;
/**
 * Storage class for multiple events that are accessible by name.
 * Events dispatchers are automatically created.
 */

var EventList =
/** @class */
function (_super) {
  __extends(EventList, _super);
  /**
   * Creates a new EventList instance.
   */


  function EventList() {
    return _super.call(this) || this;
  }
  /**
   * Creates a new dispatcher instance.
   */


  EventList.prototype.createDispatcher = function () {
    return new EventDispatcher();
  };

  return EventList;
}(ste_core_1.EventListBase);

exports.EventList = EventList;
/**
 * Extends objects with event handling capabilities.
 */

var EventHandlingBase =
/** @class */
function () {
  function EventHandlingBase() {
    this._events = new EventList();
  }

  Object.defineProperty(EventHandlingBase.prototype, "events", {
    /**
     * Gets the list with all the event dispatchers.
     */
    get: function () {
      return this._events;
    },
    enumerable: true,
    configurable: true
  });
  /**
   * Subscribes to the event with the specified name.
   * @param name The name of the event.
   * @param fn The event handler.
   */

  EventHandlingBase.prototype.subscribe = function (name, fn) {
    this._events.get(name).subscribe(fn);
  };
  /**
   * Subscribes to the event with the specified name.
   * @param name The name of the event.
   * @param fn The event handler.
   */


  EventHandlingBase.prototype.sub = function (name, fn) {
    this.subscribe(name, fn);
  };
  /**
   * Unsubscribes from the event with the specified name.
   * @param name The name of the event.
   * @param fn The event handler.
   */


  EventHandlingBase.prototype.unsubscribe = function (name, fn) {
    this._events.get(name).unsubscribe(fn);
  };
  /**
   * Unsubscribes from the event with the specified name.
   * @param name The name of the event.
   * @param fn The event handler.
   */


  EventHandlingBase.prototype.unsub = function (name, fn) {
    this.unsubscribe(name, fn);
  };
  /**
   * Subscribes to once the event with the specified name.
   * @param name The name of the event.
   * @param fn The event handler.
   */


  EventHandlingBase.prototype.one = function (name, fn) {
    this._events.get(name).one(fn);
  };
  /**
   * Subscribes to once the event with the specified name.
   * @param name The name of the event.
   * @param fn The event handler.
   */


  EventHandlingBase.prototype.has = function (name, fn) {
    return this._events.get(name).has(fn);
  };

  return EventHandlingBase;
}();

exports.EventHandlingBase = EventHandlingBase;
},{"ste-core":"../node_modules/ste-core/dist/index.js"}],"../node_modules/ste-events/dist/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var events_1 = require("./events");

exports.EventDispatcher = events_1.EventDispatcher;
exports.EventHandlingBase = events_1.EventHandlingBase;
exports.EventList = events_1.EventList;
exports.NonUniformEventList = events_1.NonUniformEventList;
},{"./events":"../node_modules/ste-events/dist/events.js"}],"../node_modules/ste-simple-events/dist/simple-events.js":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var extendStatics = function (d, b) {
    extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    };

    return extendStatics(d, b);
  };

  return function (d, b) {
    extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var ste_core_1 = require("ste-core");
/**
 * The dispatcher handles the storage of subsciptions and facilitates
 * subscription, unsubscription and dispatching of a simple event
 */


var SimpleEventDispatcher =
/** @class */
function (_super) {
  __extends(SimpleEventDispatcher, _super);
  /**
   * Creates a new SimpleEventDispatcher instance.
   */


  function SimpleEventDispatcher() {
    return _super.call(this) || this;
  }
  /**
   * Dispatches the event.
   * @param args The arguments object.
   */


  SimpleEventDispatcher.prototype.dispatch = function (args) {
    this._dispatch(false, this, arguments);
  };
  /**
   * Dispatches the events thread.
   * @param args The arguments object.
   */


  SimpleEventDispatcher.prototype.dispatchAsync = function (args) {
    this._dispatch(true, this, arguments);
  };
  /**
   * Creates an event from the dispatcher. Will return the dispatcher
   * in a wrapper. This will prevent exposure of any dispatcher methods.
   */


  SimpleEventDispatcher.prototype.asEvent = function () {
    return _super.prototype.asEvent.call(this);
  };

  return SimpleEventDispatcher;
}(ste_core_1.DispatcherBase);

exports.SimpleEventDispatcher = SimpleEventDispatcher;
/**
 * Similar to EventList, but instead of TArgs, a map of event names ang argument types is provided with TArgsMap.
 */

var NonUniformSimpleEventList =
/** @class */
function () {
  function NonUniformSimpleEventList() {
    this._events = {};
  }
  /**
   * Gets the dispatcher associated with the name.
   * @param name The name of the event.
   */


  NonUniformSimpleEventList.prototype.get = function (name) {
    if (this._events[name]) {
      // @TODO avoid typecasting. Not sure why TS thinks this._events[name] could still be undefined.
      return this._events[name];
    }

    var event = this.createDispatcher();
    this._events[name] = event;
    return event;
  };
  /**
   * Removes the dispatcher associated with the name.
   * @param name The name of the event.
   */


  NonUniformSimpleEventList.prototype.remove = function (name) {
    delete this._events[name];
  };
  /**
   * Creates a new dispatcher instance.
   */


  NonUniformSimpleEventList.prototype.createDispatcher = function () {
    return new SimpleEventDispatcher();
  };

  return NonUniformSimpleEventList;
}();

exports.NonUniformSimpleEventList = NonUniformSimpleEventList;
/**
 * Storage class for multiple simple events that are accessible by name.
 * Events dispatchers are automatically created.
 */

var SimpleEventList =
/** @class */
function (_super) {
  __extends(SimpleEventList, _super);
  /**
   * Creates a new SimpleEventList instance.
   */


  function SimpleEventList() {
    return _super.call(this) || this;
  }
  /**
   * Creates a new dispatcher instance.
   */


  SimpleEventList.prototype.createDispatcher = function () {
    return new SimpleEventDispatcher();
  };

  return SimpleEventList;
}(ste_core_1.EventListBase);

exports.SimpleEventList = SimpleEventList;
/**
 * Extends objects with simple event handling capabilities.
 */

var SimpleEventHandlingBase =
/** @class */
function () {
  function SimpleEventHandlingBase() {
    this._events = new SimpleEventList();
  }

  Object.defineProperty(SimpleEventHandlingBase.prototype, "events", {
    get: function () {
      return this._events;
    },
    enumerable: true,
    configurable: true
  });
  /**
   * Subscribes to the event with the specified name.
   * @param name The name of the event.
   * @param fn The event handler.
   */

  SimpleEventHandlingBase.prototype.subscribe = function (name, fn) {
    this._events.get(name).subscribe(fn);
  };
  /**
   * Subscribes to the event with the specified name.
   * @param name The name of the event.
   * @param fn The event handler.
   */


  SimpleEventHandlingBase.prototype.sub = function (name, fn) {
    this.subscribe(name, fn);
  };
  /**
   * Subscribes once to the event with the specified name.
   * @param name The name of the event.
   * @param fn The event handler.
   */


  SimpleEventHandlingBase.prototype.one = function (name, fn) {
    this._events.get(name).one(fn);
  };
  /**
   * Checks it the event has a subscription for the specified handler.
   * @param name The name of the event.
   * @param fn The event handler.
   */


  SimpleEventHandlingBase.prototype.has = function (name, fn) {
    return this._events.get(name).has(fn);
  };
  /**
   * Unsubscribes from the event with the specified name.
   * @param name The name of the event.
   * @param fn The event handler.
   */


  SimpleEventHandlingBase.prototype.unsubscribe = function (name, fn) {
    this._events.get(name).unsubscribe(fn);
  };
  /**
   * Unsubscribes from the event with the specified name.
   * @param name The name of the event.
   * @param fn The event handler.
   */


  SimpleEventHandlingBase.prototype.unsub = function (name, fn) {
    this.unsubscribe(name, fn);
  };

  return SimpleEventHandlingBase;
}();

exports.SimpleEventHandlingBase = SimpleEventHandlingBase;
},{"ste-core":"../node_modules/ste-core/dist/index.js"}],"../node_modules/ste-simple-events/dist/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var simple_events_1 = require("./simple-events");

exports.SimpleEventDispatcher = simple_events_1.SimpleEventDispatcher;
exports.SimpleEventHandlingBase = simple_events_1.SimpleEventHandlingBase;
exports.SimpleEventList = simple_events_1.SimpleEventList;
exports.NonUniformSimpleEventList = simple_events_1.NonUniformSimpleEventList;
},{"./simple-events":"../node_modules/ste-simple-events/dist/simple-events.js"}],"../node_modules/ste-signals/dist/signals.js":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var extendStatics = function (d, b) {
    extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    };

    return extendStatics(d, b);
  };

  return function (d, b) {
    extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var ste_core_1 = require("ste-core");
/**
 * The dispatcher handles the storage of subsciptions and facilitates
 * subscription, unsubscription and dispatching of a signal event.
 */


var SignalDispatcher =
/** @class */
function (_super) {
  __extends(SignalDispatcher, _super);
  /**
   * Creates a new SignalDispatcher instance.
   */


  function SignalDispatcher() {
    return _super.call(this) || this;
  }
  /**
   * Dispatches the signal.
   */


  SignalDispatcher.prototype.dispatch = function () {
    this._dispatch(false, this, arguments);
  };
  /**
   * Dispatches the signal threaded.
   */


  SignalDispatcher.prototype.dispatchAsync = function () {
    this._dispatch(true, this, arguments);
  };
  /**
   * Creates an event from the dispatcher. Will return the dispatcher
   * in a wrapper. This will prevent exposure of any dispatcher methods.
   */


  SignalDispatcher.prototype.asEvent = function () {
    return _super.prototype.asEvent.call(this);
  };

  return SignalDispatcher;
}(ste_core_1.DispatcherBase);

exports.SignalDispatcher = SignalDispatcher;
/**
 * Storage class for multiple signal events that are accessible by name.
 * Events dispatchers are automatically created.
 */

var SignalList =
/** @class */
function (_super) {
  __extends(SignalList, _super);
  /**
   * Creates a new SignalList instance.
   */


  function SignalList() {
    return _super.call(this) || this;
  }
  /**
   * Creates a new dispatcher instance.
   */


  SignalList.prototype.createDispatcher = function () {
    return new SignalDispatcher();
  };

  return SignalList;
}(ste_core_1.EventListBase);

exports.SignalList = SignalList;
/**
 * Extends objects with signal event handling capabilities.
 */

var SignalHandlingBase =
/** @class */
function () {
  function SignalHandlingBase() {
    this._events = new SignalList();
  }

  Object.defineProperty(SignalHandlingBase.prototype, "events", {
    get: function () {
      return this._events;
    },
    enumerable: true,
    configurable: true
  });
  /**
   * Subscribes once to the event with the specified name.
   * @param name The name of the event.
   * @param fn The event handler.
   */

  SignalHandlingBase.prototype.one = function (name, fn) {
    this._events.get(name).one(fn);
  };
  /**
   * Checks it the event has a subscription for the specified handler.
   * @param name The name of the event.
   * @param fn The event handler.
   */


  SignalHandlingBase.prototype.has = function (name, fn) {
    return this._events.get(name).has(fn);
  };
  /**
   * Subscribes to the event with the specified name.
   * @param name The name of the event.
   * @param fn The event handler.
   */


  SignalHandlingBase.prototype.subscribe = function (name, fn) {
    this._events.get(name).subscribe(fn);
  };
  /**
   * Subscribes to the event with the specified name.
   * @param name The name of the event.
   * @param fn The event handler.
   */


  SignalHandlingBase.prototype.sub = function (name, fn) {
    this.subscribe(name, fn);
  };
  /**
   * Unsubscribes from the event with the specified name.
   * @param name The name of the event.
   * @param fn The event handler.
   */


  SignalHandlingBase.prototype.unsubscribe = function (name, fn) {
    this._events.get(name).unsubscribe(fn);
  };
  /**
   * Unsubscribes from the event with the specified name.
   * @param name The name of the event.
   * @param fn The event handler.
   */


  SignalHandlingBase.prototype.unsub = function (name, fn) {
    this.unsubscribe(name, fn);
  };

  return SignalHandlingBase;
}();

exports.SignalHandlingBase = SignalHandlingBase;
},{"ste-core":"../node_modules/ste-core/dist/index.js"}],"../node_modules/ste-signals/dist/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var signals_1 = require("./signals");

exports.SignalDispatcher = signals_1.SignalDispatcher;
exports.SignalHandlingBase = signals_1.SignalHandlingBase;
exports.SignalList = signals_1.SignalList;
},{"./signals":"../node_modules/ste-signals/dist/signals.js"}],"../node_modules/strongly-typed-events/dist/index.js":[function(require,module,exports) {
"use strict";
/*!
 * Strongly Typed Events for TypeScript
 * https://github.com/KeesCBakker/StronlyTypedEvents/
 * http://keestalkstech.com
 *
 * Copyright Kees C. Bakker / KeesTalksTech
 * Released under the MIT license
 */

Object.defineProperty(exports, "__esModule", {
  value: true
});

var ste_core_1 = require("ste-core");

exports.DispatcherBase = ste_core_1.DispatcherBase;
exports.DispatcherWrapper = ste_core_1.DispatcherWrapper;
exports.EventListBase = ste_core_1.EventListBase;
exports.Subscription = ste_core_1.Subscription;

var ste_events_1 = require("ste-events");

exports.EventDispatcher = ste_events_1.EventDispatcher;
exports.EventHandlingBase = ste_events_1.EventHandlingBase;
exports.EventList = ste_events_1.EventList;
exports.NonUniformEventList = ste_events_1.NonUniformEventList;

var ste_simple_events_1 = require("ste-simple-events");

exports.SimpleEventDispatcher = ste_simple_events_1.SimpleEventDispatcher;
exports.SimpleEventHandlingBase = ste_simple_events_1.SimpleEventHandlingBase;
exports.SimpleEventList = ste_simple_events_1.SimpleEventList;
exports.NonUniformSimpleEventList = ste_simple_events_1.NonUniformSimpleEventList;

var ste_signals_1 = require("ste-signals");

exports.SignalDispatcher = ste_signals_1.SignalDispatcher;
exports.SignalHandlingBase = ste_signals_1.SignalHandlingBase;
exports.SignalList = ste_signals_1.SignalList;
},{"ste-core":"../node_modules/ste-core/dist/index.js","ste-events":"../node_modules/ste-events/dist/index.js","ste-simple-events":"../node_modules/ste-simple-events/dist/index.js","ste-signals":"../node_modules/ste-signals/dist/index.js"}],"Handlers/KeyboardHandler.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var strongly_typed_events_1 = require("strongly-typed-events");

var KeyboardHandler =
/** @class */
function () {
  //public onKeyPressed = new EventDispatcher<KeyboardEvent, Key>();
  //public onKeyDown = new SimpleEventDispatcher<Key>();
  function KeyboardHandler() {
    this.keys = new Map();
    this.onKeyDown = new strongly_typed_events_1.SimpleEventDispatcher();
    this.onKeyUp = new strongly_typed_events_1.SimpleEventDispatcher();
    this.onKeyPressed = new strongly_typed_events_1.SimpleEventDispatcher();
    this.addEventListners();
  }

  KeyboardHandler.prototype.addEventListners = function () {
    document.addEventListener("keydown", function (event) {
      this.doOnKeyDown(event);
    }.bind(this));
    document.addEventListener("keyup", function (event) {
      this.doOnKeyUp(event);
    }.bind(this));
  };

  KeyboardHandler.prototype.doOnKeyDown = function (event) {
    var keyCode = event.keyCode; //if (this.keys.has(keyCode)) 
    //return;

    this.keys.set(keyCode, event); //this.onKeyDown.dispatch(keyCode as Key);
    //this.onKeyPressed.dispatch(event as KeyboardEvent, keyCode as Key);

    this.onKeyDown.dispatch(event); //console.log("key pressed = " + Key[keyCode]);
    //console.log(this.keys.get(Key.Enter));  
  };

  KeyboardHandler.prototype.doOnKeyUp = function (event) {
    var keyCode = event.keyCode;
    if (!this.keys.has(keyCode)) return;
    this.keys.delete(keyCode);
    this.onKeyUp.dispatch(event); //console.log("key released = " + Key[keyCode]);

    this.update();
  };

  KeyboardHandler.prototype.update = function () {
    var _this = this;

    if (this.keys.size > 0) this.keys.forEach(function (value) {
      return _this.onKeyPressed.dispatch(value);
    });
  };

  KeyboardHandler.prototype.getKey = function (keyCode) {
    return this.keys.has(keyCode);
  };

  KeyboardHandler.prototype.getKeyDown = function (keyCode) {
    if (this.keys.has(keyCode)) {
      return this.keys.get(keyCode).repeat ? false : true;
    }

    return false;
  };

  return KeyboardHandler;
}();

exports.default = KeyboardHandler;
},{"strongly-typed-events":"../node_modules/strongly-typed-events/dist/index.js"}],"../node_modules/parcel/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
},{}]},{},["../node_modules/parcel/src/builtins/hmr-runtime.js","Handlers/KeyboardHandler.ts"], null)
//# sourceMappingURL=/KeyboardHandler.ff444e92.js.map