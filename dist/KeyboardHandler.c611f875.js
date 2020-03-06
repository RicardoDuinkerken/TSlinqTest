parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"ZHt3":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var t=function(){function t(t){this.unsub=t,this.propagationStopped=!1}return t.prototype.stopPropagation=function(){this.propagationStopped=!0},t}();exports.EventManagement=t;
},{}],"BhDi":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=function(){function e(e,t){this.handler=e,this.isOnce=t,this.isExecuted=!1}return e.prototype.execute=function(e,t,i){if(!this.isOnce||!this.isExecuted){this.isExecuted=!0;var s=this.handler;e?setTimeout(function(){s.apply(t,i)},1):s.apply(t,i)}},e}();exports.Subscription=e;
},{}],"OuRK":[function(require,module,exports) {
"use strict";var t=this&&this.__spreadArrays||function(){for(var t=0,n=0,r=arguments.length;n<r;n++)t+=arguments[n].length;var e=Array(t),s=0;for(n=0;n<r;n++)for(var i=arguments[n],u=0,o=i.length;u<o;u++,s++)e[s]=i[u];return e};Object.defineProperty(exports,"__esModule",{value:!0});var n=require("./management"),r=require("./subscription"),e=function(){function e(){this._wrap=new i(this),this._subscriptions=new Array}return Object.defineProperty(e.prototype,"count",{get:function(){return this._subscriptions.length},enumerable:!0,configurable:!0}),e.prototype.subscribe=function(t){var n=this;return t&&this._subscriptions.push(new r.Subscription(t,!1)),function(){n.unsubscribe(t)}},e.prototype.sub=function(t){return this.subscribe(t)},e.prototype.one=function(t){var n=this;return t&&this._subscriptions.push(new r.Subscription(t,!0)),function(){n.unsubscribe(t)}},e.prototype.has=function(t){return!!t&&this._subscriptions.some(function(n){return n.handler==t})},e.prototype.unsubscribe=function(t){if(t)for(var n=0;n<this._subscriptions.length;n++)if(this._subscriptions[n].handler==t){this._subscriptions.splice(n,1);break}},e.prototype.unsub=function(t){this.unsubscribe(t)},e.prototype._dispatch=function(r,e,s){for(var i=this,u=function(t){var u=new n.EventManagement(function(){return i.unsub(t.handler)}),c=Array.prototype.slice.call(s);if(c.push(u),t.execute(r,e,c),o.cleanup(t),!r&&u.propagationStopped)return"break"},o=this,c=0,p=t(this._subscriptions);c<p.length;c++){if("break"===u(p[c]))break}},e.prototype.cleanup=function(t){if(t.isOnce&&t.isExecuted){var n=this._subscriptions.indexOf(t);n>-1&&this._subscriptions.splice(n,1)}},e.prototype.asEvent=function(){return this._wrap},e.prototype.clear=function(){this._subscriptions.splice(0,this._subscriptions.length)},e}();exports.DispatcherBase=e;var s=function(){function t(){this._events={}}return t.prototype.get=function(t){var n=this._events[t];return n||(n=this.createDispatcher(),this._events[t]=n,n)},t.prototype.remove=function(t){delete this._events[t]},t}();exports.EventListBase=s;var i=function(){function t(t){this._subscribe=function(n){return t.subscribe(n)},this._unsubscribe=function(n){return t.unsubscribe(n)},this._one=function(n){return t.one(n)},this._has=function(n){return t.has(n)},this._clear=function(){return t.clear()},this._count=function(){return t.count}}return Object.defineProperty(t.prototype,"count",{get:function(){return this._count()},enumerable:!0,configurable:!0}),t.prototype.subscribe=function(t){return this._subscribe(t)},t.prototype.sub=function(t){return this.subscribe(t)},t.prototype.unsubscribe=function(t){this._unsubscribe(t)},t.prototype.unsub=function(t){this.unsubscribe(t)},t.prototype.one=function(t){return this._one(t)},t.prototype.has=function(t){return this._has(t)},t.prototype.clear=function(){this._clear()},t}();exports.DispatcherWrapper=i;
},{"./management":"ZHt3","./subscription":"BhDi"}],"CAoX":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("./dispatching");exports.DispatcherBase=e.DispatcherBase,exports.DispatcherWrapper=e.DispatcherWrapper,exports.EventListBase=e.EventListBase;var r=require("./subscription");exports.Subscription=r.Subscription;
},{"./dispatching":"OuRK","./subscription":"BhDi"}],"Xwg8":[function(require,module,exports) {
"use strict";var t=this&&this.__extends||function(){var t=function(e,n){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(e,n)};return function(e,n){function r(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(r.prototype=n.prototype,new r)}}();Object.defineProperty(exports,"__esModule",{value:!0});var e=require("ste-core"),n=function(e){function n(){return e.call(this)||this}return t(n,e),n.prototype.dispatch=function(t,e){this._dispatch(!1,this,arguments)},n.prototype.dispatchAsync=function(t,e){this._dispatch(!0,this,arguments)},n.prototype.asEvent=function(){return e.prototype.asEvent.call(this)},n}(e.DispatcherBase);exports.EventDispatcher=n;var r=function(){function t(){this._events={}}return t.prototype.get=function(t){if(this._events[t])return this._events[t];var e=this.createDispatcher();return this._events[t]=e,e},t.prototype.remove=function(t){delete this._events[t]},t.prototype.createDispatcher=function(){return new n},t}();exports.NonUniformEventList=r;var o=function(e){function r(){return e.call(this)||this}return t(r,e),r.prototype.createDispatcher=function(){return new n},r}(e.EventListBase);exports.EventList=o;var s=function(){function t(){this._events=new o}return Object.defineProperty(t.prototype,"events",{get:function(){return this._events},enumerable:!0,configurable:!0}),t.prototype.subscribe=function(t,e){this._events.get(t).subscribe(e)},t.prototype.sub=function(t,e){this.subscribe(t,e)},t.prototype.unsubscribe=function(t,e){this._events.get(t).unsubscribe(e)},t.prototype.unsub=function(t,e){this.unsubscribe(t,e)},t.prototype.one=function(t,e){this._events.get(t).one(e)},t.prototype.has=function(t,e){return this._events.get(t).has(e)},t}();exports.EventHandlingBase=s;
},{"ste-core":"CAoX"}],"MjR0":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("./events");exports.EventDispatcher=e.EventDispatcher,exports.EventHandlingBase=e.EventHandlingBase,exports.EventList=e.EventList,exports.NonUniformEventList=e.NonUniformEventList;
},{"./events":"Xwg8"}],"y7sL":[function(require,module,exports) {
"use strict";var t=this&&this.__extends||function(){var t=function(e,n){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(e,n)};return function(e,n){function r(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(r.prototype=n.prototype,new r)}}();Object.defineProperty(exports,"__esModule",{value:!0});var e=require("ste-core"),n=function(e){function n(){return e.call(this)||this}return t(n,e),n.prototype.dispatch=function(t){this._dispatch(!1,this,arguments)},n.prototype.dispatchAsync=function(t){this._dispatch(!0,this,arguments)},n.prototype.asEvent=function(){return e.prototype.asEvent.call(this)},n}(e.DispatcherBase);exports.SimpleEventDispatcher=n;var r=function(){function t(){this._events={}}return t.prototype.get=function(t){if(this._events[t])return this._events[t];var e=this.createDispatcher();return this._events[t]=e,e},t.prototype.remove=function(t){delete this._events[t]},t.prototype.createDispatcher=function(){return new n},t}();exports.NonUniformSimpleEventList=r;var o=function(e){function r(){return e.call(this)||this}return t(r,e),r.prototype.createDispatcher=function(){return new n},r}(e.EventListBase);exports.SimpleEventList=o;var i=function(){function t(){this._events=new o}return Object.defineProperty(t.prototype,"events",{get:function(){return this._events},enumerable:!0,configurable:!0}),t.prototype.subscribe=function(t,e){this._events.get(t).subscribe(e)},t.prototype.sub=function(t,e){this.subscribe(t,e)},t.prototype.one=function(t,e){this._events.get(t).one(e)},t.prototype.has=function(t,e){return this._events.get(t).has(e)},t.prototype.unsubscribe=function(t,e){this._events.get(t).unsubscribe(e)},t.prototype.unsub=function(t,e){this.unsubscribe(t,e)},t}();exports.SimpleEventHandlingBase=i;
},{"ste-core":"CAoX"}],"WWWf":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("./simple-events");exports.SimpleEventDispatcher=e.SimpleEventDispatcher,exports.SimpleEventHandlingBase=e.SimpleEventHandlingBase,exports.SimpleEventList=e.SimpleEventList,exports.NonUniformSimpleEventList=e.NonUniformSimpleEventList;
},{"./simple-events":"y7sL"}],"Bt9s":[function(require,module,exports) {
"use strict";var t=this&&this.__extends||function(){var t=function(e,n){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(e,n)};return function(e,n){function r(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(r.prototype=n.prototype,new r)}}();Object.defineProperty(exports,"__esModule",{value:!0});var e=require("ste-core"),n=function(e){function n(){return e.call(this)||this}return t(n,e),n.prototype.dispatch=function(){this._dispatch(!1,this,arguments)},n.prototype.dispatchAsync=function(){this._dispatch(!0,this,arguments)},n.prototype.asEvent=function(){return e.prototype.asEvent.call(this)},n}(e.DispatcherBase);exports.SignalDispatcher=n;var r=function(e){function r(){return e.call(this)||this}return t(r,e),r.prototype.createDispatcher=function(){return new n},r}(e.EventListBase);exports.SignalList=r;var o=function(){function t(){this._events=new r}return Object.defineProperty(t.prototype,"events",{get:function(){return this._events},enumerable:!0,configurable:!0}),t.prototype.one=function(t,e){this._events.get(t).one(e)},t.prototype.has=function(t,e){return this._events.get(t).has(e)},t.prototype.subscribe=function(t,e){this._events.get(t).subscribe(e)},t.prototype.sub=function(t,e){this.subscribe(t,e)},t.prototype.unsubscribe=function(t,e){this._events.get(t).unsubscribe(e)},t.prototype.unsub=function(t,e){this.unsubscribe(t,e)},t}();exports.SignalHandlingBase=o;
},{"ste-core":"CAoX"}],"mVqA":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("./signals");exports.SignalDispatcher=e.SignalDispatcher,exports.SignalHandlingBase=e.SignalHandlingBase,exports.SignalList=e.SignalList;
},{"./signals":"Bt9s"}],"nYY3":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("ste-core");exports.DispatcherBase=e.DispatcherBase,exports.DispatcherWrapper=e.DispatcherWrapper,exports.EventListBase=e.EventListBase,exports.Subscription=e.Subscription;var t=require("ste-events");exports.EventDispatcher=t.EventDispatcher,exports.EventHandlingBase=t.EventHandlingBase,exports.EventList=t.EventList,exports.NonUniformEventList=t.NonUniformEventList;var s=require("ste-simple-events");exports.SimpleEventDispatcher=s.SimpleEventDispatcher,exports.SimpleEventHandlingBase=s.SimpleEventHandlingBase,exports.SimpleEventList=s.SimpleEventList,exports.NonUniformSimpleEventList=s.NonUniformSimpleEventList;var i=require("ste-signals");exports.SignalDispatcher=i.SignalDispatcher,exports.SignalHandlingBase=i.SignalHandlingBase,exports.SignalList=i.SignalList;
},{"ste-core":"CAoX","ste-events":"MjR0","ste-simple-events":"WWWf","ste-signals":"mVqA"}],"nUYZ":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("strongly-typed-events"),t=function(){function t(){this.keys=new Map,this.onKeyDown=new e.SimpleEventDispatcher,this.onKeyUp=new e.SimpleEventDispatcher,this.onKeyPressed=new e.SimpleEventDispatcher,this.addEventListners()}return t.prototype.addEventListners=function(){document.addEventListener("keydown",function(e){this.doOnKeyDown(e)}.bind(this)),document.addEventListener("keyup",function(e){this.doOnKeyUp(e)}.bind(this))},t.prototype.doOnKeyDown=function(e){var t=e.keyCode;this.keys.set(t,e),this.onKeyDown.dispatch(e)},t.prototype.doOnKeyUp=function(e){var t=e.keyCode;this.keys.has(t)&&(this.keys.delete(t),this.onKeyUp.dispatch(e),this.update())},t.prototype.update=function(){var e=this;this.keys.size>0&&this.keys.forEach(function(t){return e.onKeyPressed.dispatch(t)})},t.prototype.getKey=function(e){return this.keys.has(e)},t.prototype.getKeyDown=function(e){return!!this.keys.has(e)&&!this.keys.get(e).repeat},t}();exports.default=t;
},{"strongly-typed-events":"nYY3"}]},{},["nUYZ"], null)