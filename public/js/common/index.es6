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

let target = window.location.pathname.replace(/\//g, '');
let url = `/boards/${target}.html`;
let xhr = new XMLHttpRequest();

xhr.addEventListener('load', () => {
    document.getElementById('Yield').innerHTML = xhr.responseText + '<div id="Spanner"></div>';

    createSocket();
});
xhr.open("get", url, true);
xhr.send();

let createSocket = () => {
    let socket = io(`http://localhost:4242/${target}`);

    socket.on('connect', () => {});

    socket.on('board', (data) => {
        if (!data) {return;}

        let parsed = {};

        try {parsed = JSON.parse(data);}
        catch (ignore) {return;}

        let tile = parsed.tile;

        if (!tile) {return;}

        let elements = document.querySelectorAll(`[data-tile="${tile}"]`);

        let element = null;
        let keys = Object.keys(parsed);

        // TODO: needs optimization.
        for (let i = 0, len = elements.length; i < len; i++) {
            element = elements[i];

            if (parsed.class) {
                element.className = parsed.class;
            }

            let current;

            keys.forEach((key) => {
                current = element.querySelectorAll(`[data-name="${key}"]`);

                if (current) {
                    for (let i = 0, len = current.length; i < len; i++) {
                        current[i].innerHTML = parsed[key];
                    }
                }
            });
        }
    });

    socket.on('disconnect', () => {});
};
