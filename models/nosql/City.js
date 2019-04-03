const mongoose = require('mongoose');
const util = require('../../utils/utils');

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
    },
    lastModifiedDate: {
        type: Date
    }
});

// https://stackoverflow.com/questions/37365038/this-is-undefined-in-a-mongoose-pre-save-hook
schema.pre('validate', function (next) {
    util.updateDate(next, this);
});

schema.pre('findOneAndUpdate', function (next) {
    util.updateDate(next, this);
});

module.exports = mongoose.model('City', schema);