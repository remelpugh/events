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
