'use strict';

import {create} from '../lib/job';

create({
    interval: 5,
    targets: ['hello', 'world']
}, (send) => {
    let data = { carrot: 1, tomatoes: 1, status: 'so so', chili: 'hot!' };

    send(data);
}, (err) => { console.log(err); });
