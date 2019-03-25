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
import {MongoClient} from 'mongodb';
import config from './config/config';
import CityMongo from './models/nosql/City';
import UserMongo from './models/nosql/User';
import ProductMongo from './models/nosql/Product';
import productMongoRouter from './routes/mongo/product';
import userMongoRouter from './routes/mongo/user';
import cityMongoRouter from './routes/mongo/city';

export default class App {

    listen(port, cb) {
        //this.importUsers();
        //this.importProducts();
        //this.importMongo();

        app.use(passport.initialize());
        app.use(passport.session());
        auth.local();
        auth.facebook();
        auth.twitter();
        auth.googleOAuth();

        app.use(express.json());
        app.use(cookieParser);
        app.use(queryParser);

        //app.use('/api/products', jwt.authCustom, productRouter);
        //app.use('/api/users', jwt.authCustom, userRouter);
        app.use('/auth', authRouter);

        app.use('/api/products', productMongoRouter);
        app.use('/api/users', userMongoRouter);
        app.use('/api/cities', cityMongoRouter);

        app.listen(port, cb);
    }

    importProducts() {
        readFile('./data/products.json')
            .then(value => JSON.parse(value.toString()))
            .then(values => values.map(value => {
                Product.count({id: value.id}).then(count => {
                    if (count === 0) {
                        Product.create(value).then(product => {
                            if (value.reviews) {
                                value.reviews.map(review => {
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
            .then(values => values.map(value => {
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

    importCitiesNative() {
        let database;
        MongoClient.connect(config.mongo.url)
            .then(db => {
                database = db;
                return db.db(config.mongo.dbName);
            })
            .then(dbo => dbo.collection('cities'))
            .then(conn => readFile('./data/cities.json')
                .then(value => JSON.parse(value.toString()))
                .then(cities => {
                    conn.drop();
                    return conn.insertMany(cities);
                })
                .then(res => console.log("Number of documents inserted: %d", res.insertedCount))
            )
            .catch(console.error)
            .finally(() => database.close());
    }

    importFromFile(path, model) {
        readFile(path)
            .then(value => JSON.parse(value.toString()))
            .then(records => {
                    return model.deleteMany({})
                        .then(() => console.log("%s records removed", model.modelName))
                        .then(() => records);
                }
            )
            .then(records => records.map(record => new model(record).save()))
            .catch((reason) => console.error('Error' + reason));
    }

    importMongo() {
        this.importFromFile('./data/cities.json', CityMongo);
        this.importFromFile('./data/products.json', ProductMongo);
        this.importFromFile('./data/users.json', UserMongo);
    }
}