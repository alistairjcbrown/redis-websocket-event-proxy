/**
 *  Nodejs HTTP module mock
 */
define([ "sinon" ], function(sinon) {
    "use strict";

    function Server_instance_mock() {
        this.listen = sinon.spy();
    }

    return {
        createServer: sinon.spy(function() {
            return new Server_instance_mock();
        }),
        Server_instance_mock: Server_instance_mock
    };
});
