var redis = require("redis"),
    client = redis.createClient();

console.log("Listening for redis events...")

client.psubscribe("*");
client.on("pmessage", function (pattern, event_name, message) {
    console.log("Event: '" + event_name + "', Payload: '" + message + "");
});
