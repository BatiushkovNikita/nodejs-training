import mongoose from 'mongoose';
import config from '../config/config';

const initMongo = () => {
    mongoose.connect(config.mongo.url);
    mongoose.set('debug', true);
    mongoose.connection
        .on('error', () => console.log('Connection error'))
        .once('open', () => console.log('Connected'));
};

module.exports = initMongo;