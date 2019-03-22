import DirWatcher from './event/dirwatcher';
import Importer from './event/importer';

const path = './data/csv';
const delay = 2000;
const importer = new Importer();
const watcher = new DirWatcher();

//watcher.watch(path, delay);
//importer.handleChangedEvent();

//importer.import('./data/data01.csv');
//importer.importSync('./data/data01.csv');

import express from 'express';

const app = express();

import cookieParser from './middlewares/cookie-parser';
import queryParser from './middlewares/query-parser';
import productRouter from './routes/product';
import userRouter from './routes/user';
import authRouter from './routes/auth';
import jwt from './middlewares/jwt-verification';
import auth from './auth/auth-strategy';
import passport from 'passport';

import models from './models';
const User = models.User;

//import user from './models/User';


export default class App {

    listen(port, cb) {
        this.initBackend();


        app.use(passport.initialize());
        app.use(passport.session());
        auth.local();
        auth.facebook();
        auth.twitter();
        auth.googleOAuth();

        app.use(express.json());
        app.use(cookieParser);
        app.use(queryParser);

        app.use('/api/products', jwt.authCustom, productRouter);
        app.use('/api/users', jwt.authCustom, userRouter);
        app.use('/auth', authRouter);

        app.listen(port, cb);
    }

    initBackend() {
        console.log(User);
/*        User.create({
            id: '1'
        }).then(() => console.log('Worked!'));*/
/*
        console.log('1212');
        Product.create({
            id: '001',
            name: 'namename'
        }).then(() => console.log('Worked!'));
*/


    }
}