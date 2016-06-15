var gulp = require("gulp");
var concat = require("gulp-concat");
var merge = require("merge2");
var runSequence = require("run-sequence");
var ts = require("gulp-typescript");

var sources = ts.createProject("src/tsconfig.json");
var tests = ts.createProject("tests/tsconfig.json");

gulp.task("compile-code", function() {
    var result = sources.src()
        .pipe(ts(sources));
        
    return merge([
        result.dts
            .pipe(concat("Events.d.ts"))
            .pipe(gulp.dest("./build")),
        result.js
            .pipe(gulp.dest("./src")),
        result.js
            .pipe(gulp.dest("./build"))
    ]);
});
gulp.task("compile-test", function() {
    return tests.src()
        .pipe(ts(tests))
        .js
        .pipe(gulp.dest("./tests"));
});

gulp.task("compile", function(callback) {
    runSequence(["compile-code", "compile-test"], callback);
});
