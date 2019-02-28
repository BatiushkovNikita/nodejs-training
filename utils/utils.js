const csv = require('csvtojson');

const reverse = function (chunk) {
    return chunk.toString().split("").reverse().join("");
};

const toUpperCase = function (chunk) {
    return chunk.toString().toUpperCase();
};

const csvToJson = function(chunk) {

};

module.exports = {
    reverse: reverse,
    toUpperCase: toUpperCase,
    csvToJson: csvToJson
};