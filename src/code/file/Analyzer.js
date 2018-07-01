const Scan = require('src/code/directory/Scan');
const FileReader = require('src/code/file/Reader');

class Analyzer {
    constructor(fileLines) {
        this.fileLines = fileLines;
    }

    getImportedName(moduleName) {
        return 'implementation missing';
    }

    isModuleImportedInFile(moduleName) {
        return 'implementation missing';
    }

    getModuleUsages(moduleName) {
        return ['implementation missing'];
    }
}

module.exports = Analyzer;
