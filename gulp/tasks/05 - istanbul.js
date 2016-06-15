var gulp = require("gulp");
var istanbul = require("gulp-istanbul");

gulp.task("istanbul", ["compile"], function() {
    return gulp.src(["build/**/*.js"])
        // covering files
        .pipe(istanbul())
        // force 'require' to return covered files
        .pipe(istanbul.hookRequire());    
});