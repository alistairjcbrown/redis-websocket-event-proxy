/**
 *  Websocket Server
 */
define([
    "primus", "primus-emit", "primus-rooms",
    "authorize",
],
function(Primus, primus_emit, primus_rooms, authorize) {
    "use strict";

    var setupPrimus = function(server, config) {
        var primus = new Primus(server, config);

        primus.use("emit",  primus_emit);
        primus.use("rooms", primus_rooms);

        primus.authorize(authorize);

        return primus;
    };

    return {
        setup: setupPrimus
    };
});
