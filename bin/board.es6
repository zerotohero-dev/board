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

import glob from 'glob';
import {spawn} from 'child_process';
import {join} from 'path';

import log from '../lib/log';

log('Board:: Starting All the thingz…');

let files= ['runner', 'pipe', 'web'];

files.forEach((file) => {
    let process = spawn('node', [join(__dirname, file)]);

    process.stdout.on('data', (data) => {
        log(data.toString());
    });

    process.stderr.on('data', (data) => {
        log(data.toString());
    })
});

log('Board:: Started all the thingz.');
