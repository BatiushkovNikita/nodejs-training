import mongoose from 'mongoose';
import config from '../../config/config';
mongoose.connect(config.mongo.url);

let schema = new mongoose.Schema({
    id: {
        type: String,
        trim: true,
        required: true
    },
    name: {
        type: String,
        trim: true,
    },
    role: {
        type: String
    },
    email: {
        type: String,
    },
    username: {
        type: String,
    }
});

module.exports = mongoose.model('User', schema);