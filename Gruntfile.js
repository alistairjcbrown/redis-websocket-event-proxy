/**
 *  Grunt file
 *
 *  Setup common tasks to build and test application
 */
module.exports = function(grunt) {
    "use strict";

    var generate_path_matches = function(extension) {
        var base = [
            "./src/*{extension}",
            "./src/**/*{extension}"
        ];

        base.forEach(function(element, index, array) {
            array[index] = element.replace("{extension}", extension);
        });

        return base;
    },
    jshint, jscs, mocha_nodejs, keybase_dir;

    // ------

    // Strict JSHint rules
    jshint = {
        "all": generate_path_matches(".js"),
        "options": grunt.file.readJSON("./config/jshint.json")
    };

    // Strict JS code style rules
    jscs = {
        "files": {
            "src": generate_path_matches(".js")
        },
        "options": {
            "config": "./config/jscs.json"
        }
    };

    // Run mocha tests in node
    mocha_nodejs = {
        "test": {
            "src": "src/tests/runner.js",
            "options": {
                "reporter": "spec",
                "ui":       "tdd"
            }
        }
    };

    keybase_dir = {
        sign:{},
        verify:{},
    };

    grunt.initConfig({
        "pkg":          grunt.file.readJSON("package.json"),
        "jshint":       jshint,
        "jscs":         jscs,
        "mochaTest":    mocha_nodejs,
        "keybase_dir":  keybase_dir,
    });

    // Load Tasks
    require("load-grunt-tasks")(grunt);

    // Save test file locations to options hash
    grunt.option("test-files", grunt.file.expand(generate_path_matches(".test.js")));

    // Define tasks
    grunt.registerTask("test",    [ "keybase_dir:verify", "go" ]);
    grunt.registerTask("lint",    [ "jshint", "jscs" ]);
    grunt.registerTask("go",      [ "lint", "mochaTest" ]);
    grunt.registerTask("build",   [ "go", "keybase_dir:sign" ]);
    grunt.registerTask("default", [ "go" ]);

};
