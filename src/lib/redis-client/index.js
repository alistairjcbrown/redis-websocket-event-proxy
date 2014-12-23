/**
 *  Redis client
 */
define([
    "redis", "pubsub", "config", "check", "utils"
], function(
    redis, pubsub, config, check, utils
) {
    "use strict";
    var redis_pubsub = {},
        proxyEventToClients, proxyEventToServer,
        createRedisClient, setupListener, setupEmitter;

    proxyEventToClients = function(event_name, data) {
        data = utils.parseJSON(data);

        var event_packet = {
            name: event_name,
            payload: data
        };

        pubsub.trigger("to-clients", event_packet);
    };

    proxyEventToServer = function(event_packet) {
        redis_pubsub.emitter.publish(event_packet.name, event_packet.payload);
    };

    createRedisClient = function() {
        var redis_config = check(config.redis).is("object") ? config.redis : {},
            host = redis_config.host || "127.0.0.1",
            port = redis_config.port || 6379;

        return redis.createClient(port, host, redis_config.options);
    };

    setupListener = function(listener) {
        listener.psubscribe("*");
        listener.on("pmessage", function (pattern, event_name, message) {
            proxyEventToClients(event_name, message);
        });

        return listener;
    };

    setupEmitter = function(emitter) {
        pubsub.on("to-server", proxyEventToServer);
        return emitter;
    };

    return {
        instance: function() {
            return redis_pubsub;
        },
        start: function() {
            redis_pubsub.emitter = setupEmitter(createRedisClient()),
            redis_pubsub.listener = setupListener(createRedisClient());
        }
    };
});
