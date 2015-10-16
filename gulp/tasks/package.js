var concat = require("gulp-concat");
var fs = require("fs");
var gulp = require("gulp");
var rename = require("gulp-rename");
var sourcemaps = require("gulp-sourcemaps");
var uglify = require("gulp-uglify");

gulp.task("package", ["test"], function(callback) {
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
