'use strict';

import {createServer} from 'http';
import {exists, readFile} from 'fs';
import {join} from 'path';
import socketIo from 'socket.io';

import {createPullSocket as createSocket} from './queue';
import log from './log';

const OK = 'OK';
const HTTP_SUCCESS = 200;
const IO_PORT = 4242;


let server = createServer();
let io = socketIo(server);

server.listen(IO_PORT);

let namespaces = {};

let noop = () => {};

let createChannel = (channel) => {
    namespaces[channel] = io.of(`/${channel}`);
};

let init = (channels) => {
    channels.forEach(channel => createChannel(channel));

    createSocket((data) => {
        let target = parsed.target;

        if (!target) {return;}

        if (namespaces[target]) {
            console.log(data.toString());
            namespaces[target].emit('board', data);
        }
    });

    // init is like a constructor function; or "like" a static initializer;
    // therefore it should be called only once.
    init = noop;
};

export {init};


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
