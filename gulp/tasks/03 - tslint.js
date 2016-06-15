/**
 * Created by remelpugh on 11/4/2014.
 */
var gulp = require("gulp");
var tslint = require("gulp-tslint");

gulp.task("tslint", ["documentation"], function() {
    "use strict";
    return gulp.src("./src/**/*.ts")
        .pipe(tslint())
        .pipe(tslint.report("full"));
});
