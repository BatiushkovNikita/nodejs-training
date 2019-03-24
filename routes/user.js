import express from "express";
import usersData from '../data/users';
import {User} from '../models';

const router = express.Router();

router.get('/', (req, res) => {
    console.log('Return ALL users');
    User.findAll()
        .then(user => res.json(usersData))
        .catch(console.error);
});

module.exports = router;
