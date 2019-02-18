import eventEmitter from 'events';
import emitter from './emitter';

export default class Importer {

    //const ss = () => console.log('got it');

    //eventEmitter.on('changed', (() => console.log('got it')));​

    import(path) {
        // should return a ​promise ​​with imported data from fileat ​path
        emitter.on('changed', e => {console.log(e);});

    }

    importSync(path) {
        // should be synchronous and return all importeddata from file at ​path
    }
}

//const alert = () => {console.log('got it');};
//emitter.on('changed', e => {console.log(e);});