define(['exports', 'http', 'fs', 'path', 'socket.io', './queue', './log'], function (exports, _http, _fs, _path, _socketIo, _queue, _log) {
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

    var _socketIo2 = _interopRequireDefault(_socketIo);

    var _log2 = _interopRequireDefault(_log);

    var OK = 'OK';
    var HTTP_SUCCESS = 200;
    var IO_PORT = 4242;

    var server = (0, _http.createServer)();
    var io = (0, _socketIo2['default'])(server);

    server.listen(IO_PORT);

    var namespaces = {};

    var noop = function noop() {};

    var createChannel = function createChannel(channel) {
        namespaces[channel] = io.of('/' + channel);
    };

    var _init = function init(channels) {
        channels.forEach(function (channel) {
            return createChannel(channel);
        });

        (0, _queue.createPullSocket)(function (data) {
            if (!data) {
                return;
            }

            var parsed = JSON.parse(data.toString());
            var target = parsed.target;

            if (!target) {
                return;
            }

            if (namespaces[target]) {
                (0, _log2['default'])('Emitting data for "' + target + '"');

                namespaces[target].emit('board', data.toString());
            }
        });

        // init is like a constructor function; or "like" a static initializer;
        // therefore it should be called only once.
        _init = noop;
    };

    exports.init = _init;

    // targets: channels
    //
    // /dashboards/hello
    // /dashboards/world
    // /dashboards/all

    // TODO: creating a single socket server will mean pushing the data of all
    // the job to everybody through HTTP, that's not ideal. Find a better way.
    // use socket.io namespaces probably as it's the easiest to implement.

    // TODO: hack on a documentation generator project.
    // why?
    // javadoc style documentation is not good enough for javascript.
    // the best documentation should be inline with the source code; however
    // no one wants to read the private parts of the source in the docs.
    // so make a parser that reads the file, and creates markdown doc files
    // between delimeters like <!--begindoc--> <!--enddoc--> for instance.
    // the app should be able to parse  @param tags into a nicely laid out
    // definition list, and it should consider all documentation comments
    // as markdown.

    // TODO: something reads the config json and creates the /public folder.

    //let sock = createSocket((data) => {
    //    log('SOCKET: incoming data', data);
    //});

    //let handler = (req, res) => {
    //
    //};
});

//# sourceMappingURL=pipe.amd.js.map