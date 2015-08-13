define(['exports', 'module'], function (exports, module) {
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

  var log = function log() {
    for (var _len = arguments.length, items = Array(_len), _key = 0; _key < _len; _key++) {
      items[_key] = arguments[_key];
    }

    console.log(items);
  };

  module.exports = log;
});

//# sourceMappingURL=log.amd.js.map