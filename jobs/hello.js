'use strict';

var _libRunner = require('../lib/runner');

console.log('hello world');

(0, _libRunner.every)(3, function () {
    var time = new Date().getTime();

    console.log('tick: ' + time);
});

//# sourceMappingURL=hello.js.map