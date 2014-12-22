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

    var setup_suite_environment, setup_test_environment,
        teardown_test_environment, teardown_suite_environment;

    setup_suite_environment = function() {
        env = {};
        env.sb = sinon.sandbox.create();
        env.spy = env.sb.spy();
    };
    setup_test_environment = setup_suite_environment;
    teardown_test_environment = function() {
        env.sb.reset();
        env.sb.restore();
    };
    teardown_suite_environment = function() {
        injector.remove();
    };

    global.env = {};
    global.expect = chai.expect;
    global.injector = new Squire();

    chai.use(sinon_chai);

    setup_suite_environment();

    suiteSetup(setup_suite_environment);
    setup(setup_test_environment);
    teardown(teardown_test_environment);
    suiteTeardown(teardown_suite_environment);
});
