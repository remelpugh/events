/**
 * Created by remelpugh on 11/4/2014.
 */
var bump = require("gulp-bump");
var gulp = require("gulp");

gulp.task("default", ["browserify"], function () {
    "use strict";
    gulp.src(["./package.json"])
        .pipe(bump())
        .pipe(gulp.dest('./'));
});