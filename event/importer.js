import emitter from './emitter';
import csv from 'csvtojson';
import fs from 'fs';

export default class Importer {

    handleChangedEvent() {
        emitter.on('changed', event => {
            console.log('changed: ' + event.path);
            this.import(event.path);
            this.importSync(event.path);
        });
    }

    import(path) {
        return csv().fromFile(path)
            .then(data => {
                console.info('async import');
                console.info(data);
            })
            .catch(reason => console.error(reason));
    }

    importSync(path) {
        return csv().fromString(fs.readFileSync(path).toString())
            .then(data => {
                console.info('sync import');
                console.info(data);
            })
            .catch(reason => console.error(reason));
    }
}