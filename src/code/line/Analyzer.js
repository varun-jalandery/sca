class Analyzer {
    isModuleRequired(line, moduleName) {
        // return new RegExp(`require\\s*\\((.)+${moduleName}(\\.js)?\\'\\s*\\)`).test(line);
        return  new RegExp(`require\\s*\\((.)+${moduleName}(\\.js)?\\'\\s*\\)`).test(line);
    }

    getModuleReferenceName(line) {
        const initialMatches = line.match(
            new RegExp('(((var|const)\\s+)|(\\s*))[a-zA-z]+(\\s*)\\=')
        );
        if (!initialMatches || !initialMatches[0]) {
            return '';
        }

        const beforeEqualToSignMatch = initialMatches[0].match(
            new RegExp('((const|var)\\s+|\\s*)[a-zA-z]+(\\=?|(\\s?))')
        );
        if (!beforeEqualToSignMatch || !beforeEqualToSignMatch[0]) {
            return '';
        }

        const moduleReferenceNameMatch = beforeEqualToSignMatch[0].match(
            new RegExp('[a-zA-Z]+\\=?$')
        );

        if (!moduleReferenceNameMatch || !moduleReferenceNameMatch[0]) {
            return '';
        }
        if (moduleReferenceNameMatch[0].endsWith('=')) {
            return moduleReferenceNameMatch[0].slice(0, -1);
        }
        return moduleReferenceNameMatch[0];
    }

    getModuleReferenceUsage(line, moduleReference) {
        if (/require\(/.test(line)) {
            return [];
        }
        let matches = line.match(
            new RegExp(`\\s*${moduleReference}\\.[a-zA-Z0-9]+(\\(|\\n)`, 'g')
        );
        if (!matches || !matches[0]) {
            return [];
        }
        return matches.map(match => match.slice(0, -1).trim());
    }
}
module.exports = Analyzer;
