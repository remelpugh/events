(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Events = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var utils = require("./Utilities");
var Events = (function () {
    function Events() {
        this.events = {};
    }
    Events.prototype.clear = function () {
        var events = this.events;
        for (var event_1 in events) {
            if (events.hasOwnProperty(event_1)) {
                delete events[event_1];
            }
        }
        return this;
    };
    Events.prototype.off = function (listener) {
        var events = this.events;
        for (var event_2 in events) {
            if (events.hasOwnProperty(event_2)) {
                for (var i = 0, length_1 = events[event_2].length; i < length_1; i++) {
                    if (typeof (listener) === "string") {
                        if (events[event_2][i].uid === listener) {
                            events[event_2].splice(i, 1);
                            return this;
                        }
                    }
                    if (typeof (listener) === "function") {
                        if (events[event_2][i].listener === listener) {
                            events[event_2].splice(i, 1);
                            return this;
                        }
                    }
                }
            }
        }
        return this;
    };
    Events.prototype.on = function (event, listener, context) {
        var _this = this;
        var eventNames = event.split(",");
        var uid = utils.generateUUID();
        for (var _i = 0; _i < eventNames.length; _i++) {
            var eventName = eventNames[_i];
            if (!this.events[eventName]) {
                this.events[eventName] = [];
            }
            var subscriber = void 0;
            subscriber = {
                context: context,
                listener: listener,
                uid: uid
            };
            this.events[eventName].push(subscriber);
        }
        return {
            remove: function () {
                return _this.off(uid);
            },
            uid: uid
        };
    };
    Events.prototype.trigger = function (event, args) {
        var eventNames = event.split(",");
        for (var _i = 0; _i < eventNames.length; _i++) {
            var eventName = eventNames[_i];
            if (!this.events[eventName]) {
                continue;
            }
            var subscribers = this.events[eventName];
            var length_2 = subscribers ? subscribers.length : 0;
            while (length_2--) {
                var subscriber = subscribers[length_2];
                subscriber.listener.call(subscriber.context, eventName, args);
            }
        }
        return this;
    };
    return Events;
})();
var events = new Events();
module.exports = events;

},{"./Utilities":2}],2:[function(require,module,exports){
var Utilities;
(function (Utilities) {
    Utilities.generateUUID = function () {
        var d = new Date().getTime();
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c === "x" ? r : (r & 0x7 | 0x8)).toString(16);
        });
    };
})(Utilities || (Utilities = {}));
module.exports = Utilities;

},{}]},{},[1])(1)
});

