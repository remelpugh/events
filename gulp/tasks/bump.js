
var bump = require("gulp-bump");
var gulp = require("gulp");

gulp.task("bump", ["dts"], function() {
    "use strict";
    return gulp.src(["./package.json"])
        .pipe(bump())
        .pipe(gulp.dest('./'));
});