var CityMongo = require('../../../models/nosql/City');

module.exports = {
    getAllCities: getAllCities,
    addCity: addCity,
    saveCity: saveCity,
    deleteCity: deleteCity
};

function getAllCities(req, res) {
    console.log('Return ALL cities');
    CityMongo.find({})
        .then(value => res.json(value))
        .catch(cause => {
            console.log(cause.message);
            res.sendStatus(400);
        });
}

function addCity(req, res) {
    console.log('Adds NEW city and return');
    new CityMongo(req.swagger.params.city.value)
        .save()
        .then(value => res.json(value))
        .catch(cause => {
            console.log(cause.message);
            res.sendStatus(400);
        });
}

function saveCity(req, res) {
    console.log('Updates ​SINGLE city by ​id if exists or adds NEW ​city with the given ​id​ otherwise');
    return CityMongo.findOneAndUpdate(
        {_id: req.swagger.params.id.value},
        req.swagger.params.city.value,
        {upsert: true})
        .then(value => res.sendStatus(200))
        .catch(cause => {
            console.log(cause.message);
            res.sendStatus(400);
        });
}

function deleteCity(req, res) {
    console.log('Deletes ​SINGLE​ city');
    return CityMongo.deleteOne({_id: req.swagger.params.id.value})
        .then(value => res.sendStatus(200))
        .catch(cause => {
            console.log(cause.message);
            res.sendStatus(400);
        });
}


