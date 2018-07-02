// const path = require('path');
const recursive = require('recursive-readdir');
class Scan {
    constructor(path) {
        this.path = path;
        this.files = [];
    }

    scan() {
        return new Promise((resolve, reject) => {
            recursive(this.path, [], (err, files) => {
                if (err) {
                    return reject(err);
                }
                this.files = files;
                return resolve();
            });
        });
    }

    getFiles() {
        return this.files;
    }
}

module.exports = Scan;
