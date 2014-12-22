/**
 *  Nodejs HTTP module mock
 */
define([ "sinon" ], function(sinon) {
    "use strict";

    var sb = sinon.sandbox.create(),
        Server_mock = function() {
            this.listen = sb.spy();
        },
        server_instance_mock = new Server_mock();

    return {
        createServer: sb.spy(function() {
            return server_instance_mock;
        }),
        _Server_mock: Server_mock,
        _server_instance_mock: server_instance_mock
    };
});
