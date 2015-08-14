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

import {createServer} from 'http';
import {exists, readFile} from 'fs';
import {join} from 'path';
import socketIo from 'socket.io';

import {createPullSocket as createSocket} from './queue';
import log from './log';

const OK = 'OK';
const HTTP_SUCCESS = 200;
const IO_PORT = 4242;

let server = createServer();
let io = socketIo(server);

server.listen(IO_PORT);

let namespaces = {};

let noop = () => {};

let createChannel = (channel) => {
    namespaces[channel] = io.of(`/${channel}`);
};

let init = (channels) => {
    channels.forEach(channel => createChannel(channel));

    createSocket((data) => {
        if (!data) {return;}

        let parsed = JSON.parse(data.toString());
        let target = parsed.target;

        if (!target) {return;}

        if (namespaces[target]) {
            log(`Emitting data for "${target}"`);

            namespaces[target].emit('board', data.toString());
        }
    });

    // init is like a constructor function; or "like" a static initializer;
    // therefore it should be called only once.
    init = noop;
};

export {init};

// targets: channels
//
// /dashboards/hello
// /dashboards/world
// /dashboards/all

// TODO: notify user when navigating to a board url and the board is missing.

//let sock = createSocket((data) => {
//    log('SOCKET: incoming data', data);
//});

//let handler = (req, res) => {
//
//};
