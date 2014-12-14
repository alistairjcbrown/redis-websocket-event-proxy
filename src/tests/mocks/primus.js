/**
 *  Primus module mock
 */
define([ "sinon" ], function(sinon) {
    "use strict";

    return function() {
        this.instance  = sinon.spy();
        this.start     = sinon.spy();
        this.authorize = sinon.spy();
        this.on        = sinon.spy();
    };
});
