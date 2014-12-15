/**
 *  Websocket Server Tests
 */
define([ "mocks/primus", "mocks/http" ],
function(Primus_mock, http_mock) {
    "use strict";

    suite("Websocket Server", function() {
        var server;

        suiteSetup(function(done) {
            injector.mock("primus", Primus_mock);
            injector.mock("http", http_mock);
            injector.require(["lib/websocket-server"], function(websocket_server) {
                server = websocket_server;
                done();
            });
        });

        test("should exist", function() {
            expect(server).to.be.an("object");
        });

        suite("get server instance", function() {

            test("should exist", function() {
                expect(server.instance).to.be.a("function");
            });

            test("should return created server", function() {
                var result = server.instance();
                expect(result).to.be.an.instanceOf(Primus_mock);
            });

        });

        suite("start server", function() {

            test("should exist", function() {
                expect(server.start).to.be.a("function");
            });

            test("should start the HTTP server", function() {
                server.start();

                expect(http_mock._server_instance_mock.listen).to.have.been.calledOnce;
            });

        });
    });
});
