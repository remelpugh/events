var browserify = require("browserify");
var buffer = require("vinyl-buffer");
var bundleLogger = require("../util/bundleLogger");
var concat = require("gulp-concat");
var fs = require("fs");
var handleErrors = require("../util/handleErrors");
var gulp = require("gulp");
var rename = require("gulp-rename");
var runSequence = require("run-sequence");
var source = require("vinyl-source-stream");
var sourcemaps = require("gulp-sourcemaps");
var uglify = require("gulp-uglify");

gulp.task("bundle", function () {
    bundleLogger.start();

    var pkg = JSON.parse(fs.readFileSync("./package.json"));
    var bundler = browserify({
        basedir: "./build",
        bundleExternal: true,
        cache: {},
        debug: true,
        fullPaths: false,
        packageCache: {},
        standalone: pkg.name
    });

    return bundler
        .add("./Events.js")
        .bundle()
        .on("error", handleErrors)
        .pipe(source(pkg.name + ".js"))

        // Convert stream
        .pipe(buffer())

        // loads map from browserify file
        .pipe(sourcemaps.init({
            loadMaps: true
        }))

        // Output to the build directory
        .pipe(gulp.dest("./dist"))

        // Rename the destination file
        .pipe(rename(pkg.name + ".min.js"))

        // Minify the bundled JavaScript
        .pipe(uglify())

        .pipe(sourcemaps.write('./')) // writes .map file

        // Output to the build directory
        .pipe(gulp.dest("./dist"))

        .on("end", bundleLogger.end);
});

gulp.task("concat", function () {
    var pkg = JSON.parse(fs.readFileSync("./package.json"));
    
    return gulp.src(["build/**/*.js"])
        .pipe(concat(pkg.name + ".js"))
        .pipe(sourcemaps.init({
            loadMaps: true
        }))
        .pipe(gulp.dest("dist"))

        // Rename the destination file
        .pipe(rename(pkg.name + ".min.js"))

        // Minify the bundled JavaScript
        .pipe(uglify())

        .pipe(sourcemaps.write("./")) // writes .map file

        // Output to the build directory
        .pipe(gulp.dest("dist"));
});

gulp.task("package", ["test"], function (callback) {
    runSequence(["bundle"], callback);
});
