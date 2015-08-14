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

// Web server to serve static assets under "public";
// For development only.
// For production it's recommended to recommended to replace it with
// NGINX, or HAProxy.

import express from 'express';
import {join} from 'path';
import {createReadStream} from 'fs';
const PORT = 4244;

let app = express();

app.use(express.static(join(__dirname, '../public')));

app.get('/:boardName', function(req, res) {
    createReadStream(join(__dirname, '../layout/index.html')).pipe(
        res
    );
    //res.end('hello');
})

app.listen(PORT);
