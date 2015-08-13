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

import {create} from '../lib/job';

create({
    interval: 5,
    targets: ['world']
}, (send) => {
    let data = { carrot: 21, tomatoes: 51, status: 'down', carrots: 'yuck!' };

    send(data);
}, (err) => { console.log(err); });
