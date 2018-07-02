const Scan = require('src/code/directory/Scan');
const LineAnalyzer = require('src/code/line/Analyzer');

class Analyzer {
    constructor(fileLines) {
        this.fileLines = fileLines;
        this.lineAnalyzer = new LineAnalyzer();
    }

    isModuleImportedInFile(moduleName) {
        return this.fileLines.some(line => this.lineAnalyzer.isModuleRequired(line, moduleName));
    }

    getModuleUsages(moduleReferenceName) {
        let moduleUsages = [];
        this.fileLines.forEach(line => {
            let moduleUsagePerLine = this.lineAnalyzer.getModuleReferenceUsage(line, moduleReferenceName);
            if (moduleUsagePerLine.length) {
                moduleUsages = moduleUsages.concat(moduleUsagePerLine);
            }
        });
        return moduleUsages;
    }
}

module.exports = Analyzer;
