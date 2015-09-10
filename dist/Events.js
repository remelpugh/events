(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Events = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var utils = require("./Utilities");
var Events = (function () {
    function Events() {
        this.events = {};
    }
    Events.prototype.clear = function () {
        var events = this.events;
        for (var event in events) {
            if (events.hasOwnProperty(event)) {
                delete events[event];
            }
        }
        return this;
    };
    Events.prototype.off = function (listener) {
        var events = this.events;
        for (var event in events) {
            if (events.hasOwnProperty(event)) {
                for (var i = 0, length = events[event].length; i < length; i++) {
                    if (typeof (listener) === "string") {
                        if (events[event][i].uid === listener) {
                            events[event].splice(i, 1);
                            return this;
                        }
                    }
                    if (typeof (listener) === "function") {
                        if (events[event][i].listener === listener) {
                            events[event].splice(i, 1);
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
        if (!this.events[event]) {
            this.events[event] = [];
        }
        var subscriber;
        var uid = utils.generateUUID();
        subscriber = {
            context: context,
            listener: listener,
            uid: uid
        };
        this.events[event].push(subscriber);
        return {
            remove: function () {
                return _this.off(uid);
            },
            uid: uid
        };
    };
    Events.prototype.trigger = function (event, args) {
        if (!this.events[event]) {
            return this;
        }
        var subscribers = this.events[event];
        var length = subscribers ? subscribers.length : 0;
        while (length--) {
            var subscriber = subscribers[length];
            subscriber.listener.call(subscriber.context, event, args);
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

