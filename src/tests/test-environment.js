/**
 *  Websocket Server Tests
 */
define([
    "squire", "chai", "sinon", "sinon-chai"
],
function(
    Squire, chai, sinon, sinon_chai
) {
    "use strict";

    global.env = {};
    global.expect = chai.expect;

    chai.use(sinon_chai);

    setup(function() {
        env = {};
        env.sb = sinon.sandbox.create();
        env.spy = env.sb.spy();
        env.injector = new Squire();
    });

    teardown(function() {
        env.sb.reset();
    });

});
