var fs = require("fs");
var gulp = require("gulp");
var handleErrors = require("../util/handleErrors");
var istanbul = require("gulp-istanbul");
var mocha = require("gulp-mocha");

gulp.task("test-package", ["package"], function() {
    var pkg = JSON.parse(fs.readFileSync("./package.json"));
    var source = "dist/" + pkg.name + ".min.js";
    
    return gulp.src([source, "tests/**/*.test.js"], {
        read: false
    })
        .pipe(mocha({
            ui: "bdd"
        }))
        .on("error", handleErrors);
});
