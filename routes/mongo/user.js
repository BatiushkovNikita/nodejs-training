import express from "express";
import UserMongo from '../../models/nosql/User';

const router = express.Router();

router.get('/', (req, res) => {
    console.log('Return ALL users');
    UserMongo.find({})
        .then(value => res.json(value))
        .catch(console.error);
});

router.delete('/:id', (req, res) => {
    console.log('Deletes SINGLE user');
    UserMongo.deleteOne({_id: req.params.id})
        .then(value => res.sendStatus(200))
        .catch(console.error);
});

module.exports = router;
