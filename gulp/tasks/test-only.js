var gulp = require("gulp");
var jasmineBrowser = require("gulp-jasmine-browser");

gulp.task("test-only", [], function() {
    return gulp.src(["build/**/*.js", "tests/**/*.test.js"])
        .pipe(jasmineBrowser.specRunner({
            console: true
        }))
        .pipe(jasmineBrowser.headless());
});
