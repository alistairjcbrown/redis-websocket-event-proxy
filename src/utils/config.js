/**
 *  Config loader
 *
 *  Exposes the config as an AMD module
 */
define(function() {
    "use strict";

    // TODO: Why can this be loaded with node's require?
    var config_string = require("fs").readFileSync("./config/app.json").toString();

    return JSON.parse(config_string);
});
