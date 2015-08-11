'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _http = require('http');

var _fs = require('fs');

var _path = require('path');

var _queue = require('./queue');

var _log = require('./log');

var _log2 = _interopRequireDefault(_log);

var CONFIG_PATH = (0, _path.join)(__dirname, '../config.json');

var handler = function handler(req, res) {};

var initializeSockets = function initializeSockets(targets) {
    targets.forEach(function (target) {});
};

var initialize = function initialize(config) {
    var targets = config.targets;

    if (!targets) {
        return;
    }

    initializeSockets(targets);
};

var processJson = function processJson(err, data) {
    if (err) {
        return;
    }

    var config = JSON.parse(data);

    initialize(config);
};

var checkExistence = function checkExistence(available) {
    if (!available) {
        return;
    }

    (0, _fs.readFile)(CONFIG_PATH, { encoding: 'utf8' }, processJson);
};

(0, _fs.exists)(CONFIG_PATH, checkExistence());

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

var sock = (0, _queue.createPullSocket)(function (data) {
    (0, _log2['default'])('SOCKET: incoming data', data);
});

//let handler = (req, res) => {
//
//};

//# sourceMappingURL=pipe.js.map