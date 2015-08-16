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
    tile: 'explore',
    class: 'info',
    title: 'Travel Information',
    message: '0 of 100 galaxies have been explored!'
};
var remaining = 100;

require('board.job').create({
    interval: 0.2,
    targets: ['shuttle']
}, function(send) {
    var message = '';

    if (remaining > 0) {
        remaining--;
        message = (100-remaining) + ' of 100 galaxies have been explored!';
    } else if (remaining === 0) {
        remaining--;
        setTimeout(function() {
            remaining = 100;
        }, 5000);

        message = 'Explored all the places! Yay!';
    } else {
        message = 'Explored all the places! Yay!';
    }

    data.message = message;

    send(data);
}, function(err) {console.log(err);});
