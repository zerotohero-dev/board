define(['exports', 'fs', 'path'], function (exports, _fs, _path) {
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

    // TODO: move this to a proper polyfills file.
    if (!String.prototype.endsWith) {
        String.prototype.endsWith = function (searchString, position) {
            var subjectString = this.toString();
            if (position === undefined || position > subjectString.length) {
                position = subjectString.length;
            }
            position -= searchString.length;
            var lastIndex = subjectString.indexOf(searchString, position);
            return lastIndex !== -1 && lastIndex === position;
        };
    }

    var serve = function serve() {
        (0, _fs.readdir)((0, _path.join)(__dirname, '../jobs'), function (err, data) {
            if (err) {
                return;
            }

            data.forEach(function (item) {
                if (item.endsWith('.js')) {
                    require((0, _path.join)(__dirname, '../jobs/', item));
                }
            });
        });
    };

    exports.serve = serve;
});

//# sourceMappingURL=init.amd.js.map