module.exports = function (wallaby) {
    var wallabify = require("wallabify");
    var wallabyPostprocessor = wallabify({
        entryPatterns: [
            "test/**/*.test.js"
        ]
    });

    return {
        files: [
            { pattern: "source/**/*.ts", load: false },
            { pattern: "source/**/*.tsx", load: false }
        ],
        postprocessor: wallabyPostprocessor,
        setup: function () {
            window.__moduleBundler.loadTests();
        },
        testFramework: "mocha",
        tests: [
            { pattern: "test/**/*.test.ts", load: false }
        ]
    };
};
