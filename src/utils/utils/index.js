/**
 *  Utils
 *
 *  A collection of useful functions
 */
define([ "check" ], function(check) {
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

    };

    return new Utils();
});
