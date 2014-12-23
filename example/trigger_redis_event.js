var redis = require("redis"),
    client = redis.createClient();

client.publish("server-action", "Message from the server running on " + process.platform + ". " +
                          "The time is " + new Date() + " and this message is being triggered by process " + process.pid);

setTimeout(function() {
    process.exit();
}, 500);
