'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _queue = require('./queue');

// TODO: creating a single socket server will mean pushing the data of all
// the job to everybody through HTTP, that's not ideal. Find a better way.
// use socket.io namespaces probably as it's the easiest to implement.

var sock = (0, _queue.createPullSocket)(function (data) {});

var handler = function handler(req, res) {};

//# sourceMappingURL=pipe.js.map