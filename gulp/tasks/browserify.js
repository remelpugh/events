/**
 * Created by remelpugh on 11/4/2014.
 */
var browserify = require("browserify");
var buffer = require("vinyl-buffer");
var bundleLogger = require("../util/bundleLogger");
var gulp = require("gulp");
var handleErrors = require("../util/handleErrors");
var pkg = require("../../package.json");
var rename = require("gulp-rename");
var source = require("vinyl-source-stream");
var uglify = require("gulp-uglify");

var production = process.env.NODE_ENV === "production";

function bundleShare(b) {
    "use strict";
    bundleLogger.start();

    b.bundle()
        .on("error", handleErrors)
        .pipe(source(pkg.name + ".js"))

        // Convert stream
        .pipe(buffer())

        // Output to the build directory
        .pipe(gulp.dest("./dist"))

        // Rename the destination file
        .pipe(rename(pkg.name + ".min.js"))

        // Minify the bundled JavaScript
        .pipe(uglify())

        // Output to the build directory
        .pipe(gulp.dest("./dist"))

        .on("end", bundleLogger.end);
}

gulp.task("browserify", ["compile"], function () {
    "use strict";
    var b = browserify({
        basedir: "./build",
        bundleExternal: true,
        cache: {},
        debug: !production,
        fullPaths: false,
        packageCache: {},
        standalone: "Events"
    });

    b.add("./Events.js");

    bundleShare(b);

    gulp.watch(["src/**/*.ts"], ["default"]);
});