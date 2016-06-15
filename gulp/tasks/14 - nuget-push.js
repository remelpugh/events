var gulp = require("gulp");
var nuget = require("gulp-nuget");

gulp.task("nuget-push", ["nuget"], function() {
	var path = "dist/nuget.exe";
		
	gulp.src(["dist/*.nupkg"])
		.pipe(nuget.push({
		apiKey: "Ak1nn0v@+3", 
		nuget: path,
		source: "http://nuget.akinnovate.com/"
	}));
})