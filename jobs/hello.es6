'use strict';

import {every} from '../lib/runner';
import {emit} from '../lib/pipe';

var app = require('http').createServer(handler);
var io = require('socket.io')(app);
var fs = require('fs');

app.listen(80);

function handler (req, res) {
    fs.readFile(__dirname + '/index.html',
        function (err, data) {
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



every(3, () => {
    let time = (new Date()).getTime();

    console.log(`hello: ${time}`);
});


let queue = {};
let channels = [];
let channelIndex = 0;

let next = setImmediate || process.nextTick;

let processChannels = () => {
    if (!channels.length) {
        next(processChannels);

        return;
    }

    let channelName = channels[channelIndex];
    let channelQueue = queue[channelName];

    if (!channelQueue.length) {
        next(processChannels);

        return;
    }

    // cache.fetch(channel)
    channelQueue.forEach((data) => {
        socket.emit(channelName, {data: data});
    });

    // cache.reset(channel) -- which will be a problem in a threaded setup -- use message queue instead.
    queue[channelName].length = 0;

    channelIndex = (channelIndex + 1) % channels.length;

    next(processChannels);
};

io.on('connection', (socket) => {
    next(processChannels);


// [ 1 2 3 4 5 6 7 8 ]
    // .pop is an order of magnitude faster than .shift.
    // note that the event order will not be rp
});

// TODO: use zmq for better perf and scalability.
let emit = (channel, data) => {
    // Cache.registerChannel
    if (!queue[channel]) {
        channels.push(channel);
        queue[channel] = [];
    }

// Arrays work for this, but are a bit costly performance-wise in the mixed case. In the pure-stack case (or, as of recent V8 versions, the pure-queue case as well), Arrays are best.
    // Cache.enqueue(channel, data)
    queue[channel].push(data);
};
