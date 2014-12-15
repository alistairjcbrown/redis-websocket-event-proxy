/**
 *  Nodejs HTTP module mock
 */
define([ "sinon" ], function(sinon) {
    "use strict";

    var sb = sinon.sandbox.create();

    teardown(function() {
        sb.reset();
    });

    var server_instance_mock;
    function Server_instance_mock() {
        this.listen = sb.spy();
    }
    server_instance_mock = new Server_instance_mock();

    return {
        createServer: sb.spy(function() {
            return server_instance_mock;
        }),
        _Server_instance_mock: Server_instance_mock,
        _server_instance_mock: server_instance_mock
    };
});
