/**
 *  HTTP Server Tests
 */
define([ "mocks/http" ],
function(http_mock) {
    "use strict";

    suite("HTTP Server", function() {

        setup(function(done) {
            env.injector.mock("http", http_mock);
            env.injector.require(["lib/http-server"], function(server) {
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
                var created_server = env.server.instance();
                expect(created_server).to.be.an.instanceOf(http_mock.Server_instance_mock);
            });

        });

        suite("start server", function() {

            test("should exist", function() {
                expect(env.server.start).to.be.a("function");
            });

            test("should start the server listening on the correct port", function() {
                var created_server = env.server.instance();
                env.server.start();

                expect(created_server.listen).to.have.been.calledOnce;
                expect(created_server.listen).to.have.been.calledWith(8080);
            });

        });

    });
});
