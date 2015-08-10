'use strict';

import http from 'http';

import {createPullSocket as createSocket} from './queue';

// TODO: creating a single socket server will mean pushing the data of all
// the job to everybody through HTTP, that's not ideal. Find a better way.
// use socket.io namespaces probably as it's the easiest to implement.

let sock = createSocket((data) => {

});

let handler = (req, res) => {

};
