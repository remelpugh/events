/**
 * Created by remelpugh on 11/4/2014.
 */
var gulp = require("gulp");
var concat = require("gulp-concat");
var merge = require("merge2");
var sourcemaps = require("gulp-sourcemaps");
var ts = require("gulp-typescript");

var project = ts.createProject("src/tsconfig.json");

gulp.task("compile", ["tslint"], function() {
    //var result = gulp.src(["src/*.ts", "typings/**/*.ts"])
    var result = project.src()
        .pipe(ts(project));

    return merge([
        result.dts
            .pipe(concat("Events.d.ts"))
            .pipe(gulp.dest("./dist")),
        result.js
            .pipe(gulp.dest("./build"))
    ]);
});
