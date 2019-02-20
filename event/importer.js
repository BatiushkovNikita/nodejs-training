import emitter from './emitter';
import csv from 'csvtojson';

export default class Importer {

    handleChangedEvent() {
        emitter.on('changed', event => {
            console.log('changed: ' + event.path);
            this.import(event.path);
            this.importSync(event.path);
        });
    }

    import(path) {
        // should return a ​promise ​​with imported data from fileat ​path
        csv().fromFile(path).then(value => {
           console.log(value);
        });

    }

    importSync(path) {
        // should be synchronous and return all importeddata from file at ​path
    }
}