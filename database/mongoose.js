import mongoose from 'mongoose';
import config from '../config/config';

mongoose.connect(config.mongo.url);
mongoose.connection
    .on('error', console.log('Connection error'))
    .once('open', console.log('Connected'));

module.exports = mongoose;