/**
 *  Authorization Module Tests
 */
define([ "authorize" ], function(authorize) {
    "use strict";

    suite("Authorization Module", function() {

        test("should exist", function() {
            expect(authorize).to.be.a("function");
        });

        test("should call callback without error", function() {
            authorize({}, env.spy);
            expect(env.spy).to.be.calledOnce;
        });

    });
});
