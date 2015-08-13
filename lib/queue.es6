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

import zmq from 'zmq';

import log from './log';

const TCP_ENDPOINT = 'tcp://127.0.0.1';
const PORT = 4243;
const TRANSPORT = 'dashboard-transport';
const URL = `${TCP_ENDPOINT}:${PORT}`;

let createPullSocket = (messageHandler) => {
    let sock = null;

    let handler = (data) => {
        messageHandler(data);
    };

    let disconnect = () => {
        if (!sock) {return;}

        sock.removeAllListeners();
        sock.unbind();
        sock = null;
    };

    let connect = () => {
        sock = zmq.socket('sub');

        if (!sock) {return;}

        sock.bind(URL, (err) => {
            if (err) {sock = null;}

            sock.subscribe(TRANSPORT);
        });
    };

    let listen = () => {
        if (!sock) {return;}

        sock.on('error', (err) => {void err;});
        sock.on('message', (topic, message) => {handler(message);});
    };

    connect();
    listen();

    log(`Board:: Message bus [PULL] socket connected to port ${PORT}.`);

    return {
        disconnect: () => {disconnect();},
        connect: () => {
            connect();
            listen();
        }
    };
};

let createPushSocket = () => {
    let sock = null;

    let connect = () => {
        sock = zmq.socket('pub');

        if (!sock) {return;}

        sock.connect(URL, (err) => {
            if (err) {
                sock = null;
            }
        });
    };

    let disconnect = () => {
        sock.removeAllListeners();
        sock.disconnect();
        sock = null;
    };

    let listen = () => {
        sock.on('error', (err) => {void err;});
    };

    connect();
    listen();

    log(`Board:: Message bus [PUSH] socket connected to port ${PORT}.`);

    return {
        send: (data) => {
            if (!sock) {return;}

            sock.send([TRANSPORT, JSON.stringify(data)]);
        },
        connect: () => {
            connect();
            listen();
        },
        disconnect: () => {
            disconnect();
        }
    };
};

export {createPullSocket, createPushSocket};
