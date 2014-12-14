/**
 *  HTTP Server
 */
define([ "http", "config" ], function(http, config) {
    "use strict";

    var server = http.createServer();

    return {
        instance: function() {
            return server;
        },
        start: function() {
            server.listen(config.http.port);
        }
    };
});
