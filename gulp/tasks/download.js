var fs = require("fs");
var gulp = require("gulp");
var request = require("request")

gulp.task("download", ["bump"], function(callback) {
	if (fs.existsSync("./dist/nuget.exe")) {
		callback();
		return;
	}
	
	request.get("http://nuget.org/nuget.exe")
		.pipe(fs.createWriteStream("./dist/nuget.exe"))
		.on("close", callback);
});