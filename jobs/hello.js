'use strict';

var _libRunner = require('../lib/runner');

var _libPipe = require('../lib/pipe');

var app = require('http').createServer(handler);
var io = require('socket.io')(app);
var fs = require('fs');

app.listen(80);

function handler(req, res) {
    fs.readFile(__dirname + '/index.html', function (err, data) {
        if (err) {
            res.writeHead(500);
            return res.end('Error loading index.html');
        }

        res.writeHead(200);
        res.end(data);
    });
}

io.on('connection', function (socket) {
    socket.emit('news', { hello: 'world' });
    socket.on('my other event', function (data) {
        console.log(data);
    });
});

(0, _libRunner.every)(3, function () {
    var time = new Date().getTime();

    console.log('hello: ' + time);
});

//# sourceMappingURL=hello.js.map