/**
 *  App
 *
 *  Root application file.
 */
define([ "lib/redis-client", "lib/websocket-server" ],
function(redis_client, websocket_server) {
    "use strict";

    var app = {};

    app.init = function() {
        // redis_client;

        websocket_server.start();

        return true;
    };

    return app;

});
