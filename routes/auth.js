import express from "express";
import jwt from 'jsonwebtoken';
import usersData from '../data/users';
import AuthSuccess from '../controllers/auth-success';
import AuthError from '../controllers/auth-error';

const router = express.Router();

router.route('/')
    .post((req, res, next) => {
        let user = usersData.find((user) => {
            let u = req.body;
            return user.email === u.email && user.username === u.username;
        });
        if (user !== undefined) {
            let authSuccess = new AuthSuccess(200, 'OK', user);
            authSuccess.token =jwt.sign(JSON.stringify(authSuccess), 'privateKey');
            res.json(authSuccess);
        } else {
            res.json(new AuthError(404, 'Not Found'));
        }
    });

module.exports = router;