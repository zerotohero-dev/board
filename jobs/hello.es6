'use strict';

// TODO: move Board lib to a separate npm module.
// this project should only contain the bare minimum that the user has to
// configure to run the bhards.
// import * as job from 'board.lib/job'
// or better `import * as job from 'board.job'
import * as job from '../lib/job';

job.create({
    interval: 3,
    targets: ['hello']
}, (send) => {
    let data = { carrot: 12, tomatoes: 45, status: 'up', jellybeans: 'yummy' };

    send(data);
}, (err) => { console.log(err); });
