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
    tile: 'shield',

    class: 'success',

    title: 'Shield Health',
    health: '100%'
};

var damage = 0;


require('board.job').create({
    interval: 0.5,
    targets: ['shuttle', 'shield']
}, function(send) {
    var className = 'success';

    if (damage < 100) {
        damage++;
    }

    if (damage < 80) {
        className = 'success';
    } else  if (damage < 90) {
        className = 'warning';
    } else if (damage === 100) {
        damage++;

        setTimeout(function() {
            damage = 0;
        }, 5000);

        className = 'error';
    } else {
        className = 'error';
    }


    data.class = className;
    data.health = (100 - damage < 0 ? 0 : 100 - damage) + '%';

    send(data);
}, function(err) {console.log(err);});
