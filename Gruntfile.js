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
    jshint, mocha_nodejs, keybase_dir;

    // ------

    // Strict JSHint rules
    jshint = {
        "all": generate_path_matches(".js"),
        "options": {
            "curly":      true,
            "devel":      false,
            "eqeqeq":     true,
            "eqnull":     true,
            "expr":       true,
            "immed":      true,
            "indent":     4,
            "latedef":    true,
            "maxdepth":   3,
            "maxlen":     140,
            "maxparams":  10,
            "newcap":     true,
            "noarg":      true,
            "noempty":    true,
            "quotmark":   "double",
            "strict":     true,
            "trailing":   true,
            "undef":      true,
            "unused":     true,
            "globals": {
                // Test globals
                "define":        true,
                "env":           true,
                "expect":        true,
                "injector":      true,
                "mocha":         true,
                "module":        true,
                "require":       true,
                "setup":         true,
                "suite":         true,
                "suiteSetup":    true,
                "suiteTeardown": true,
                "teardown":      true,
                "test":          true,

                // Env globals
                "process":       true,
                "console":       true,
                "global":        true

            }
        }
    };

    // Run mocha tests in node
    mocha_nodejs = {
        "test": {
            "src": "test.runner.js",
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
        "mochaTest":    mocha_nodejs,
        "keybase_dir":  keybase_dir,
    });

    // Load Tasks
    require("load-grunt-tasks")(grunt);

    // Save test file locations to options hash
    grunt.option("test-files", grunt.file.expand(generate_path_matches(".test.js")));

    // Define tasks
    grunt.registerTask("test",    [ "keybase_dir:verify", "go" ]);
    grunt.registerTask("go",      [ "jshint", "mochaTest" ]);
    grunt.registerTask("build",   [ "go", "keybase_dir:sign" ]);
    grunt.registerTask("default", [ "go" ]);

};
