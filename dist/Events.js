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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi9FdmVudHMuanMiLCJVdGlsaXRpZXMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwidmFyIHV0aWxzID0gcmVxdWlyZShcIi4vVXRpbGl0aWVzXCIpO1xudmFyIEV2ZW50cyA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gRXZlbnRzKCkge1xuICAgICAgICB0aGlzLmV2ZW50cyA9IHt9O1xuICAgIH1cbiAgICBFdmVudHMucHJvdG90eXBlLmNsZWFyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZXZlbnRzID0gdGhpcy5ldmVudHM7XG4gICAgICAgIGZvciAodmFyIGV2ZW50IGluIGV2ZW50cykge1xuICAgICAgICAgICAgaWYgKGV2ZW50cy5oYXNPd25Qcm9wZXJ0eShldmVudCkpIHtcbiAgICAgICAgICAgICAgICBkZWxldGUgZXZlbnRzW2V2ZW50XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIEV2ZW50cy5wcm90b3R5cGUub2ZmID0gZnVuY3Rpb24gKGxpc3RlbmVyKSB7XG4gICAgICAgIHZhciBldmVudHMgPSB0aGlzLmV2ZW50cztcbiAgICAgICAgZm9yICh2YXIgZXZlbnQgaW4gZXZlbnRzKSB7XG4gICAgICAgICAgICBpZiAoZXZlbnRzLmhhc093blByb3BlcnR5KGV2ZW50KSkge1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwLCBsZW5ndGggPSBldmVudHNbZXZlbnRdLmxlbmd0aDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgKGxpc3RlbmVyKSA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGV2ZW50c1tldmVudF1baV0udWlkID09PSBsaXN0ZW5lcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50c1tldmVudF0uc3BsaWNlKGksIDEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgKGxpc3RlbmVyKSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZXZlbnRzW2V2ZW50XVtpXS5saXN0ZW5lciA9PT0gbGlzdGVuZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBldmVudHNbZXZlbnRdLnNwbGljZShpLCAxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIEV2ZW50cy5wcm90b3R5cGUub24gPSBmdW5jdGlvbiAoZXZlbnQsIGxpc3RlbmVyLCBjb250ZXh0KSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIGlmICghdGhpcy5ldmVudHNbZXZlbnRdKSB7XG4gICAgICAgICAgICB0aGlzLmV2ZW50c1tldmVudF0gPSBbXTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgc3Vic2NyaWJlcjtcbiAgICAgICAgdmFyIHVpZCA9IHV0aWxzLmdlbmVyYXRlVVVJRCgpO1xuICAgICAgICBzdWJzY3JpYmVyID0ge1xuICAgICAgICAgICAgY29udGV4dDogY29udGV4dCxcbiAgICAgICAgICAgIGxpc3RlbmVyOiBsaXN0ZW5lcixcbiAgICAgICAgICAgIHVpZDogdWlkXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuZXZlbnRzW2V2ZW50XS5wdXNoKHN1YnNjcmliZXIpO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcmVtb3ZlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF90aGlzLm9mZih1aWQpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHVpZDogdWlkXG4gICAgICAgIH07XG4gICAgfTtcbiAgICBFdmVudHMucHJvdG90eXBlLnRyaWdnZXIgPSBmdW5jdGlvbiAoZXZlbnQsIGFyZ3MpIHtcbiAgICAgICAgaWYgKCF0aGlzLmV2ZW50c1tldmVudF0pIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG4gICAgICAgIHZhciBzdWJzY3JpYmVycyA9IHRoaXMuZXZlbnRzW2V2ZW50XTtcbiAgICAgICAgdmFyIGxlbmd0aCA9IHN1YnNjcmliZXJzID8gc3Vic2NyaWJlcnMubGVuZ3RoIDogMDtcbiAgICAgICAgd2hpbGUgKGxlbmd0aC0tKSB7XG4gICAgICAgICAgICB2YXIgc3Vic2NyaWJlciA9IHN1YnNjcmliZXJzW2xlbmd0aF07XG4gICAgICAgICAgICBzdWJzY3JpYmVyLmxpc3RlbmVyLmNhbGwoc3Vic2NyaWJlci5jb250ZXh0LCBldmVudCwgYXJncyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICByZXR1cm4gRXZlbnRzO1xufSkoKTtcbnZhciBldmVudHMgPSBuZXcgRXZlbnRzKCk7XG5tb2R1bGUuZXhwb3J0cyA9IGV2ZW50cztcbiIsInZhciBVdGlsaXRpZXM7XG4oZnVuY3Rpb24gKFV0aWxpdGllcykge1xuICAgIFV0aWxpdGllcy5nZW5lcmF0ZVVVSUQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBkID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gICAgICAgIHJldHVybiBcInh4eHh4eHh4LXh4eHgtNHh4eC15eHh4LXh4eHh4eHh4eHh4eFwiLnJlcGxhY2UoL1t4eV0vZywgZnVuY3Rpb24gKGMpIHtcbiAgICAgICAgICAgIHZhciByID0gKGQgKyBNYXRoLnJhbmRvbSgpICogMTYpICUgMTYgfCAwO1xuICAgICAgICAgICAgZCA9IE1hdGguZmxvb3IoZCAvIDE2KTtcbiAgICAgICAgICAgIHJldHVybiAoYyA9PT0gXCJ4XCIgPyByIDogKHIgJiAweDcgfCAweDgpKS50b1N0cmluZygxNik7XG4gICAgICAgIH0pO1xuICAgIH07XG59KShVdGlsaXRpZXMgfHwgKFV0aWxpdGllcyA9IHt9KSk7XG5tb2R1bGUuZXhwb3J0cyA9IFV0aWxpdGllcztcbiJdfQ==
