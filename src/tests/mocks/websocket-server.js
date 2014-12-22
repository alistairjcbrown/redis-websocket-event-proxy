/**
 *  Websocket server mock
 */
define([ "sinon", "mocks/websocket-connection" ],
function(sinon, websocket_connection_mock) {
    "use strict";

    var sb = sinon.sandbox.create(),
        Websocket = function() {
            this.instance  = sb.spy();
            this.start     = sb.spy();
            this.on        = sb.spy();
            this.use       = sb.spy();
            this.authorize = sb.spy();
            this.forEach   = function(callback) {
                callback(websocket_connection_mock);
            };
        };

    return Websocket;
});
