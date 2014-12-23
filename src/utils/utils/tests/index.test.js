/**
 *  Utils Module Tests
 */
define([ "utils" ], function(utils) {
    "use strict";

    suite("Utils Module", function() {
        test("should exist", function() {
            expect(utils).to.be.an("object");
        });

        suite("parseJSON", function() {
            test("should exist", function() {
                expect(utils.parseJSON).to.be.a("function");
            });

            suite("when provided valid JSON", function() {
                test("should return an object", function() {
                    var input = "{\"foo\": \"bar\"}",
                        output = { foo: "bar" };
                    expect(utils.parseJSON(input)).to.deep.equal(output);
                });

                test("should return an array", function() {
                    var input = "[\"foo\", \"bar\"]",
                        output = [ "foo", "bar" ];
                    expect(utils.parseJSON(input)).to.deep.equal(output);
                });

                test("should return a string", function() {
                    var input = "\"foo\"",
                        output = "foo";
                    expect(utils.parseJSON(input)).to.equal(output);
                });

                test("should return a number", function() {
                    var input = "123",
                        output = 123;
                    expect(utils.parseJSON(input)).to.equal(output);
                });
            });

            suite("when provided invalid JSON", function() {
                test("should return the input", function() {
                    var input = "{foo:'bar'}";
                    expect(utils.parseJSON(input)).to.equal(input);
                });
            });
        });
    });
});
