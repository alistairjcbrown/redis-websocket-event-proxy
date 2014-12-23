/**
 *  Utils
 *
 *  A collection of useful functions
 */
define([ "check", "expirable" ], function(check, Expirable) {
    "use strict";

    var Utils = function() {

        this.parseJSON = function(data_string) {
            var data_object;
            try {
                data_object = JSON.parse(data_string);
            } catch(e) {}

            if (check(data_object).is("undefined")) {
                return data_string;
            }
            return data_object;
        };

        this.argumentsSplat = function(data_array) {
            return Array.prototype.slice.call(data_array, 1);
        };

        this.cache = (function() {
            return new Expirable({
                expire: "500 ms",
                interval: "10 seconds"
            });
        }());

    };

    return new Utils();
});
