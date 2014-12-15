/**
 *  Test Runner
 *
 *  Provides an interface for mocha to run AMD test files
 *  List of test files is provided by Grunt
 */
(function() {
    "use strict";

    var grunt = require("grunt"),
        requirejs = require("requirejs"),
        require_config = require("../../config/requirejs.json"),
        test_files = grunt.option("test-files");

    // Set require config
    requirejs.config(require_config);

    // Setup the test environment
    requirejs("test-environment");

    // Require all test files
    test_files.forEach(function(test_file) {
        requirejs(test_file);
    });

}());
