/**
 * Created by remelpugh on 11/4/2014.
 */
var bump = require("gulp-bump");
var gulp = require("gulp");
var generator = require("dts-generator");

gulp.task("default", ["browserify"], function (callback) {
    "use strict";
    gulp.src(["./package.json"])
        .pipe(bump())
        .pipe(gulp.dest('./'));
        
    generator.generate({
        name: "",
        baseDir: "./src",
        files: ["Events.ts"],
        out: "./dist/Events.d.ts"
    }).then(function() {
        callback();
    });
});