const http = require('http');

http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    req.pipe(res);

    req.on('error', (err) => {
        console.log(err);
    });
    res.on('error', (err) => {
        console.log(err);
    });
})
    .listen(8080, 'localhost', 10);
