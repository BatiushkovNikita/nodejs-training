const mongoose = require('mongoose');
const util = require('../../utils/utils');

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
    },
    lastModifiedDate: {
        type: Date
    }
});

// https://stackoverflow.com/questions/37365038/this-is-undefined-in-a-mongoose-pre-save-hook
schema.pre('validate', function (next) {
    util.updateDate(next, this);
});

module.exports = mongoose.model('User', schema);