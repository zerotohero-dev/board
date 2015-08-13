'use strict';

/*
 * board — A minimalist dashboard and monitoring solution.
 *
 * This program is distributed under the terms of the MIT license.
 * Please see the LICENSE.md.md file for details.
 */

import {init} from '../lib/pipe';
import {boards} from '../config.json';

init(boards);
