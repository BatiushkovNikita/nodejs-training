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
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    reviews: [
        {
            id: {
                type: String
            },
            description: {
                type: String
            }
        }
    ]
});

module.exports = mongoose.model('Product', schema);