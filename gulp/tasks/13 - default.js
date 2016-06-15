/**
 * Created by remelpugh on 11/4/2014.
 */
var gulp = require("gulp");

//gulp.task("default", ["nuget-push"], function (callback) {
gulp.task("default", ["bump"], function (callback) {
	callback();
});