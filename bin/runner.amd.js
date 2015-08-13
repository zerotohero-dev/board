define(['exports', 'glob', 'child_process', 'path', '../lib/log'], function (exports, _glob, _child_process, _path, _libLog) {
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

    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

    var _glob2 = _interopRequireDefault(_glob);

    var _log = _interopRequireDefault(_libLog);

    (0, _log['default'])('Board:: Starting Job Runner…');

    (0, _glob2['default'])('jobs/**/*.js', {
        cwd: (0, _path.join)(__dirname, '..')
    }, function (err, files) {
        console.log(files);

        if (err) {
            return;
        }

        files.forEach(function (file) {
            var process = (0, _child_process.spawn)('node', [(0, _path.join)(__dirname, '..', file)]);

            process.stdout.on('data', function (data) {
                (0, _log['default'])(data.toString());
            });

            process.stderr.on('data', function (data) {
                (0, _log['default'])(data.toString());
            });
        });
    });

    (0, _log['default'])('Board:: Job Runner has started.');
});

//# sourceMappingURL=runner.amd.js.map