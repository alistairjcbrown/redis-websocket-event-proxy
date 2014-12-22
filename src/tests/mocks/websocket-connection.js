/**
 *  Websocket connection
 */
define([ "sinon" ], function(sinon) {
    "use strict";

    var sb = sinon.sandbox.create(),
        pubsub = {
            on:   sb.spy(),
            emit: sb.spy()
        };

    teardown(function() {
        sb.reset();
    });

    return pubsub;
});
