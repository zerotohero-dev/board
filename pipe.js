'use strict';

/*
 * board — A minimalist dashboard and monitoring solution.
 *
 * This program is distributed under the terms of the MIT license.
 * Please see the LICENSE.md.md file for details.
 */

// TODO: find something that parses these doc tags and creates documentation.
// or at least after finishing the project, thing about whether inline
// documentation is sufficient or not.

/**
 * ## Pipe ##
 *
 * Pipe is a WebSocket server that consumes messages from the running jobs and
 * dispatches them to the registered clients.
 */

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _http = require('http');

var _socketIo = require('socket.io');

var _socketIo2 = _interopRequireDefault(_socketIo);

var _libLog = require('./lib/log');

var _libLog2 = _interopRequireDefault(_libLog);

var IO_PORT = 4242;

var OK = 'OK';
var HTTP_SUCCESS = 200;

var app = (0, _http.createServer)(function (req, res) {
  res.writeHead(HTTP_SUCCESS);
  res.end(OK);
});

var io = (0, _socketIo2['default'])(app);

app.listen(IO_PORT);

(0, _libLog2['default'])('Board:: Pipe is running at port \'' + IO_PORT + '\'.');

//# sourceMappingURL=pipe.js.map