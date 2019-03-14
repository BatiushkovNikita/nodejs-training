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


export default class App {

    listen(port, cb) {
        app.use(express.json());
        app.use(cookieParser);
        app.use(queryParser);
        app.use('/api/products', productRouter);
        app.use('/api/users', userRouter);
        app.use('/auth', authRouter);

        app.listen(port, cb);
    }
}