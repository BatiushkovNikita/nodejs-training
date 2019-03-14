import express from "express";
import usersData from '../data/users';

const router = express.Router();

router.get('/', (req, res) => {
    console.log('Return ALL users');
    res.json(usersData);
});

module.exports = router;
