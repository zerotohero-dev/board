'use strict';

/*
 *  ______                     _________
 *  ___  /_____________ _____________  /
 *  __  __ \  __ \  __ `/_  ___/  __  /
 *  _  /_/ / /_/ / /_/ /_  /   / /_/ /
 *  /_.___/\____/\__,_/ /_/    \__,_/
 *      a minimalist dashboard and monitoring solution.
 *
 * This program is distributed under the terms of the MIT license.
 * Please see `LICENSE.md` file for details.
 *
 * Send your comments and suggestions to…
 * <https://github.com/v0lkan/board/issues>
 */

Object.defineProperty(exports, '__esModule', {
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