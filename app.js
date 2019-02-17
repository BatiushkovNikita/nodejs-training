import {Product, User} from './exports';
import DirWatcher from './watcher/dirwatcher';

new Product();
new User();

const watcher = new DirWatcher();

watcher.watch('./data', 2000);
