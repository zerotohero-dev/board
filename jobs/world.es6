'use strict';

import {every} from '../lib/runner';

every(3, () => {
    let time = (new Date()).getTime();

    console.log(`world: ${time}`);
});
