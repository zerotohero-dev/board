'use strict';

import {every} from '../lib/runner';
import {createPushSocket as createSocket} from '../lib/queue';

let sock = createSocket();

every(3, () => {
    let time = (new Date()).getTime();

    sock.send({sender: 'jobs/world', ts: time});
});
