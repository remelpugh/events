describe("one event", function() {
	var result;
	
	beforeEach(function(done) {
		Events.on("test.event", function(name, data) {
			result = data;
			done();
		});
	
		Events.trigger("test.event", {
			data: "TEST"
		});
	});
	
	it("on", function() {
		expect(result.data).toEqual("TEST");
	});
});

describe("multiple events", function() {
	var result1;
	var result2;
	var count = 1;
	
	beforeEach(function(done) {
		Events.on("test.event1,test.event2", function(name, data) {
			if (count == 1) {
				result1 = name;
			}
			if (count == 2) {
				result2 = name;
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