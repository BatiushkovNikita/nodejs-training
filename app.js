import DirWatcher from './event/dirwatcher';
import Importer from './event/importer';

const path = './data';
const delay = 2000;
const importer = new Importer();
const watcher = new DirWatcher();

//watcher.watch(path, delay);
//importer.handleChangedEvent();

//importer.import('./data/data01.csv');
//importer.importSync('./data/data01.csv');

let list = '3, 4, 5'.split(',');
let list2 = '1, 2, 3'.split(',');

let newList = list2.filter(value => value >= 2);


console.log(newList);
