define(['exports', 'zmq', './log'], function (exports, _zmq, _log) {
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

    Object.defineProperty(exports, '__esModule', {
        value: true
    });

    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

    var _zmq2 = _interopRequireDefault(_zmq);

    var _log2 = _interopRequireDefault(_log);

    var TCP_ENDPOINT = 'tcp://127.0.0.1';
    var PORT = 4243;
    var TRANSPORT = 'dashboard-transport';
    var URL = TCP_ENDPOINT + ':' + PORT;

    var createPullSocket = function createPullSocket(messageHandler) {
        var sock = null;

        var handler = function handler(data) {
            messageHandler(data);
        };

        var _disconnect = function _disconnect() {
            if (!sock) {
                return;
            }

            sock.removeAllListeners();
            sock.unbind();
            sock = null;
        };

        var _connect = function _connect() {
            sock = _zmq2['default'].socket('sub');

            if (!sock) {
                return;
            }

            sock.bind(URL, function (err) {
                if (err) {
                    sock = null;
                }

                sock.subscribe(TRANSPORT);
            });
        };

        var listen = function listen() {
            if (!sock) {
                return;
            }

            sock.on('error', function (err) {
                void err;
            });
            sock.on('message', function (topic, message) {
                handler(message);
            });
        };

        _connect();
        listen();

        (0, _log2['default'])('Board:: Message bus [PULL] socket connected to port ' + PORT + '.');

        return {
            disconnect: function disconnect() {
                _disconnect();
            },
            connect: function connect() {
                _connect();
                listen();
            }
        };
    };

    var createPushSocket = function createPushSocket() {
        var sock = null;

        var _connect2 = function _connect2() {
            sock = _zmq2['default'].socket('pub');

            if (!sock) {
                return;
            }

            sock.connect(URL, function (err) {
                if (err) {
                    sock = null;
                }
            });
        };

        var _disconnect2 = function _disconnect2() {
            sock.removeAllListeners();
            sock.disconnect();
            sock = null;
        };

        var listen = function listen() {
            sock.on('error', function (err) {
                void err;
            });
        };

        _connect2();
        listen();

        (0, _log2['default'])('Board:: Message bus [PUSH] socket connected to port ' + PORT + '.');

        return {
            send: function send(data) {
                if (!sock) {
                    return;
                }

                sock.send([TRANSPORT, JSON.stringify(data)]);
            },
            connect: function connect() {
                _connect2();
                listen();
            },
            disconnect: function disconnect() {
                _disconnect2();
            }
        };
    };

    exports.createPullSocket = createPullSocket;
    exports.createPushSocket = createPushSocket;
});

//# sourceMappingURL=queue.amd.js.map