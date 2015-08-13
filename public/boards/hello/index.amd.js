define(['exports'], function (exports) {
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

    var socket = io('http://localhost:4242/hello');

    socket.on('connect', function () {});

    socket.on('board', function (data) {
        var parsed = JSON.parse(data);
    });

    debugger;

    socket.on('disconnect', function () {
        socket.socket.connect();
    });
});

//# sourceMappingURL=index.amd.js.map