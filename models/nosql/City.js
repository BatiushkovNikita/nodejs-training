import mongoose from 'mongoose';
import config from '../../config/config';
mongoose.connect(config.mongo.url);

let schema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, 'Name not specified']
    },
    country: {
        type: String,
        trim: true,
        required: [true, 'Country not specified']
    },
    capital: {
        type: Boolean,
        required: true
    },
    location: {
        lat: {
            type: Number,
            min: -90,
            max: 90
        },
        long: {
            type: Number,
            min: -180,
            max: 180
        }
    }
});

module.exports = mongoose.model('City', schema);