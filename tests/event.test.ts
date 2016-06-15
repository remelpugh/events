/// <reference path="../typings/index.d.ts" />
import {expect} from "chai";
import {EventArgs} from "../src/EventArgs";
import {Events} from "../src/Events";

describe("EventArgs", () => {
    const e = new EventArgs("test", { name: "test" });

    it("name", () => {
        expect(e.name).eql("test");
    });

    it("sender", () => {
        expect(e.sender.name).eql("test");
    });

    it("is default prevented 1", () => {
        expect(e.isDefaultPrevented()).eql(false);
    });

    it("is default prevented 2", () => {
        e.preventDefault();

        expect(e.isDefaultPrevented()).eql(true);
    });
});

describe("one event", () => {
    const eventName = "one.event";
    let result;

    beforeEach((done) => {
        Events.on(eventName, (name, data) => {
            result = data;
            done();
        });

        Events.trigger(eventName, {
            data: "TEST"
        });
    });

    it("on", () => {
        expect(result.data).eql("TEST");
    });
});

describe("remove event by function", () => {
    const eventName = "remove.event.by.function";
    let listener;
    let result;

    beforeEach((done) => {
        listener = (name, data) => {
            result = data;
            done();
        };

        Events.on(eventName, listener);
        Events.off(listener);

        done();
    });

    it("off", () => {
        expect(Events.events[eventName].length).eql(0);
    });
});

describe("remove event by uid", () => {
    const eventName = "remove.event.by.uid";
    let listener;
    let result;

    beforeEach((done) => {
        listener = (name, data) => {
            result = data;
            done();
        };

        let subscription = Events.on(eventName, null);

        if (!Array.isArray(subscription)) {
            Events.off(subscription.uid);
        }

        done();
    });

    it("off", () => {
        expect(Events.events[eventName].length).eql(0);
    });
});

describe("remove event", () => {
    const eventName = "remove.event";
    let listener;
    let result;

    beforeEach((done) => {
        listener = (name, data) => {
            result = data;
            done();
        };

        const subscription = Events.on(eventName, null);

        if (!Array.isArray(subscription)) {
            subscription.remove();
        }

        done();
    });

    it("off", () => {
        expect(Events.events[eventName].length).eql(0);
    });
});

describe("multiple events", () => {
    let result1;
    let result2;
    let count = 1;

    beforeEach((done) => {
        Events.on("test.event1,test.event2", function (e, data) {
            if (count === 1) {
                result1 = e.name;
            }
            if (count === 2) {
                result2 = e.name;
                done();
            }
            count += 1;
        });

        Events.trigger("test.event1,test.event2", {
            data: "TEST"
        });
    });

    it("on", () => {
        expect(result1).eql("test.event1");
        expect(result2).eql("test.event2");
    });
});

describe("priority", () => {
    const result = [];

    beforeEach((done) => {
        Events.on("test.event", function (e, data) {
            result.push(e.name + "_2_" + data);
        }, {
                priority: 2
            });
        Events.on("test.event", function (e, data) {
            result.push(e.name + "_1_" + data);
        }, {
                priority: 1
            });

        Events.trigger("test.event", "TEST");

        done();
    });

    it("on", () => {
        expect(result[0]).eql("test.event_2_TEST");
        expect(result[1]).eql("test.event_1_TEST");
    });
});

describe("prevent default", () => {
    let result = "";

    beforeEach((done) => {
        Events.on("onAdding", function (e, data) {
            e.preventDefault();
        });
        Events.on("onAdding", function (e, data) {
            result = data;
        });

        Events.trigger("onAdding", "ADDING");

        done();
    });

    it("prevent default", () => {
        expect(result).eql("");
    });
});

describe("preventing", () => {
    let result = "";

    beforeEach((done) => {
        const args = Events.create("onAdding1");

        Events.on("onAdding1", function (e, data) {
            e.preventDefault();
            result = data;
        });
        Events.on("onAdded", function (e, data) {
            result = data;
        });

        Events.trigger(args, "ADDING");

        if (!args.isDefaultPrevented()) {
            Events.trigger("onAdded", "ADDED");
        }

        done();
    });

    it("preventing", () => {
        expect(result).eql("ADDING");
    });
});

describe("sender", () => {
    const eventArg = Events.create("test.sender", { name: "sender" });
    let sender;

    beforeEach((done) => {
        Events.on("test.sender", (e) => {
            sender = e.sender;
        });

        Events.trigger(eventArg);

        done();
    });

    it("sender", () => {
        expect(sender.name).eql("sender");
    });
});
