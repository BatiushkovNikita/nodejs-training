import express from "express";
import CityMongo from '../../models/nosql/City';

const router = express.Router();

router.route('/')
    .get((req, res) => {
        console.log('Return ALL cities');
        CityMongo.find({})
            .then(value => res.json(value))
            .catch(console.error);
    })
    .post((req, res) => {
        console.log('Adds NEW city and return');
        new CityMongo(req.body)
            .save()
            .then(value => res.json(value))
            .catch(console.error);
    });

router.put('/:id', (req, res) => {
    console.log('Updates ​SINGLE city by ​id if exists or adds NEW ​city with the given ​id​ otherwise');
    CityMongo.findOneAndUpdate(
        {_id: req.params.id},
        req.body,
        {upsert: true})
        .then(value => res.sendStatus(200))
        .catch(console.error);
});

router.delete('/:id', (req, res) => {
    console.log('Deletes ​SINGLE​ city');
    CityMongo.deleteOne({_id: req.params.id})
        .then(value => res.sendStatus(200))
        .catch(console.error);
});

module.exports = router;
