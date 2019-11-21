const mongoose = require('mongoose');
const config = require('../config/config');

const initMongo = () => {
    mongoose.connect(config.mongo.url);
    mongoose.set('debug', true);
    mongoose.connection
        .on('error', () => console.log('Connection error'))
        .once('open', () => console.log('Connected'));
};

module.exports = initMongo;