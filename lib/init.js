'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _fs = require('fs');

var _path = require('path');

// TODO: move this to a proper polyfills file.
if (!String.prototype.endsWith) {
    String.prototype.endsWith = function (searchString, position) {
        var subjectString = this.toString();
        if (position === undefined || position > subjectString.length) {
            position = subjectString.length;
        }
        position -= searchString.length;
        var lastIndex = subjectString.indexOf(searchString, position);
        return lastIndex !== -1 && lastIndex === position;
    };
}

var serve = function serve() {
    (0, _fs.readdir)((0, _path.join)(__dirname, '../jobs'), function (err, data) {
        if (err) {
            return;
        }

        data.forEach(function (item) {
            if (item.endsWith('.js')) {
                require((0, _path.join)(__dirname, '../jobs/', item));
            }
        });
    });
};

exports.serve = serve;

//# sourceMappingURL=init.js.map