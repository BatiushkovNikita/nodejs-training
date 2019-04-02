var util = require('util');

module.exports = {
    getAllCities: getAllCities
};

function getAllCities(req, res) {
    console.log('got it');
    res.json("OK");
}
