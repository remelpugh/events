/**
 * Created by remelpugh on 11/4/2014.
 */
var gulp = require("gulp");
var del = require("del");

gulp.task("clean", function(callback) {
    "use strict";
    del(["./build/*"], callback);
});