/**
 *  HTTP Server Tests
 */
define([ "mocks/http" ],
function(http_mock) {
    "use strict";

    suite("HTTP Server", function() {
        var server;

        suiteSetup(function(done) {
            injector.mock("http", http_mock);
            injector.require(["lib/http-server"], function(http_server) {
                server = http_server;
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
                var created_server = server.instance();
                expect(created_server).to.be.an.instanceOf(http_mock._Server_instance_mock);
            });

        });

        suite("start server", function() {
            setup(function() {
                env.created_server = server.instance();
            });

            test("should exist", function() {
                expect(server.start).to.be.a("function");
            });

            test("should start the server listening on the correct port", function() {
                server.start();

                expect(env.created_server.listen).to.have.been.calledOnce;
                expect(env.created_server.listen).to.have.been.calledWith(8080);
            });

        });

    });
});
