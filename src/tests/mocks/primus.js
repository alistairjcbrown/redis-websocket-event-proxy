/**
 *  Primus module mock
 */
define([ "sinon" ], function(sinon) {
    "use strict";

    var sb = sinon.sandbox.create();

    teardown(function() {
        sb.reset();
    });

    return function() {
        this.instance  = sb.spy();
        this.start     = sb.spy();
        this.authorize = sb.spy();
        this.on        = sb.spy();
    };
});
