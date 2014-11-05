!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.Events=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var utils = require("./Utilities");
var Events = (function () {
    function Events() {
        this.topics = {};
    }
    Events.prototype.publish = function (topic, args) {
        if (!this.topics[topic]) {
            return this;
        }
        var subscribers = this.topics[topic];
        var len = subscribers ? subscribers.length : 0;
        while (len--) {
            var subscriber = subscribers[len];
            subscriber.listener.call(subscriber.context, topic, args);
        }
        return this;
    };
    Events.prototype.subscribe = function (topic, listener, context) {
        var _this = this;
        if (!this.topics[topic]) {
            this.topics[topic] = [];
        }
        var subscriber;
        var token = utils.generateUUID();
        subscriber = {
            context: context,
            listener: listener,
            token: token
        };
        this.topics[topic].push(subscriber);
        return {
            remove: function () {
                _this.unsubscribe(token);
            },
            token: token
        };
    };
    Events.prototype.unsubscribe = function (token) {
        var topics = this.topics;
        for (var topic in topics) {
            if (topics.hasOwnProperty(topic)) {
                for (var i = 0, length = topics[topic].length; i < length; i++) {
                    if (topics[topic][i].token === token) {
                        topics[topic].splice(i, 1);
                        return this;
                    }
                }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFxub2RlX21vZHVsZXNcXGJyb3dzZXJpZnlcXG5vZGVfbW9kdWxlc1xcYnJvd3Nlci1wYWNrXFxfcHJlbHVkZS5qcyIsIi4uXFxFdmVudHMuanMiLCJVdGlsaXRpZXMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJ2YXIgdXRpbHMgPSByZXF1aXJlKFwiLi9VdGlsaXRpZXNcIik7XG52YXIgRXZlbnRzID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBFdmVudHMoKSB7XG4gICAgICAgIHRoaXMudG9waWNzID0ge307XG4gICAgfVxuICAgIEV2ZW50cy5wcm90b3R5cGUucHVibGlzaCA9IGZ1bmN0aW9uICh0b3BpYywgYXJncykge1xuICAgICAgICBpZiAoIXRoaXMudG9waWNzW3RvcGljXSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHN1YnNjcmliZXJzID0gdGhpcy50b3BpY3NbdG9waWNdO1xuICAgICAgICB2YXIgbGVuID0gc3Vic2NyaWJlcnMgPyBzdWJzY3JpYmVycy5sZW5ndGggOiAwO1xuICAgICAgICB3aGlsZSAobGVuLS0pIHtcbiAgICAgICAgICAgIHZhciBzdWJzY3JpYmVyID0gc3Vic2NyaWJlcnNbbGVuXTtcbiAgICAgICAgICAgIHN1YnNjcmliZXIubGlzdGVuZXIuY2FsbChzdWJzY3JpYmVyLmNvbnRleHQsIHRvcGljLCBhcmdzKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIEV2ZW50cy5wcm90b3R5cGUuc3Vic2NyaWJlID0gZnVuY3Rpb24gKHRvcGljLCBsaXN0ZW5lciwgY29udGV4dCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICBpZiAoIXRoaXMudG9waWNzW3RvcGljXSkge1xuICAgICAgICAgICAgdGhpcy50b3BpY3NbdG9waWNdID0gW107XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHN1YnNjcmliZXI7XG4gICAgICAgIHZhciB0b2tlbiA9IHV0aWxzLmdlbmVyYXRlVVVJRCgpO1xuICAgICAgICBzdWJzY3JpYmVyID0ge1xuICAgICAgICAgICAgY29udGV4dDogY29udGV4dCxcbiAgICAgICAgICAgIGxpc3RlbmVyOiBsaXN0ZW5lcixcbiAgICAgICAgICAgIHRva2VuOiB0b2tlblxuICAgICAgICB9O1xuICAgICAgICB0aGlzLnRvcGljc1t0b3BpY10ucHVzaChzdWJzY3JpYmVyKTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHJlbW92ZTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIF90aGlzLnVuc3Vic2NyaWJlKHRva2VuKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0b2tlbjogdG9rZW5cbiAgICAgICAgfTtcbiAgICB9O1xuICAgIEV2ZW50cy5wcm90b3R5cGUudW5zdWJzY3JpYmUgPSBmdW5jdGlvbiAodG9rZW4pIHtcbiAgICAgICAgdmFyIHRvcGljcyA9IHRoaXMudG9waWNzO1xuICAgICAgICBmb3IgKHZhciB0b3BpYyBpbiB0b3BpY3MpIHtcbiAgICAgICAgICAgIGlmICh0b3BpY3MuaGFzT3duUHJvcGVydHkodG9waWMpKSB7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDAsIGxlbmd0aCA9IHRvcGljc1t0b3BpY10ubGVuZ3RoOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRvcGljc1t0b3BpY11baV0udG9rZW4gPT09IHRva2VuKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0b3BpY3NbdG9waWNdLnNwbGljZShpLCAxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gICAgcmV0dXJuIEV2ZW50cztcbn0pKCk7XG52YXIgZXZlbnRzID0gbmV3IEV2ZW50cygpO1xubW9kdWxlLmV4cG9ydHMgPSBldmVudHM7XG4iLCJ2YXIgVXRpbGl0aWVzO1xuKGZ1bmN0aW9uIChVdGlsaXRpZXMpIHtcbiAgICBVdGlsaXRpZXMuZ2VuZXJhdGVVVUlEID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZCA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgICAgICByZXR1cm4gXCJ4eHh4eHh4eC14eHh4LTR4eHgteXh4eC14eHh4eHh4eHh4eHhcIi5yZXBsYWNlKC9beHldL2csIGZ1bmN0aW9uIChjKSB7XG4gICAgICAgICAgICB2YXIgciA9IChkICsgTWF0aC5yYW5kb20oKSAqIDE2KSAlIDE2IHwgMDtcbiAgICAgICAgICAgIGQgPSBNYXRoLmZsb29yKGQgLyAxNik7XG4gICAgICAgICAgICByZXR1cm4gKGMgPT09IFwieFwiID8gciA6IChyICYgMHg3IHwgMHg4KSkudG9TdHJpbmcoMTYpO1xuICAgICAgICB9KTtcbiAgICB9O1xufSkoVXRpbGl0aWVzIHx8IChVdGlsaXRpZXMgPSB7fSkpO1xubW9kdWxlLmV4cG9ydHMgPSBVdGlsaXRpZXM7XG4iXX0=
