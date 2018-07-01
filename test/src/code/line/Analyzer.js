const expect = require('chai').expect;
const LineAnalyzer = require('src/code/line/Analyzer');
const CodeLineFixtures = require('test/fixtures/CodeLines.sample');


let lineAnalyzer = null;


describe('src/code/file/Analyzer', () => {
    before(async () => {
        lineAnalyzer = new LineAnalyzer();
    });

    it('isModuleRequired() should return true if module is required in line', () => {
        CodeLineFixtures.forEach(fixture => {
            expect(lineAnalyzer.isModuleRequired(fixture.line, fixture.moduleName))
                .to.equal(true, `${fixture.moduleName} is imported in line <${fixture.line}>, so it should return true`)
        });
    });

    it('isModuleRequired() should return false if module is not required in line', () => {
        expect(lineAnalyzer.isModuleRequired("const z = require('y');", 'noModule'))
            .to.equal(false, `noModule is not required, so it should return false`)
    });

    it('getModuleReferenceName() should return correct module reference name', () => {
        CodeLineFixtures.forEach(fixture => {
            expect(lineAnalyzer.getModuleReferenceName(fixture.line, fixture.moduleName))
                .to.equal(fixture.referenceName, `${fixture.moduleName} is imported as  <${fixture.referenceName}> in line <${fixture.line}>, so it should return true`)
        });
    });
});
