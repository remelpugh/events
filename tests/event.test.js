"use strict";
var chai_1 = require("chai");
var EventArgs_1 = require("../src/EventArgs");
var Events_1 = require("../src/Events");
describe("EventArgs", function () {
    var e = new EventArgs_1.EventArgs("test", { name: "test" });
    it("name", function () {
        chai_1.expect(e.name).eql("test");
    });
    it("sender", function () {
        chai_1.expect(e.sender.name).eql("test");
    });
    it("is default prevented 1", function () {
        chai_1.expect(e.isDefaultPrevented()).eql(false);
    });
    it("is default prevented 2", function () {
        e.preventDefault();
        chai_1.expect(e.isDefaultPrevented()).eql(true);
    });
});
describe("one event", function () {
    var eventName = "one.event";
    var result;
    beforeEach(function (done) {
        Events_1.Events.on(eventName, function (name, data) {
            result = data;
            done();
        });
        Events_1.Events.trigger(eventName, {
            data: "TEST"
        });
    });
    it("on", function () {
        chai_1.expect(result.data).eql("TEST");
    });
});
describe("remove event by function", function () {
    var eventName = "remove.event.by.function";
    var listener;
    var result;
    beforeEach(function (done) {
        listener = function (name, data) {
            result = data;
            done();
        };
        Events_1.Events.on(eventName, listener);
        Events_1.Events.off(listener);
        done();
    });
    it("off", function () {
        chai_1.expect(Events_1.Events.events[eventName].length).eql(0);
    });
});
describe("remove event by uid", function () {
    var eventName = "remove.event.by.uid";
    var listener;
    var result;
    beforeEach(function (done) {
        listener = function (name, data) {
            result = data;
            done();
        };
        var subscription = Events_1.Events.on(eventName, null);
        if (!Array.isArray(subscription)) {
            Events_1.Events.off(subscription.uid);
        }
        done();
    });
    it("off", function () {
        chai_1.expect(Events_1.Events.events[eventName].length).eql(0);
    });
});
describe("remove event", function () {
    var eventName = "remove.event";
    var listener;
    var result;
    beforeEach(function (done) {
        listener = function (name, data) {
            result = data;
            done();
        };
        var subscription = Events_1.Events.on(eventName, null);
        if (!Array.isArray(subscription)) {
            subscription.remove();
        }
        done();
    });
    it("off", function () {
        chai_1.expect(Events_1.Events.events[eventName].length).eql(0);
    });
});
describe("multiple events", function () {
    var result1;
    var result2;
    var count = 1;
    beforeEach(function (done) {
        Events_1.Events.on("test.event1,test.event2", function (e, data) {
            if (count === 1) {
                result1 = e.name;
            }
            if (count === 2) {
                result2 = e.name;
                done();
            }
            count += 1;
        });
        Events_1.Events.trigger("test.event1,test.event2", {
            data: "TEST"
        });
    });
    it("on", function () {
        chai_1.expect(result1).eql("test.event1");
        chai_1.expect(result2).eql("test.event2");
    });
});
describe("priority", function () {
    var result = [];
    beforeEach(function (done) {
        Events_1.Events.on("test.event", function (e, data) {
            result.push(e.name + "_2_" + data);
        }, {
            priority: 2
        });
        Events_1.Events.on("test.event", function (e, data) {
            result.push(e.name + "_1_" + data);
        }, {
            priority: 1
        });
        Events_1.Events.trigger("test.event", "TEST");
        done();
    });
    it("on", function () {
        chai_1.expect(result[0]).eql("test.event_2_TEST");
        chai_1.expect(result[1]).eql("test.event_1_TEST");
    });
});
describe("prevent default", function () {
    var result = "";
    beforeEach(function (done) {
        Events_1.Events.on("onAdding", function (e, data) {
            e.preventDefault();
        });
        Events_1.Events.on("onAdding", function (e, data) {
            result = data;
        });
        Events_1.Events.trigger("onAdding", "ADDING");
        done();
    });
    it("prevent default", function () {
        chai_1.expect(result).eql("");
    });
});
describe("preventing", function () {
    var result = "";
    beforeEach(function (done) {
        var args = Events_1.Events.create("onAdding1");
        Events_1.Events.on("onAdding1", function (e, data) {
            e.preventDefault();
            result = data;
        });
        Events_1.Events.on("onAdded", function (e, data) {
            result = data;
        });
        Events_1.Events.trigger(args, "ADDING");
        if (!args.isDefaultPrevented()) {
            Events_1.Events.trigger("onAdded", "ADDED");
        }
        done();
    });
    it("preventing", function () {
        chai_1.expect(result).eql("ADDING");
    });
});
describe("sender", function () {
    var eventArg = Events_1.Events.create("test.sender", { name: "sender" });
    var sender;
    beforeEach(function (done) {
        Events_1.Events.on("test.sender", function (e) {
            sender = e.sender;
        });
        Events_1.Events.trigger(eventArg);
        done();
    });
    it("sender", function () {
        chai_1.expect(sender.name).eql("sender");
    });
});
