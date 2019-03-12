const http = require('http');

const product = {
  id: 1,
  name: 'Supreme T-Shirt',
  brand: 'Supreme',
  price: 99.99,
  options: [
      { color: 'blue'},
      { size: 'XL'}
  ]
};

http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify(product));
    req.on('error', (err) => {
        console.log(err);
    });
    res.on('error', (err) => {
        console.log(err);
    });
})
    .listen(8080, 'localhost', 10);
