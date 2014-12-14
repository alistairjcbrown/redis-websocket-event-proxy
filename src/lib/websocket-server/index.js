/**
 *  Websocket Server
 */
define([ "primus", "lib/http-server", "authorize", "config" ],
function(Primus, server, authorize, config) {
    "use strict";

    var primus = new Primus(server.instance(), {
        transformer: config.websocket.transformer
    });

    primus.authorize(authorize);

    primus.on("connection", function connection(spark) {

        spark.on("data", function received(data) {
            console.log(spark.id, "received message:", data);
        });

    });

    return {
        instance: function() {
            return primus;
        },
        start: function() {
            server.start();
        }
    };
});
