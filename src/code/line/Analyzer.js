class Analyzer {
    isModuleRequired(line, moduleName) {
        return false;
    }

    getModuleReferenceName(line, moduleName) {
        return '';
    }
}
module.exports = Analyzer;
