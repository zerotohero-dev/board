import {readdir as read} from 'fs';
import {join} from 'path';

// TODO: move this to a proper polyfills file.
if (!String.prototype.endsWith) {
    String.prototype.endsWith = function(searchString, position) {
        var subjectString = this.toString();
        if (position === undefined || position > subjectString.length) {
            position = subjectString.length;
        }
        position -= searchString.length;
        var lastIndex = subjectString.indexOf(searchString, position);
        return lastIndex !== -1 && lastIndex === position;
    };
}

let serve = () => {
    read(join(__dirname, '../jobs'), (err, data) => {
        if (err) {return;}

        data.forEach((item) => {
            if (item.endsWith('.js')) {
                require(join(__dirname, '../jobs/', item));
            }
        });
    });
};

export {serve};
