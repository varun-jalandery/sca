class Analyzer {
    isModuleRequired(line, moduleName) {
        return (new RegExp(`require(.)+${moduleName}`)).test(line);
    }

    getModuleReferenceName(line, moduleName) {
        return '';
    }
}
module.exports = Analyzer;
