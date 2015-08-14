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

var target = window.location.pathname.replace(/\//g, '');
var url = '/boards/' + target + '.html';
var xhr = new XMLHttpRequest();

xhr.addEventListener('load', function () {
    document.getElementById('Yield').innerHTML = xhr.responseText;

    createSocket();
});
xhr.open("get", url, true);
xhr.send();

var createSocket = function createSocket() {
    var socket = io('http://localhost:4242/' + target);

    socket.on('connect', function () {});

    socket.on('board', function (data) {
        if (!data) {
            return;
        }

        var parsed = {};

        try {
            parsed = JSON.parse(data);
        } catch (ignore) {
            return;
        }

        var tile = parsed.tile;

        if (!tile) {
            return;
        }

        var elements = document.querySelectorAll('[data-tile="' + tile + '"]');

        var element = null;
        var keys = Object.keys(parsed);

        // TODO: needs optimization.

        var _loop = function (i, len) {
            element = elements[i];

            if (parsed['class']) {
                element.className = parsed['class'];
            }

            var current = undefined;

            keys.forEach(function (key) {
                current = element.querySelectorAll('[data-name="' + key + '"]');

                if (current) {
                    for (var _i = 0, _len = current.length; _i < _len; _i++) {
                        current[_i].innerHTML = parsed[key];
                    }
                }
            });
        };

        for (var i = 0, len = elements.length; i < len; i++) {
            _loop(i, len);
        }
    });

    socket.on('disconnect', function () {});
};

//# sourceMappingURL=index.js.map