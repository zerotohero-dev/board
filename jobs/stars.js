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

var _libJob = require('../lib/job');

(0, _libJob.create)({
    interval: 5,
    targets: ['hello', 'world']
}, function (send) {
    var data = { carrot: 1, tomatoes: 1, status: 'so so', chili: 'hot!' };

    send(data);
}, function (err) {
    console.log(err);
});

//# sourceMappingURL=stars.js.map