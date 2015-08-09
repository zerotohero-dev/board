console.log('hello world');

import {every} from '../lib/runner';

every(3, () => {
    let time = (new Date()).getTime();

    console.log(`tick: ${time}`);
});
