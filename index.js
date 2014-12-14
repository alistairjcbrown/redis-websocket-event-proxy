/**
 *  Main File
 *
 *  Sets up the module loading and boots the application
 */
(function() {
    "use strict";

    var requirejs = require("requirejs"),
        require_config = require("./config/requirejs.json");

    // Set require config
    requirejs.config(require_config);

    // Now run application
    requirejs([ "./app" ], function(app) {
        app.init();
    });

}());
