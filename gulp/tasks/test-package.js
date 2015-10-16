var debug = require("gulp-debug");
var fs = require("fs");
var gulp = require("gulp");
var jasmineBrowser = require("gulp-jasmine-browser");

gulp.task("test-package", ["package"], function() {
    var pkg = JSON.parse(fs.readFileSync("./package.json"));

    return gulp.src(["dist/" + pkg.name + ".min.js", "tests/**/*.test.js"])
        .pipe(jasmineBrowser.specRunner({
            console: true
        }))
        .pipe(jasmineBrowser.headless());
});
