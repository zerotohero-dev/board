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

import {createReadStream, createWriteStream} from 'fs';
import {join} from 'path';

let pipe = (modulePath, vendorPath) => {
    createReadStream(
        join(
            __dirname,
            '..',
            'node_modules/',
            modulePath
        )
    ).pipe(
        createWriteStream(
            join(
                __dirname,
                '../public/js/vendor',
                vendorPath
            )
        )
    );
};

pipe('socket.io/node_modules/socket.io-client/socket.io.js', 'socket.io/socket.io.js');
pipe('requirejs/require.js', 'requirejs/require.js');


