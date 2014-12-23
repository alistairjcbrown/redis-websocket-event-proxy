/**
 *  Websocket Server Controller
 */
define([
    "lib/websocket-server/websocket", "lib/http-server",
    "pubsub", "config", "check", "utils"
], function(
    websocket_server, http_server,
    pubsub, config, check, utils
) {
    "use strict";

    var proxyEventToServer, proxyEventToClients, setupClientBindings, websocket;

    proxyEventToServer = function (event_data) {
        var received_data = utils.parseJSON(event_data),
            event_packet;

        if ( ! check(received_data).has("emit") ||
            check(received_data.emit).is.not("array")) {
            return;
        }

        event_packet = {
            name:    received_data.emit[0],
            payload: utils.argumentsSplat(received_data.emit)
        };

        pubsub.trigger("to-server", event_packet);
    };

    proxyEventToClients = function(event_packet) {
        websocket.forEach(function (client) {
            client.emit("broadcast", event_packet.name, event_packet.payload);
        });
    };

    setupClientBindings = function(client) {
        client.on("incoming::data", proxyEventToServer);
    };

    websocket = websocket_server.setup(http_server.instance(), config.websocket);
    websocket.on("connection", setupClientBindings);
    pubsub.on("to-clients", proxyEventToClients);

    return {
        instance: function() {
            return websocket;
        },
        start: function() {
            http_server.start();
        }
    };
});
