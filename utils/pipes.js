const stream = require('stream');
const through = require('through2');

const upper = function (buffer, encodding, cb) {
    let res = buffer.toString().toUpperCase();
    cb(null, res);
    process.exit(0);
};

/*function start() {
    process.stdin
        .pipe(through(upper))
        .pipe(process.stdout);
}*/

function start() {
    process.stdin
        .pipe(through(upper))
        .pipe(process.stdout);
}

start();