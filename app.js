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

import {User, Product, Review} from './models';
import uuid from 'uuid/v1';
import fs from 'fs';
import {promisify} from 'util';
const readFile = promisify(fs.readFile);

export default class App {

    listen(port, cb) {
        this.importUsers();
        this.importProducts();

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

    importProducts() {
        readFile('./data/products.json')
            .then(value => JSON.parse(value.toString()))
            .then(values => values.forEach(value => {
                Product.count({id: value.id}).then(count => {
                    if (count === 0) {
                        Product.create(value).then(product => {
                            if (value.reviews) {
                                value.reviews.forEach(review => {
                                    Review.count({id: review.id}).then(count => {
                                        if (count === 0) {
                                            product.createReview({
                                                id: review.id,
                                                description: review.description
                                            });
                                        } else {
                                            console.log("Record with id: %s already exists", review.id);
                                        }
                                    });
                                });
                            }
                            return product;
                        }).then(product => console.log("Product record created. Id: %s", product.id));
                    } else {
                        console.log("Record with id: %s already exists", value.id);
                    }
                });
            }))
            .catch(console.error);
    }

    importUsers() {
        readFile('./data/users.json')
            .then(value => JSON.parse(value.toString()))
            .then(values => values.forEach(value => {
                User.count({id: value.id}).then(count => {
                    if (count === 0) {
                        User.create(value)
                            .then(user => console.log("User record created. Id: %s", user.id));
                    } else {
                        console.log("Record with id: %s already exists", value.id);
                    }
                });
            }))
            .catch(console.error);
    }
}