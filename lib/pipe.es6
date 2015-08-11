'use strict';

import {createServer} from 'http';
import {exists, readFile} from 'fs';
import {join} from 'path';

import {createPullSocket as createSocket} from './queue';
import log from './log';

const CONFIG_PATH = join(__dirname, '../config.json');

let handler = (req, res) => {

};

let initializeSockets = (targets) => {
    targets.forEach((target) => {

    });
};

let initialize = (config) => {
    let {targets} = config;

    if (!targets) {return;}

    initializeSockets(targets);
};

let processJson = (err, data) => {
    if (err) {return;}

    let config = JSON.parse(data);

    initialize(config);
};

let checkExistence = (available) => {
    if (!available) {return;}

    readFile(CONFIG_PATH, {encoding: 'utf8'}, processJson);
};

exists(CONFIG_PATH, checkExistence());


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

let sock = createSocket((data) => {
    log('SOCKET: incoming data', data);
});

//let handler = (req, res) => {
//
//};
