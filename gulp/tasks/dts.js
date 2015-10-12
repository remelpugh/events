var gulp = require("gulp");
var generator = require("dts-generator");

gulp.task("dts", ["test-package"], function(callback) {
    generator.generate({
        name: "",
        baseDir: "./src",
        files: ["Events.ts"],
        out: "./dist/Events.d.ts"
    }).then(function() {     
       callback(); 
    });
})