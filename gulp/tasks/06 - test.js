var debug = require("gulp-debug");
var gulp = require("gulp");
var istanbul = require("gulp-istanbul");
var mocha = require("gulp-mocha");

gulp.task("test", ["istanbul"], function () {
    return gulp.src(["tests/**/*.test.js"], {
        read: false
    })
        .pipe(mocha({
            ui: "bdd"
        }))
        .on("error", function (error) {
            console.log(error.toString());
            this.emit("end");
        })
        .pipe(istanbul.writeReports());
});
