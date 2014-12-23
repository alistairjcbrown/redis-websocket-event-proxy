/**
 *  Websocket Server Tests
 */
define([
    "mocks/websocket-server", "mocks/websocket-connection",
    "mocks/pubsub", "mocks/http"
], function(
    websocket_server_mock, websocket_connection_mock,
    pubsub_mock, http_mock
) {
    "use strict";

    suite("Websocket Server", function() {
        var server;

        suiteSetup(function(done) {
            injector.mock("primus", websocket_server_mock);
            injector.mock("pubsub", pubsub_mock);
            injector.mock("http", http_mock);
            injector.require(["lib/websocket-server"], function(websocket_server) {
                server = websocket_server;
                done();
            });
        });

        setup(function() {
            env.emitted_data = JSON.stringify({
                emit: [ "client-action", "foo", "bar" ]
            });
            env.event_packet = {
                name: "client-action",
                payload: [ "foo", "bar" ]
            };
        });

        test("should exist", function() {
            expect(server).to.be.an("object");
        });

        suite("get server instance", function() {
            test("should exist", function() {
                expect(server.instance).to.be.a("function");
            });

            test("should return created server", function() {
                var server_instance = server.instance();
                expect(server_instance).to.be.instanceOf(websocket_server_mock);
            });
        });

        suite("start server", function() {
            setup(function() {
                http_mock._server_instance_mock.listen.reset();
            });

            test("should exist", function() {
                expect(server.start).to.be.a("function");
            });

            test("should start the HTTP server", function() {
                server.start();
                expect(http_mock._server_instance_mock.listen).to.have.been.calledOnce;
            });
        });

        suite("on module load", function() {
            setup(function() {
                env.server_instance = server.instance();
                env.connection_event_handler = env.server_instance.on.getCall(0).args[1];
            });

            test("should listen for new connection", function() {
                expect(env.server_instance.on).to.be.calledOnce;
                expect(env.server_instance.on.getCall(0).args[0]).to.equal("connection");
                expect(env.connection_event_handler).to.be.a("function");
            });
        });

        suite("on connection", function() {
            setup(function() {
                env.server_instance = server.instance();
                env.connection_event_handler = env.server_instance.on.getCall(0).args[1];
                env.connection_event_handler(websocket_connection_mock);
                env.data_event_handler = websocket_connection_mock.on.getCall(0).args[1];
            });

            test("should listen for incoming data", function() {
                expect(websocket_connection_mock.on).to.be.calledOnce;
                expect(websocket_connection_mock.on.getCall(0).args[0]).to.equal("incoming::data");
                expect(env.data_event_handler).to.be.a("function");
            });

            suite("websocket event", function() {
                test("should proxy onto internal pubsub", function() {
                    env.data_event_handler(env.emitted_data);
                    var pubsub_trigger_args = pubsub_mock.trigger.getCall(0).args;

                    expect(pubsub_mock.trigger).to.be.calledOnce;
                    expect(pubsub_trigger_args[0]).to.equal("to-server");
                    expect(pubsub_trigger_args[1]).to.deep.equal(env.event_packet);
                });

                test("should ignore system event", function() {
                    env.data_event_handler("ping::1234567890");
                    expect(pubsub_mock.trigger).to.not.be.called;
                });
            });

            suite("internal pubsub event", function() {
                test("should proxy onto websocket event", function() {
                    pubsub_mock.trigger("to-clients", env.event_packet);
                    var websocket_emit_args = websocket_connection_mock.emit.getCall(0).args;

                    expect(websocket_connection_mock.emit).to.be.calledOnce;
                    expect(websocket_emit_args[0]).to.equal("broadcast");
                    expect(websocket_emit_args[1]).to.deep.equal(env.event_packet.name);
                    expect(websocket_emit_args[2]).to.deep.equal(env.event_packet.payload);
                });
            });
        });

    });
});
