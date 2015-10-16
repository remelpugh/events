describe("one event", function() {
	var result;

	beforeEach(function(done) {
		Events.on("one.event", function(name, data) {
			result = data;
			done();
		});

		Events.trigger("one.event", {
			data: "TEST"
		});
	});

	it("on", function() {
		expect(result.data).toEqual("TEST");
	});
});

describe("remove event by function", function() {
	var name = "remove.event.by.function";
	var listener;
	var result;

	beforeEach(function(done) {
		listener = function(name, data) {
			result = data;
			done();
		};

		Events.on(name, listener);
		Events.off(listener);

		done();
	});

	it("off", function() {
		expect(Events.events[name].length).toEqual(0);
	})
});

describe("remove event by uid", function() {
	var name = "remove.event.by.uid";
	var uid;
	var result;

	beforeEach(function(done) {
		listener = function(name, data) {
			result = data;
			done();
		};

		var uid = Events.on(name, null)[0].uid;

		Events.off(uid);

		done();
	});

	it("off", function() {
		expect(Events.events[name].length).toEqual(0);
	})
});

describe("remove event", function() {
	var name = "remove.event";
	var uid;
	var result;

	beforeEach(function(done) {
		listener = function(name, data) {
			result = data;
			done();
		};

		Events.on(name, null)[0].remove();

		done();
	});

	it("off", function() {
		expect(Events.events[name].length).toEqual(0);
	})
});

describe("multiple events", function() {
	var result1;
	var result2;
	var count = 1;

	beforeEach(function(done) {
		Events.on("test.event1,test.event2", function(e, data) {
			if (count == 1) {
				result1 = e.name;
			}
			if (count == 2) {
				result2 = e.name;
				done();
			}
			count += 1;
		});

		Events.trigger("test.event1,test.event2", {
			data: "TEST"
		});
	});

	it("on", function() {
		expect(result1).toEqual("test.event1");
		expect(result2).toEqual("test.event2");
	});
});

describe("priority", function() {
	var result = [];

	beforeEach(function(done) {
		Events.on("test.event", function(e, data) {
			result.push(e.name + "_2_" + data);
		}, {
			priority: 2
		});
		Events.on("test.event", function(e, data) {
			result.push(e.name + "_1_" + data);
		}, {
			priority: 1
		});

		Events.trigger("test.event", "TEST");

		done();
	});
	it("on", function() {
		expect(result[0]).toEqual("test.event_2_TEST");
		expect(result[1]).toEqual("test.event_1_TEST");
	});
});

describe("prevent default", function() {
	var result = "";

	beforeEach(function(done) {
		Events.on("onAdding", function(e, data) {
			e.preventDefault();
		});
		Events.on("onAdding", function(e, data) {
			result = data;
		});

		Events.trigger("onAdding", "ADDING");

		done();
	});

	it("prevent default", function() {
		expect(result).toEqual("");
	});
});

describe("preventing", function() {
	var result = "";

	beforeEach(function(done) {
		var args = Events.create("onAdding1");

		Events.on("onAdding1", function(e, data) {
			e.preventDefault();
			result = data;
		});
		Events.on("onAdded", function(e, data) {
			result = data;
		});

		Events.trigger(args, "ADDING");

		if (!args.isDefaultPrevented()) {
			Events.trigger("onAdded", "ADDED");
		}

		done();
	});

	it("preventing", function() {
		expect(result).toEqual("ADDING");
	});
});
