'use strict';

import {create} from '../lib/job';

create({
    interval: 5,
    targets: ['world']
}, (send) => {
    let data = { carrot: 21, tomatoes: 51, status: 'down', carrots: 'yuck!' };

    send(data);
}, (err) => { console.log(err); });
