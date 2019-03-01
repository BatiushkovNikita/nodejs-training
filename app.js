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
