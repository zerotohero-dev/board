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

// TODO: move Board lib to a separate npm module.
// this project should only contain the bare minimum that the user has to
// configure to run the bhards.
// import * as job from 'board.lib/job'
// or better `import * as job from 'board.job'
import * as job from '../lib/job';


job.create({
    interval: 3,
    targets: ['hello']
}, (send) => {
    let data = {
        tile: 'project-status',
        class: 'success',
        title: 'Project Completeness',
        message: '1 of 10 tasks done.',
        percentage: '90%'
    };

    send(data);
}, (err) => { console.log(err); });
