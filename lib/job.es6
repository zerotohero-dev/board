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

import {every} from './runner';
import {createPushSocket as createSocket} from './queue';
import log from './log';

let noop = () => {};

let create = (config, delegate, callback) => {
    let sock = createSocket();

    // TODO: throw if target not specified.
    // TODO: throw if target not in config.
    // callback(new Error(), noop);

    let send = (data) => {
        data.ts = data.ts || (new Date()).getTime();

        let targets = config.targets || [];

        targets.forEach((target) => {
            data.target = target;

            //log(`sending:: '${JSON.stringify(data)}'`);
            sock.send(data);
        });
    };

    every(config.interval || 30, () => {
        try {
            delegate(send);
        } catch (err) {
        }
    });

    callback(null);
};

export {create};
