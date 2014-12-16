/**
 *  Redis client Tests
 */
define([ "fakeredis" ],
function(redis_mock) {
    "use strict";

    suite("HTTP Server", function() {
        var redis;

        suiteSetup(function(done) {
            injector.mock("redis", redis_mock);
            injector.require(["lib/redis-client"], function(redis_client) {
                redis = redis_client;
                done();
            });
        });

        test("should exist", function() {
            expect(redis).to.be.an("object");
        });

    });
});
