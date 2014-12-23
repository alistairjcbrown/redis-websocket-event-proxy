/**
 *  Redis client Tests
 */
define([
    "mocks/redis", "mocks/pubsub"
], function(
    redis_mock, pubsub_mock
) {
    "use strict";

    suite("Redis clients", function() {
        var redis;

        suiteSetup(function(done) {
            injector.mock("redis", redis_mock);
            injector.mock("pubsub", pubsub_mock);
            injector.require(["lib/redis-client"], function(redis_client) {
                redis = redis_client;
                redis.start();
                done();
            });
        });

        setup(function() {
            env.event_packet = {
                name: "server-action",
                payload: [ "foo", "bar" ]
            };
            env.stringified_payload = JSON.stringify(env.event_packet.payload);
        });

        test("should exist", function() {
            expect(redis).to.be.an("object");
        });

        suite("startup clients", function() {
            test("should exist", function() {
                expect(redis.start).to.be.a("function");
            });

            test("should create two redis clients", function() {
                expect(redis_mock.createClient).to.have.been.calledTwice;
            });
        });

        suite("get client instances", function() {
            test("should exist", function() {
                expect(redis.instance).to.be.an("function");
            });

            test("should return client instances", function() {
                var redis_instances = redis.instance();
                expect(redis_instances.listener).to.be.instanceOf(redis_mock.RedisClient);
                expect(redis_instances.listener.psubscribe).to.be.calledOnce;
                expect(redis_instances.emitter).to.be.instanceOf(redis_mock.RedisClient);
            });
        });

        suite("setting up clients", function() {
            setup(function() {
                env.clients = redis.instance();
                env.data_event_handler = env.clients.listener.on.getCall(0).args[1];
            });

            suite("redis event", function() {
                test("should proxy onto internal pubsub", function() {
                    env.data_event_handler("*", env.event_packet.name, env.stringified_payload);
                    var pubsub_trigger_args = pubsub_mock.trigger.getCall(0).args;

                    expect(pubsub_mock.trigger).to.be.calledOnce;
                    expect(pubsub_trigger_args[0]).to.equal("to-clients");
                    expect(pubsub_trigger_args[1]).to.deep.equal(env.event_packet);
                });
            });

            suite("internal pubsub event", function() {
                setup(function() {
                    pubsub_mock.on("to-clients", env.spy);
                });

                teardown(function() {
                    pubsub_mock.off("to-clients");
                });

                test("should proxy onto redis event", function() {
                    pubsub_mock.trigger("to-server", env.event_packet);
                    var emitter_publish_args = env.clients.emitter.publish.getCall(0).args;

                    expect(env.clients.emitter.publish).to.be.calledOnce;
                    expect(emitter_publish_args[0]).to.deep.equal(env.event_packet.name);
                    expect(emitter_publish_args[1]).to.deep.equal(env.stringified_payload);
                });

                test("should ignore reflected events", function() {
                    pubsub_mock.trigger("to-server", env.event_packet);
                    env.data_event_handler("*", env.event_packet.name, env.stringified_payload);

                    expect(env.spy).to.not.be.called;
                });
            });
        });

    });
});
