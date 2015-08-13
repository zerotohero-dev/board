define(['exports', 'express', 'path'], function (exports, _express, _path) {
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

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _express2 = _interopRequireDefault(_express);

  var app = (0, _express2['default'])();

  app.use(_express2['default']['static']((0, _path.join)(__dirname, '../public')));

  app.listen(4244);
});

//# sourceMappingURL=web.amd.js.map