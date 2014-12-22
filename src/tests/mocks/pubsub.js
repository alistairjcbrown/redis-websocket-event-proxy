/**
 *  Pubsub mock
 */
define([ "sinon", "pubsub" ], function(sinon, pubsub) {
    "use strict";

    var sb = sinon.sandbox.create();
    sb.spy(pubsub, "trigger");
    sb.spy(pubsub, "on");

    teardown(function() {
        sb.reset();
    });

    return pubsub;
});
