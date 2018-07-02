class Analyzer {
    isModuleRequired(line, moduleName) {
        return new RegExp(`require(.)+${moduleName}`).test(line);
    }

    getModuleReferenceName(line) {
        const initialMatches = line.match(
            new RegExp('(var|const)\\s+[a-zA-z]+(\\s?|\\s+)\\=')
        );
        if (!initialMatches || !initialMatches[0]) {
            return '';
        }

        const beforeEqualToSignMatch = initialMatches[0].match(
            new RegExp('\\s+[a-zA-z]+(\\=|(\\s?))')
        );
        if (!beforeEqualToSignMatch || !beforeEqualToSignMatch[0]) {
            return '';
        }

        const moduleReferenceNameMatch = beforeEqualToSignMatch[0].match(
            new RegExp('[a-zA-Z]+')
        );

        if (!moduleReferenceNameMatch || !moduleReferenceNameMatch[0]) {
            return '';
        }
        return moduleReferenceNameMatch[0];
    }

    getModuleReferenceUsage(line, moduleReference) {
        if (/require\(/.test(line)) {
            return [];
        }
        let matches = line.match(new RegExp(`${moduleReference}\.[a-zA-Z0-9]+(\\(|\\n)`, 'g'));
        if (!matches || !matches[0]) {
            return [];
        }
        return matches.map(match => match.slice(0, -1));
    }
}
module.exports = Analyzer;
