var fs = require("fs");
var gulp = require("gulp");
var nuget = require("gulp-nuget-pack");

gulp.task("nuget", ["download"], function(callback) {   
	var pkg = JSON.parse(fs.readFileSync('./package.json'));
	
	nuget({
		id: "Akinnovate.Events",
		version: pkg.version,
		authors: pkg.author.name,
		owners: "Akinnovate LLC",
		description: pkg.description,
		// releaseNotes: "Release notes for my package.",
		// summary: "Summary of my package.",
		language: "en-us",
		// projectUrl: "http://www.host.com/",
		// iconUrl: "http://www.host.com/icon.png",
		// licenseUrl: "http://www.host.com/license",
		// copyright: "Copyright details",
		requireLicenseAcceptance: false,
		// dependencies: [
		// 	{id: "dependency1", version: "(1.0,)"},
		// 	{id: "dependency2", version: "1.0"}
		// ],
		// tags: "tag1 tag2 tag3",
		// excludes: ["js/**/*.dev.js"],
		outputDir: "dist"
	}, [
		{
			dest: "/content/Scripts/typings/Events/Events.d.ts",
			src: "dist/Events.d.ts"	
		},
		{
			dest: "/content/Scripts/app/Events.js",
			src: "dist/Events.js"
		},
		{
			dest: "/content/Scripts/app/Events.min.js",
			src: "dist/Events.min.js"
		},
		{
			dest: "/content/Scripts/app/Events.min.js.map",
			src: "dist/Events.min.js.map"
		}
	], function() {
		callback();
	});	
});