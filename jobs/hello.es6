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
    let data = {
        tile: 'project-status',
        title: 'Project Completeness',
        message: '1 of 10 tasks done.',
        percentage: '90%'
    };

    send(data);
}, (err) => { console.log(err); });
