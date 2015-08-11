import {every} from './runner';
import {createPushSocket as createSocket} from './queue';
import log from './log';

let noop = () => {};

let create = (config, delegate, callback) => {
    let sock = createSocket();

    // TODO: throw if target not specified.
    // TODO: throw if target not in config.
    // callback(new Error(), noop);

    let send = (data) => {
        data.ts = data.ts || (new Date()).getTime();

        let targets = config.targets || [];

        targets.forEach((target) => {
            data.target = target;

            //log(`sending:: '${JSON.stringify(data)}'`);
            sock.send(data);
        });
    };

    every(config.interval || 30, () => {
        try {
            delegate(send);
        } catch (err) {
        }
    });

    callback(null);
};

export {create};
