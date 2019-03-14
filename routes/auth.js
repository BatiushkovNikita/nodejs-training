import express from "express";
import jwt from 'jsonwebtoken';
import usersData from '../data/users';
import AuthSuccess from '../controllers/auth-success';
import AuthError from '../controllers/auth-error';
import config from '../config/config';
import passport from "passport/lib";

const router = express.Router();

router.route('/')
    .post((req, res) => {
        let user = usersData.find((user) => {
            return user.email === req.body.email && user.username === req.body.username;
        });
        if (user !== undefined) {
            let token = jwt.sign(user, config.privateKey);
            res.json(new AuthSuccess(200, 'OK', user, token));
        } else {
            res.status(404).json(new AuthError(404, 'Not Found'));
        }
    });

router.post('/local', passport.authenticate('local', {session: false}), (req, res) => {
    res.end(req.user.id);
});

router.get('/facebook', passport.authenticate('facebook'));

router.get('/twitter', passport.authenticate('twitter'));

router.get('/google', passport.authenticate('google'));

module.exports = router;