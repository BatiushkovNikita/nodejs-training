import fs from 'fs';

export default class DirWatcher {

  watch(path, delay) {
    setInterval(() => {
      console.log('tick');

      fs.readdir(path, (error, files) => {

        for(var file in files) {
          file.toString();
        }
      console.log(error);
      });
    }, delay);
  }
}
