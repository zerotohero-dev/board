'use strict';

var _libJob = require('../lib/job');

(0, _libJob.create)({
    interval: 5,
    targets: ['hello', 'world']
}, function (send) {
    var data = { carrot: 1, tomatoes: 1, status: 'so so', chili: 'hot!' };

    send(data);
}, function (err) {
    console.log(err);
});

//# sourceMappingURL=stars.js.map