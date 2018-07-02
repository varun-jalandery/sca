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

    getModuleUsages(moduleName) {
        const moduleReferenceName = this.getModuleReferenceName(moduleName);
        if (!moduleReferenceName) {
            return [];
        }
        let moduleUsages = [];
        this.fileLines.forEach(line => {
            let moduleUsagePerLine = this.lineAnalyzer.getModuleReferenceUsage(line, moduleReferenceName);
            if (moduleUsagePerLine.length) {
                moduleUsages = moduleUsages.concat(moduleUsagePerLine);
            }
        });
        return moduleUsages;
    }

    getModuleReferenceName(moduleName) {
        for(let i = 0; i < this.fileLines.length; i += 1) {
            if (this.lineAnalyzer.isModuleRequired(this.fileLines[i], moduleName)) {
                return this.lineAnalyzer.getModuleReferenceName(this.fileLines[i]);
            }
        }
        return '';
    }
}

module.exports = Analyzer;
