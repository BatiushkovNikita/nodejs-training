const http = require('http');
const fs = require('fs');
const through = require('through2');
const util = require('../utils/utils.js');

const msg = 'Hello World';

http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/html'});
    fs.createReadStream('index.html2')
        .on('error', () => {
            console.error('File not found.');
        })
        .pipe(through(function (buffer, encodding, done) {
            this.push(util.replace(buffer, '{message}', msg));
            done();
        }))
        .pipe(res);
    req.on('error', (err) => {
        console.log(err);
    });
    res.on('error', (err) => {
        console.log(err);
    });
})
    .listen(8080, 'localhost', 10);