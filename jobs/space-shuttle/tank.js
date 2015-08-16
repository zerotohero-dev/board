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

var data = {
    tile: 'tank',
    class: 'success',

    title: 'Fuel Level',
    remaining: '100%'
};
var remaining = 100;

require('board.job').create({
    interval: 0.6,
    targets: ['shuttle']
}, function(send) {
    var className = 'success';

    remaining--;

    if (remaining > 60) {
        className = 'success';
    } else  if (remaining > 20) {
        className = 'warning';
    } else {
        if (remaining === 0) {
            setTimeout(function() {
                remaining = 100;
            }, 5000);
        }

        className = 'error';
    }

    data.class = className;
    data.remaining = (remaining < 0 ? 0 : remaining) + '%';

    send(data);
}, function(err) {console.log(err);});
