const http = require('http');
const MongoClient = require('mongodb').MongoClient;
const config = require('../config/config');

http.createServer((req, res) => {
    let database;
    MongoClient.connect(config.mongo.url)
        .then(db => {
            database = db;
            return db.db(config.mongo.dbName);
        })
        .then(dbo => dbo.collection('cities'))
        .then(conn => conn.aggregate([{$sample: {size: 1}}]).next())
        .then(city => {
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify(city));
        })
        .catch(console.error)
        .finally(() => database.close());
})
    .listen(8080, 'localhost', 10);
