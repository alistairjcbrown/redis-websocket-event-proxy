/**
 *  Redis mock
 */
define([ "sinon", "fakeredis" ], function(sinon, redis) {
    "use strict";

    var sb = sinon.sandbox.create(),
        createRedisClient = redis.createClient;

    sb.stub(redis, "createClient", function() {
        var client = createRedisClient();

        sb.spy(client, "publish");
        sb.spy(client, "psubscribe");
        sb.spy(client, "on");

        return client;
    });

    return redis;
});
