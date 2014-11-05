/**
 * Created by remelpugh on 11/4/2014.
 */
var gulp = require("gulp");
var typedoc = require("gulp-typedoc");

gulp.task("documentation", function () {
    "use strict";
    return gulp.src(["src/Events.ts"])
        .pipe(typedoc({
            module: "commonjs",
            name: "Events API Documentation",
            out: "./docs",
            target: "es5"
        }));
});
