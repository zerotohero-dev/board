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
var quotes = [
    'Train yourself to let go of everything you fear to lose.',
    'Do, or do not. — There’s no try.',
    'Fear is the path to the dark side. Fear leads to anger. Anger leads to' +
    ' hate. Hate leads to suffering.',
    'A Jedi uses the Force for knowledge and defense, never for attack.',
    'Always pass on what you have learned.',
    'Powerful you have become, the dark side I sense in you.',
    'PATIENCE YOU MUST HAVE my young padawan!'
];
var data = {
    tile: 'quotes',
    class: 'info',
    title: 'Quote of the Minute',
    quote: quotes[0]
};
var index = 0;

require('board.job').create({
    interval: 5,
    targets: ['shuttle']
}, function(send) {
    index = ++index % quotes.length;

    data.quote = quotes[index];

    send(data);
}, function(err) {console.log(err);});
