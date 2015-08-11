"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var every = function every(seconds, delegate) {
    setInterval(function () {
        try {
            delegate();
        } catch (ignore) {
            console.log(ignore);
        }
    }, seconds * 1000);
};

exports.every = every;

//# sourceMappingURL=runner.js.map