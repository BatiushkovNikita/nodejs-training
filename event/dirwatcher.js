import fs from 'fs';
import emitter from './emitter';

export default class DirWatcher {

    watch(path, delay) {
        var initTime = new Date();
        setInterval(() => {
            fs.readdir(path, (error, files) => {
                files.forEach(fileName => {
                    var p = path + '/' + fileName;
                    fs.stat(p, (error, stats) => {
                        if (stats.mtimeMs <= initTime.getTime()) {
                            console.log('changed: ' + p);
                        }
                    });
                });
                console.log('init:' + initTime.getTime());
                var dl = initTime.setTime(initTime.getTime() + delay);
                console.log('delay:' + initTime.getTime());

                //initTime = initTime + 0 + delay;

            });
        }, delay);
    }

/*
    watch(path, delay) {
        let files = new Map();
        setInterval(() => {
            console.log('tick');
            fs.readdir(path, (error, existNames) => {

                var initTime = new Date().getTime();
                //if ()

                //console.log(files.keys().includes('value'));
                //files.keys().hasOwnProperty("123")

                /!*for (const key of files.keys()) {
                    console.log(key);

                }*!/

                /!*Object.entries(files).forEach(([value, index]) => {
                    console.log(value);
                });*!/
                //console.log(files.keys()[Symbol.iterator]);
                //console.log(Object.keys(files));
      /!*          files.forEach(entry => {
                    let key = entry.key;
                    console.log(key);

                });*!/

                //Object.entries(files).map(value => value.key).forEach(value => console.log(value));

                existNames.forEach(existName => {
                    var p = path + '/' + existName;

                    fs.stat(p, (error, stats) => {
                        var mtime = files.get(p);
                        if (mtime === undefined || mtime == null) {
                            // no file //
                            files.set(p, stats.mtimeMs);
                            console.log('changed: ' + p);
                        } else {
                            //
                        }
                    });

/!*                    files.forEach((value, key) => {
                        if (p === key) {
                            files.delete(p);
                        }
                    });*!/
                });
            });
            console.log(files.size + ' ' + new Date());
            //console.log(files.keys());
            //Object.keys(files).forEach(key => console.log(files[key]));
        }, delay);

    }*/
}
