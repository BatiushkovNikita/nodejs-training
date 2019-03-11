//import net from 'net';
const http = require('http');

const server = http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/html'});

    res.end('Hello World');
});

server.listen(8080, 'localhost', 10);

