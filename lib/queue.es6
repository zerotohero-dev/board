'use strict';

import zmq from 'zmq';

const TCP_ENDPOINT = 'tcp://127.0.0.1';
const PORT = 4243;

let createPullSocket = (messageHandler) => {
    let sock = null;

    let handler = (data) => {
        messageHandler(data);
    };

    let disconnect = () => {
        if (!sock) {return;}

        sock.removeAllListeners();
        sock.disconnect();
        sock = null;
    };

    let connect = () => {
        sock = zmq.socket('pull');

        if (!sock) {return;}

        sock.connect(`${TCP_ENDPOINT}:${PORT}`, (err) => {
            if (err) {sock = null;}
        });
    };

    let listen = () => {
        if (!sock) {return;}

        sock.on('error', (err) => {void err;});
        sock.on('message', (data) => {handler(data);});
    };

    connect();
    listen();

    log('Board:: Message bus [PULL] socket connected to port ${PORT}.');

    return {
        disconnect: () => {disconnect();}
        connect: () => {
            connect();
            listen();
        }
    };
};

let createPushSocket = () => {
    let sock = null;

    let connect = () => {
        sock = zmq.socket('push');

        if (!sock) {return;}

        sock.bind(`${TCP_ENDPOINT}:${PORT}`, (err) => {
            if (err) {sock = null;}
        });
    };

    let disconnect = () => {
        sock.removeAllListeners();
        sock.unbind();
        sock = null;
    };

    let listen = () => {
        sock.on('error', (err) => {void err;});
    };

    connect();
    listen();

    log('Board:: Message bus [PUSH] socket connected to port ${PORT}.');

    return {
        send: (data) => {
            if (!sock) {return;}

            sock.send(data);
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
