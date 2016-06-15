(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Events = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";
var EventArgs = (function () {
    function EventArgs(name, sender) {
        this.name = name;
        this.sender = sender;
        this.isPrevented = false;
    }
    EventArgs.prototype.preventDefault = function () {
        this.isPrevented = true;
    };
    EventArgs.prototype.isDefaultPrevented = function () {
        return this.isPrevented;
    };
    return EventArgs;
}());
exports.EventArgs = EventArgs;

},{}],2:[function(require,module,exports){
"use strict";
var EventArgs_1 = require("./EventArgs");
var Events = (function () {
    function Events() {
    }
    Events.clear = function () {
        var events = Events.events;
        for (var event_1 in events) {
            if (events.hasOwnProperty(event_1)) {
                delete events[event_1];
            }
        }
        return this;
    };
    Events.create = function (name, sender) {
        return new EventArgs_1.EventArgs(name, sender);
    };
    Events.off = function (listener) {
        var events = Events.events;
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
    Events.on = function (event, listener, options, context) {
        if (options === void 0) { options = {}; }
        var eventNames = event.split(/[,\s]+/);
        var subscriptions = [];
        var uid;
        for (var _i = 0, eventNames_1 = eventNames; _i < eventNames_1.length; _i++) {
            var eventName = eventNames_1[_i];
            uid = this.generateUid();
            if (!this.events[eventName]) {
                this.events[eventName] = [];
            }
            var subscriber = {
                context: context,
                listener: listener,
                priority: 0 || options.priority,
                uid: uid
            };
            var events = this.events[eventName];
            events.push(subscriber);
            events = events.sort(function (a, b) {
                return (a.priority > b.priority ? -1 : a.priority === b.priority ? 0 : 1);
            });
            this.events[eventName] = events;
            subscriptions.push({
                remove: function () {
                    return Events.off(uid);
                },
                uid: uid
            });
        }
        if (eventNames.length > 1) {
            return subscriptions;
        }
        return subscriptions[0];
    };
    Events.trigger = function (event, args) {
        var eventArgs = null;
        var eventNames = [];
        if (event instanceof EventArgs_1.EventArgs) {
            eventArgs = event;
            eventNames = event.name.split(/[,\s]+/);
        }
        else if (typeof event === "string") {
            eventNames = event.split(/[,\s]+/);
        }
        for (var _i = 0, eventNames_2 = eventNames; _i < eventNames_2.length; _i++) {
            var eventName = eventNames_2[_i];
            if (!this.events[eventName]) {
                continue;
            }
            var e = (eventArgs === null) ? Events.create(eventName) : eventArgs;
            var subscribers = this.events[eventName];
            for (var _a = 0, subscribers_1 = subscribers; _a < subscribers_1.length; _a++) {
                var subscriber = subscribers_1[_a];
                if (e.isDefaultPrevented()) {
                    continue;
                }
                subscriber.listener.call(subscriber.context, e, args);
            }
        }
        return this;
    };
    Events.generateUid = function () {
        var d = new Date().getTime();
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
            d = Math.floor(d / 16);
            var r = (d + Math.random() * 16) % 16 | 0;
            return (c === "x" ? r : (r & 0x7 | 0x8)).toString(16);
        });
    };
    Events.events = {};
    return Events;
}());
exports.Events = Events;

},{"./EventArgs":1}]},{},[2])(2)
});

