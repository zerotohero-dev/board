'use strict';

var _libRunner = require('../lib/runner');

var _libQueue = require('../lib/queue');

var sock = (0, _libQueue.createPushSocket)();

(0, _libRunner.every)(3, function () {
    var time = new Date().getTime();

    sock.send({ sender: 'jobs/hello', ts: time });

    console.log('world: ' + time);
});

//# sourceMappingURL=queue.js.map