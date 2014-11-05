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
