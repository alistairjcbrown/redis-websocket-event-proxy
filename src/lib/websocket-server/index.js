/**
 *  Websocket Server Controller
 */
define([
    "lib/websocket-server/websocket", "lib/http-server",
    "pubsub", "config", "check", "utils"
],
function(
    websocket_server, http_server,
    pubsub, config, check, utils
) {
    "use strict";

    var getPayload, setupClientBindings, triggerEventToClients, websocket;

    getPayload = function(data_array) {
        return Array.prototype.slice.call(data_array, 1);
    };

    setupClientBindings = function(client) {
        client.on("incoming::data", function (event_data) {
            var received_data = utils.parseJSON(event_data),
                event_packet;

            if ( ! check(received_data).has("emit") ||
                check(received_data.emit).is.not("array")) {
                return;
            }

            event_packet = {
                name:    received_data.emit[0],
                payload: getPayload(received_data.emit)
            };

            pubsub.trigger("to-server", event_packet);
        });
    };

    triggerEventToClients = function(event_name) {
        var payload = getPayload(arguments);

        websocket.forEach(function (client) {
            client.emit("broadcast", event_name, payload);
        });
    };

    websocket = websocket_server.setup(http_server.instance(), config.websocket);
    websocket.on("connection", setupClientBindings);
    pubsub.on("to-clients", triggerEventToClients);

    return {
        instance: function() {
            return websocket;
        },
        start: function() {
            http_server.start();
        }
    };
});
