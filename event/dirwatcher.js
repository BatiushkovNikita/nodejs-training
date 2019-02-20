import fs from 'fs';
import emitter from './emitter';
import {promisify} from 'util';

const readdirAsync = promisify(fs.readdir);
const statAsync = promisify(fs.stat);

export default class DirWatcher {

    watch(path, delay) {
        this.detect(path, Date.now());
        setInterval(() => {
            this.detect(path, delay);
        }, delay);
    }

    detect(path, delay) {
        return readdirAsync(path)
            .then(files => {
                let endTime = Date.now();
                files.forEach(fileName => {
                    let p = path + '/' + fileName;
                    statAsync(p).then(stats => {
                        if (stats.ctimeMs <= endTime && stats.ctimeMs > endTime - delay) {
                            emitter.emit('changed', {path: p});
                        }
                    });
                });
            })
            .catch(console.error);
    }
}
