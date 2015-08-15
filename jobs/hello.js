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

require('board.job').create({
    interval: 3,

    // TODO: find a few better names.
    targets: ['hello']
}, function(send) {
    var data = {

        // TODO: find better initial sample data; also make the data change
        // in time.
        tile: 'project-status',
        class: 'success',
        title: 'Project Completeness',
        message: '1 of 10 tasks done.',
        percentage: '90%'
    };

    send(data);
}, function(err) {console.log(err);});
