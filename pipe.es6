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

const IO_PORT = 4242;

const OK = 'OK';
const HTTP_SUCCESS = 200;


import {createServer} from 'http';
import bind from 'socket.io';


import log from './lib/log';

let app = createServer((req, res) => {
    res.writeHead(HTTP_SUCCESS);
    res.end(OK);
});

let io = bind(app);

app.listen(IO_PORT);

log(`Board:: Pipe is running at port '${IO_PORT}'.`);
