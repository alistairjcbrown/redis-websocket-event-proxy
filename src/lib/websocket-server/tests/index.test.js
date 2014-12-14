/**
 *  Websocket Server Tests
 */
define([ "mocks/primus", "mocks/http" ],
function(Primus_mock, http_mock) {
    "use strict";

    suite("Websocket Server", function() {

        setup(function(done) {
            env.injector.mock("primus", Primus_mock);
            env.injector.mock("http", http_mock);
            env.injector.require(["lib/websocket-server"], function(server) {
                env.server = server;
                done();
            });
        });

        test("should exist", function() {
            expect(env.server).to.be.an("object");
        });

        suite("get server instance", function() {

            test("should exist", function() {
                expect(env.server.instance).to.be.a("function");
            });

            test("should return created server", function() {
                var result = env.server.instance();
                expect(result).to.be.an.instanceOf(Primus_mock);
            });

        });

        suite("start server", function() {

            test("should exist", function() {
                expect(env.server.start).to.be.a("function");
            });

        });
    });
});
