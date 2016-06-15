var gulp = require("gulp");
var generator = require("dts-generator");

gulp.task("dts", ["test-package"], function(callback) {
    generator.default({
        name: "events",
        baseDir: "./src",
        files: ["Events.ts"],
        out: "./dist/Events.d.ts"
    }).then(function() {     
       callback(); 
    });
})