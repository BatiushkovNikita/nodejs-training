import fs from 'fs';
import emitter from './emitter';
import {promisify} from 'util';

const readdirAsync = promisify(fs.readdir);
const statAsync = promisify(fs.stat);

let size = 0;

export default class DirWatcher {

    watch(path, delay) {
        let prevCall = Date.now();
            this.detect(path, prevCall);
        setInterval(() => {
            this.detect(path, prevCall).then(t => prevCall = t);
        }, delay);
    }

    detect(path, prevCall) {
        return readdirAsync(path)
            .then(files => {
                let endTime = Date.now();
                let actualSize = files.length;
                files.forEach(fileName => {
                    let p = path + '/' + fileName;
                    if (actualSize !== size) {
                        emitter.emit('changed', {path: p});
                    } else {
                        statAsync(p).then(stats => {
                            if (stats.ctimeMs <= endTime && stats.ctimeMs > prevCall) {
                                emitter.emit('changed', {path: p});
                            }
                        });
                    }
                });
                size = actualSize;
                return endTime;
            })
            .catch(console.error);
    }
}
