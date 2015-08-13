'use strict';

import glob from 'glob';
import {spawn} from 'child_process';
import {join} from 'path';

import log from '../lib/log';

log('Board:: Starting Job Runner…');

glob('jobs/**/*.js', {
    cwd: join(__dirname, '..')
}, function (err, files) {
    console.log(files);

    if (err) {return;}

    files.forEach((file) => {
        let process = spawn('node', [join(__dirname, '..', file)]);

        process.stdout.on('data', (data) => {
            log(data.toString());
        });

        process.stderr.on('data', (data) => {
            log(data.toString());
        })
    });
});

log('Board:: Job Runner has started.');
