!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.Events=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
                _this.off(uid);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFxub2RlX21vZHVsZXNcXGJyb3dzZXJpZnlcXG5vZGVfbW9kdWxlc1xcYnJvd3Nlci1wYWNrXFxfcHJlbHVkZS5qcyIsIi4uXFxFdmVudHMuanMiLCJVdGlsaXRpZXMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwidmFyIHV0aWxzID0gcmVxdWlyZShcIi4vVXRpbGl0aWVzXCIpO1xudmFyIEV2ZW50cyA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gRXZlbnRzKCkge1xuICAgICAgICB0aGlzLmV2ZW50cyA9IHt9O1xuICAgIH1cbiAgICBFdmVudHMucHJvdG90eXBlLmNsZWFyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZXZlbnRzID0gdGhpcy5ldmVudHM7XG4gICAgICAgIGZvciAodmFyIGV2ZW50IGluIGV2ZW50cykge1xuICAgICAgICAgICAgaWYgKGV2ZW50cy5oYXNPd25Qcm9wZXJ0eShldmVudCkpIHtcbiAgICAgICAgICAgICAgICBkZWxldGUgZXZlbnRzW2V2ZW50XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIEV2ZW50cy5wcm90b3R5cGUub2ZmID0gZnVuY3Rpb24gKGxpc3RlbmVyKSB7XG4gICAgICAgIHZhciBldmVudHMgPSB0aGlzLmV2ZW50cztcbiAgICAgICAgZm9yICh2YXIgZXZlbnQgaW4gZXZlbnRzKSB7XG4gICAgICAgICAgICBpZiAoZXZlbnRzLmhhc093blByb3BlcnR5KGV2ZW50KSkge1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwLCBsZW5ndGggPSBldmVudHNbZXZlbnRdLmxlbmd0aDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgKGxpc3RlbmVyKSA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGV2ZW50c1tldmVudF1baV0udWlkID09PSBsaXN0ZW5lcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50c1tldmVudF0uc3BsaWNlKGksIDEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgKGxpc3RlbmVyKSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZXZlbnRzW2V2ZW50XVtpXS5saXN0ZW5lciA9PT0gbGlzdGVuZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBldmVudHNbZXZlbnRdLnNwbGljZShpLCAxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIEV2ZW50cy5wcm90b3R5cGUub24gPSBmdW5jdGlvbiAoZXZlbnQsIGxpc3RlbmVyLCBjb250ZXh0KSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIGlmICghdGhpcy5ldmVudHNbZXZlbnRdKSB7XG4gICAgICAgICAgICB0aGlzLmV2ZW50c1tldmVudF0gPSBbXTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgc3Vic2NyaWJlcjtcbiAgICAgICAgdmFyIHVpZCA9IHV0aWxzLmdlbmVyYXRlVVVJRCgpO1xuICAgICAgICBzdWJzY3JpYmVyID0ge1xuICAgICAgICAgICAgY29udGV4dDogY29udGV4dCxcbiAgICAgICAgICAgIGxpc3RlbmVyOiBsaXN0ZW5lcixcbiAgICAgICAgICAgIHVpZDogdWlkXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuZXZlbnRzW2V2ZW50XS5wdXNoKHN1YnNjcmliZXIpO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcmVtb3ZlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMub2ZmKHVpZCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdWlkOiB1aWRcbiAgICAgICAgfTtcbiAgICB9O1xuICAgIEV2ZW50cy5wcm90b3R5cGUudHJpZ2dlciA9IGZ1bmN0aW9uIChldmVudCwgYXJncykge1xuICAgICAgICBpZiAoIXRoaXMuZXZlbnRzW2V2ZW50XSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHN1YnNjcmliZXJzID0gdGhpcy5ldmVudHNbZXZlbnRdO1xuICAgICAgICB2YXIgbGVuZ3RoID0gc3Vic2NyaWJlcnMgPyBzdWJzY3JpYmVycy5sZW5ndGggOiAwO1xuICAgICAgICB3aGlsZSAobGVuZ3RoLS0pIHtcbiAgICAgICAgICAgIHZhciBzdWJzY3JpYmVyID0gc3Vic2NyaWJlcnNbbGVuZ3RoXTtcbiAgICAgICAgICAgIHN1YnNjcmliZXIubGlzdGVuZXIuY2FsbChzdWJzY3JpYmVyLmNvbnRleHQsIGV2ZW50LCBhcmdzKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIHJldHVybiBFdmVudHM7XG59KSgpO1xudmFyIGV2ZW50cyA9IG5ldyBFdmVudHMoKTtcbm1vZHVsZS5leHBvcnRzID0gZXZlbnRzO1xuIiwidmFyIFV0aWxpdGllcztcbihmdW5jdGlvbiAoVXRpbGl0aWVzKSB7XG4gICAgVXRpbGl0aWVzLmdlbmVyYXRlVVVJRCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGQgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICAgICAgcmV0dXJuIFwieHh4eHh4eHgteHh4eC00eHh4LXl4eHgteHh4eHh4eHh4eHh4XCIucmVwbGFjZSgvW3h5XS9nLCBmdW5jdGlvbiAoYykge1xuICAgICAgICAgICAgdmFyIHIgPSAoZCArIE1hdGgucmFuZG9tKCkgKiAxNikgJSAxNiB8IDA7XG4gICAgICAgICAgICBkID0gTWF0aC5mbG9vcihkIC8gMTYpO1xuICAgICAgICAgICAgcmV0dXJuIChjID09PSBcInhcIiA/IHIgOiAociAmIDB4NyB8IDB4OCkpLnRvU3RyaW5nKDE2KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbn0pKFV0aWxpdGllcyB8fCAoVXRpbGl0aWVzID0ge30pKTtcbm1vZHVsZS5leHBvcnRzID0gVXRpbGl0aWVzO1xuIl19